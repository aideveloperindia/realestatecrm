import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/lib/models/Message';
import Customer from '@/lib/models/Customer';
import { requireAuth } from '@/lib/auth';
import { generateWhatsAppLink, normalizePhone } from '@/lib/utils/phone';

// Simple rate limiter (in-memory, per session)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 50; // Max 50 sends per hour per user
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = rateLimiter.get(userId);

  if (!userLimit || now > userLimit.resetAt) {
    rateLimiter.set(userId, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(request);

    const { toPhone, messageText, propertyId, customerId } = await request.json();

    if (!toPhone || !messageText) {
      return NextResponse.json(
        { error: 'Phone number and message text are required' },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(user.userId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Normalize phone
    const normalizedPhone = normalizePhone(toPhone);

    // Check opt-in if customerId is provided
    if (customerId) {
      const customer = await Customer.findById(customerId);
      if (customer && !customer.opt_in_whatsapp) {
        // Still allow manual sends, but log it
        console.warn(`Sending to customer ${customerId} without opt-in`);
      }
    }

    // Generate WhatsApp link
    const link = generateWhatsAppLink(normalizedPhone, messageText);

    // Log the message
    const message = new Message({
      to_phone: normalizedPhone,
      message_text: messageText,
      method: 'wa.me',
      status: 'recorded',
      property_id: propertyId,
      customer_id: customerId,
      created_by: user.userId,
    });

    await message.save();

    return NextResponse.json({
      success: true,
      link,
      messageId: message._id.toString(),
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');
    const propertyId = searchParams.get('propertyId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = {};
    if (customerId) query.customer_id = customerId;
    if (propertyId) query.property_id = propertyId;

    const messages = await Message.find(query)
      .populate('customer_id', 'name phone')
      .populate('property_id', 'title price')
      .populate('created_by', 'email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Message.countDocuments(query);

    return NextResponse.json({
      messages,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


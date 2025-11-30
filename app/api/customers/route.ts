import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Customer from '@/lib/models/Customer';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Customer.countDocuments(query);

    return NextResponse.json({
      customers,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get customers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const body = await request.json();
    const {
      name,
      phone,
      email,
      budget_min,
      budget_max,
      preferred_types,
      preferred_locations,
      opt_in_whatsapp,
      notes,
    } = body;

    if (!name || !phone || !budget_min || !budget_max) {
      return NextResponse.json(
        { error: 'Name, phone, and budget are required' },
        { status: 400 }
      );
    }

    const customer = new Customer({
      name,
      phone,
      email,
      budget_min: parseFloat(budget_min),
      budget_max: parseFloat(budget_max),
      preferred_types: preferred_types || [],
      preferred_locations: preferred_locations || {},
      opt_in_whatsapp: opt_in_whatsapp || false,
      opt_in_timestamp: opt_in_whatsapp ? new Date() : undefined,
      notes,
    });

    await customer.save();

    return NextResponse.json({ customer }, { status: 201 });
  } catch (error: any) {
    console.error('Create customer error:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Customer with this phone already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


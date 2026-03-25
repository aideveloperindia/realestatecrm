import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Client from '@/lib/models/Client';
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

    const clients = await Client.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Client.countDocuments(query);

    return NextResponse.json({
      clients,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get clients error:', error);
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
    const { name, phone, email, address, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const client = new Client({
      name,
      phone,
      email,
      address,
      notes,
    });

    await client.save();

    return NextResponse.json({ client }, { status: 201 });
  } catch (error: any) {
    console.error('Create client error:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Client with this phone already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


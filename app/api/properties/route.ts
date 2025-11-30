import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/lib/models/Property';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (city) query['location.city'] = city;

    const properties = await Property.find(query)
      .populate('client_id', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Property.countDocuments(query);

    return NextResponse.json({
      properties,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get properties error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(request);

    const body = await request.json();
    const {
      title,
      type,
      price,
      location,
      client_id,
      bedrooms,
      bathrooms,
      area,
      description,
      status = 'available',
      images = [],
    } = body;

    if (!title || !type || !price || !location?.city || !client_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const property = new Property({
      title,
      type,
      price: parseFloat(price),
      location,
      client_id,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      area: area ? parseFloat(area) : undefined,
      description,
      status,
      images,
    });

    await property.save();
    await property.populate('client_id', 'name phone');

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Create property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


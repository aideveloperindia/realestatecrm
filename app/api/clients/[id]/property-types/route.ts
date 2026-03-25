import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/lib/models/Property';
import { requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await requireAuth(request);

    const types = await Property.distinct('type', { client_id: params.id });

    return NextResponse.json({ types });
  } catch (error) {
    console.error('Get client property types error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Customer from '@/lib/models/Customer';
import Property from '@/lib/models/Property';
import { requireAuth } from '@/lib/auth';
import { findTopMatches } from '@/lib/utils/matching';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await requireAuth(request);

    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get all available properties
    const properties = await Property.find({ status: 'available' }).lean();

    // Calculate matches
    const matches = findTopMatches(customer, properties, 10);

    return NextResponse.json({
      customer: {
        id: customer._id.toString(),
        name: customer.name,
        budget_min: customer.budget_min,
        budget_max: customer.budget_max,
        preferred_types: customer.preferred_types,
        preferred_locations: customer.preferred_locations,
      },
      matches,
    });
  } catch (error) {
    console.error('Get matches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


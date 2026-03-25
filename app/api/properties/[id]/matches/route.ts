import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/lib/models/Property';
import Customer from '@/lib/models/Customer';
import { requireAuth } from '@/lib/auth';
import { calculateMatchScore } from '@/lib/utils/matching';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await requireAuth(request);

    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Get all customers
    const customers = await Customer.find().lean() as any[];

    // Calculate matches (reverse matching - property to customers)
    const matches = customers
      .map(customer => ({
        customer,
        ...calculateMatchScore(customer, property),
      }))
      .sort((a, b) => b.score - a.score) // Sort descending by score
      .slice(0, 10) // Top 10 matches
      .map(({ customer, property: _, ...matchData }) => ({
        customer: {
          id: customer._id.toString(),
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          budget_min: customer.budget_min,
          budget_max: customer.budget_max,
          preferred_types: customer.preferred_types,
          preferred_locations: customer.preferred_locations,
          opt_in_whatsapp: customer.opt_in_whatsapp,
        },
        ...matchData,
      }));

    return NextResponse.json({
      property: {
        id: property._id.toString(),
        title: property.title,
        type: property.type,
        price: property.price,
        location: property.location,
      },
      matches,
    });
  } catch (error) {
    console.error('Get property matches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


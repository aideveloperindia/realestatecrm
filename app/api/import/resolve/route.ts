import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Client from '@/lib/models/Client';
import Customer from '@/lib/models/Customer';
import Property from '@/lib/models/Property';

// In-memory store (same as in csv/route.ts)
// In production, use Redis or database
const cleaningQueue = new Map<string, any[]>();

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const { queueId, rowIndex, action, data } = await request.json();

    if (!queueId || rowIndex === undefined || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get queue (this is a simplified version - in production, persist to DB)
    // For now, we'll expect the frontend to send the full resolved data
    if (action === 'accept' && data) {
      // Import the resolved row
      const importType = queueId.split('_')[0];

      try {
        if (importType === 'clients') {
          const existing = await Client.findOne({ phone: data.phone });
          if (!existing) {
            await Client.create(data);
          }
        } else if (importType === 'customers') {
          const existing = await Customer.findOne({ phone: data.phone });
          if (!existing) {
            await Customer.create(data);
          }
        } else if (importType === 'properties') {
          const firstClient = await Client.findOne();
          if (firstClient) {
            await Property.create({
              ...data,
              client_id: data.client_id || firstClient._id,
            });
          }
        }

        return NextResponse.json({ success: true, message: 'Row imported successfully' });
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || 'Failed to import row' },
          { status: 400 }
        );
      }
    } else if (action === 'reject') {
      // Just mark as rejected (could store in DB for audit)
      return NextResponse.json({ success: true, message: 'Row rejected' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Resolve import error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


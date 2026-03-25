import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { parseCSV, normalizeCSVRow, deduplicateByPhone } from '@/lib/utils/csv';
import Client from '@/lib/models/Client';
import Customer from '@/lib/models/Customer';
import Property from '@/lib/models/Property';

// In-memory store for cleaning queue (in production, use Redis or database)
const cleaningQueue = new Map<string, any[]>();

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const importType = formData.get('type') as string; // 'clients', 'customers', 'properties'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!importType || !['clients', 'customers', 'properties'].includes(importType)) {
      return NextResponse.json(
        { error: 'Invalid import type. Must be: clients, customers, or properties' },
        { status: 400 }
      );
    }

    const fileContent = await file.text();
    const parseResult = parseCSV(fileContent);

    if (parseResult.errors.length > 0) {
      return NextResponse.json(
        { error: 'CSV parsing errors', errors: parseResult.errors },
        { status: 400 }
      );
    }

    // Normalize rows based on type
    let normalizedRows = parseResult.rows.map(row => {
      if (importType === 'clients') {
        return normalizeCSVRow(row, {
          phone: ['phone', 'mobile', 'contact'],
          required: ['name', 'phone'],
        });
      } else if (importType === 'customers') {
        return normalizeCSVRow(row, {
          phone: ['phone', 'mobile', 'contact'],
          price: ['budget_min', 'budget_max', 'min_budget', 'max_budget'],
          required: ['name', 'phone', 'budget_min', 'budget_max'],
        });
      } else {
        // properties
        return normalizeCSVRow(row, {
          price: ['price', 'cost', 'amount'],
          required: ['title', 'type', 'price', 'city'],
        });
      }
    });

    // Deduplicate by phone for clients/customers
    if (importType === 'clients' || importType === 'customers') {
      const phoneField = ['phone', 'mobile', 'contact'].find(f => 
        parseResult.headers.includes(f)
      ) || 'phone';
      
      const { unique, duplicates } = deduplicateByPhone(normalizedRows, phoneField);
      normalizedRows = unique;
      
      if (duplicates.length > 0) {
        console.log(`Found ${duplicates.length} duplicate phone numbers`);
      }
    }

    // Separate rows with errors
    const validRows: any[] = [];
    const errorRows: any[] = [];

    for (const row of normalizedRows) {
      if (row._errors && row._errors.length > 0) {
        errorRows.push(row);
      } else {
        validRows.push(row);
      }
    }

    // Store error rows in cleaning queue
    const queueId = `${importType}_${Date.now()}`;
    cleaningQueue.set(queueId, errorRows);

    // Import valid rows
    let imported = 0;
    let skipped = 0;

    if (importType === 'clients') {
      for (const row of validRows) {
        try {
          const phone = row.phone || row.mobile || row.contact;
          const existing = await Client.findOne({ phone });
          if (existing) {
            skipped++;
            continue;
          }

          await Client.create({
            name: row.name,
            phone,
            email: row.email,
            address: row.address,
            notes: row.notes,
          });
          imported++;
        } catch (error) {
          skipped++;
        }
      }
    } else if (importType === 'customers') {
      for (const row of validRows) {
        try {
          const phone = row.phone || row.mobile || row.contact;
          const existing = await Customer.findOne({ phone });
          if (existing) {
            skipped++;
            continue;
          }

          await Customer.create({
            name: row.name,
            phone,
            email: row.email,
            budget_min: row.budget_min || row.min_budget || 0,
            budget_max: row.budget_max || row.max_budget || 0,
            preferred_types: row.preferred_types 
              ? String(row.preferred_types).split(',').map((t: string) => t.trim())
              : [],
            preferred_locations: {
              city: row.city,
              locality: row.locality,
              district: row.district,
            },
            opt_in_whatsapp: false,
          });
          imported++;
        } catch (error) {
          skipped++;
        }
      }
    } else {
      // properties - need client_id mapping
      // For MVP, assume client_id is provided in CSV or use first client
      const firstClient = await Client.findOne();
      if (!firstClient) {
        return NextResponse.json(
          { error: 'No clients found. Please create a client first.' },
          { status: 400 }
        );
      }

      for (const row of validRows) {
        try {
          await Property.create({
            title: row.title || row.name,
            type: row.type,
            price: row.price || row.cost || row.amount,
            location: {
              city: row.city,
              locality: row.locality,
              district: row.district,
              address: row.address,
            },
            client_id: row.client_id || firstClient._id,
            bedrooms: row.bedrooms ? parseInt(row.bedrooms) : undefined,
            bathrooms: row.bathrooms ? parseInt(row.bathrooms) : undefined,
            area: row.area ? parseFloat(row.area) : undefined,
            description: row.description || row.notes,
            status: 'available',
          });
          imported++;
        } catch (error) {
          skipped++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      errors: errorRows.length,
      queueId: errorRows.length > 0 ? queueId : null,
      message: `Imported ${imported} records. ${skipped} skipped. ${errorRows.length} need cleaning.`,
    });
  } catch (error) {
    console.error('CSV import error:', error);
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
    const queueId = searchParams.get('queueId');

    if (queueId) {
      const queue = cleaningQueue.get(queueId);
      if (!queue) {
        return NextResponse.json(
          { error: 'Queue not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ queue, queueId });
    }

    // Return all queue IDs
    const queueIds = Array.from(cleaningQueue.keys());
    return NextResponse.json({ queues: queueIds });
  } catch (error) {
    console.error('Get import queue error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


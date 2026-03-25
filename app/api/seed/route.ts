import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth';

// One-time seed endpoint - DELETE AFTER USE for security!
export async function POST(request: NextRequest) {
  try {
    // Simple security check - you can add a secret token here
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.SEED_SECRET || 'change-this-secret';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide Authorization: Bearer <SEED_SECRET>' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@karimnagar.properties';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Passw0rd!';
    
    // Check if admin exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        email: adminEmail
      });
    }
    
    // Create admin
    const hashedPassword = await hashPassword(adminPassword);
    const user = await User.create({ 
      email: adminEmail, 
      password: hashedPassword 
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      email: adminEmail,
      password: adminPassword,
      warning: '⚠️ DELETE THIS API ROUTE AFTER SEEDING FOR SECURITY!'
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        error: 'Seed failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}


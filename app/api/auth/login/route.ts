import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database connection error:', dbError.message);
      return NextResponse.json(
        { error: 'Database connection failed. Please check MONGODB_URI environment variable.' },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    let user;
    try {
      user = await User.findOne({ email: normalizedEmail });
    } catch (dbError: any) {
      console.error('Database query error:', dbError.message);
      return NextResponse.json(
        { error: 'Database query failed' },
        { status: 500 }
      );
    }
    
    if (!user) {
      console.error(`Login failed: User not found for email: ${normalizedEmail}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      console.error(`Login failed: Invalid password for email: ${normalizedEmail}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log(`✅ Login successful for: ${normalizedEmail}`);

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });

    setAuthCookie(response, token);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


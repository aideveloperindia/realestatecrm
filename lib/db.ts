import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('⚠️ MONGODB_URI environment variable is not defined');
  // Don't throw in production to allow graceful degradation
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    const errorMsg = 'MONGODB_URI is not defined. Please set it in environment variables.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  // Validate connection string format
  if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
    const errorMsg = 'Invalid MONGODB_URI format. Must start with mongodb:// or mongodb+srv://';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error: any) => {
      console.error('❌ MongoDB connection error:', error.message);
      console.error('Connection string:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', e.message);
    if (e.message.includes('authentication')) {
      console.error('💡 Tip: Check MongoDB username/password in connection string');
    }
    if (e.message.includes('network') || e.message.includes('timeout')) {
      console.error('💡 Tip: Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Vercel)');
    }
    throw e;
  }

  return cached.conn;
}

export default connectDB;


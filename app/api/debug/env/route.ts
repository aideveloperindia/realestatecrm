import { NextResponse } from 'next/server';

// Debug endpoint to check environment variables (DELETE AFTER USE!)
export async function GET() {
  const mongodbUri = process.env.MONGODB_URI;
  const jwtSecret = process.env.JWT_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Hide sensitive parts
  const maskedMongoUri = mongodbUri 
    ? mongodbUri.replace(/:[^:@]+@/, ':****@').substring(0, 100) + '...'
    : 'NOT SET';

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    variables: {
      MONGODB_URI: {
        exists: !!mongodbUri,
        masked: maskedMongoUri,
        length: mongodbUri?.length || 0,
        hasDatabaseName: mongodbUri?.includes('/karimnagar_crm') || false,
        hasParams: mongodbUri?.includes('retryWrites=true') || false,
      },
      JWT_SECRET: {
        exists: !!jwtSecret,
        length: jwtSecret?.length || 0,
      },
      NEXT_PUBLIC_APP_URL: {
        exists: !!appUrl,
        value: appUrl || 'NOT SET',
      },
    },
    timestamp: new Date().toISOString(),
  });
}


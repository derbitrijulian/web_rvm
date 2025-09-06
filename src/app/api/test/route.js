import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Test basic response
    return NextResponse.json({
      message: 'Test API is working',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not Set',
        JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not Set',
      },
    });
  } catch (error) {

    return NextResponse.json(
      {
        error: 'Test API failed',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

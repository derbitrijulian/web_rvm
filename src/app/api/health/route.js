import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Basic health check without any imports
    return NextResponse.json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Health check failed', message: error.message },
      { status: 500 }
    );
  }
}

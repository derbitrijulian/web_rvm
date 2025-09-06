import { NextResponse } from 'next/server';

export async function GET(req) {
  try {


    // Try to import Prisma
    const { PrismaClient } = await import('@prisma/client');

    // Create client instance
    const testPrisma = new PrismaClient({
      log: ['error', 'warn', 'info'],
    });

    // Test connection
    await testPrisma.$connect();

    // Test a simple query
    const result = await testPrisma.$queryRaw`SELECT 1 as test`;

    // Disconnect
    await testPrisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      testQuery: result,
    });
  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          name: error.name,
          code: error.code,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}

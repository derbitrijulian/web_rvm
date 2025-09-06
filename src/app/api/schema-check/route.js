import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Import Prisma with explicit error handling
    let PrismaClient;
    try {
      const prismaModule = await import('@prisma/client');
      PrismaClient = prismaModule.PrismaClient;

    } catch (importError) {

      throw new Error(`Prisma import failed: ${importError.message}`);
    }

    const testPrisma = new PrismaClient();

    // Connect to database
    await testPrisma.$connect();

    // Check if tables exist
    const tables = await testPrisma.$queryRaw`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = DATABASE()
    `;


    // Check if User table exists and has data
    let userTableExists = false;
    let rvmTableExists = false;

    try {
      const userCount = await testPrisma.user.count();
      userTableExists = true;
    } catch (userError) {

    }

    try {
      const rvmCount = await testPrisma.rvmLocation.count();
      rvmTableExists = true;

    } catch (rvmError) {

    }

    await testPrisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Schema check completed',
      data: {
        tables: tables,
        userTableExists,
        rvmTableExists,
        databaseUrl: process.env.DATABASE_URL ? 'Configured' : 'Missing',
      },
    });
  } catch (error) {
    console.error('Schema Check - Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

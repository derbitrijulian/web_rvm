import { NextResponse } from 'next/server';

export async function GET(req) {
  try {


    // Try importing Prisma
    let PrismaClient;
    try {
      const prismaModule = await import('@prisma/client');
      PrismaClient = prismaModule.PrismaClient;

    } catch (importError) {
    
      return NextResponse.json(
        {
          success: false,
          error: 'Prisma import failed',
          message: importError.message,
          solution: 'Run: npx prisma generate',
        },
        { status: 500 }
      );
    }

    // Try creating client
    let client;
    try {
      client = new PrismaClient();
    
    } catch (clientError) {
 
      return NextResponse.json(
        {
          success: false,
          error: 'Prisma client creation failed',
          message: clientError.message,
        },
        { status: 500 }
      );
    }

    // Try connecting
    try {
      await client.$connect();

    } catch (connectError) {
 
      await client.$disconnect();
      return NextResponse.json(
        {
          success: false,
          error: 'Database connection failed',
          message: connectError.message,
          solution: 'Check if MySQL is running on port 3306',
        },
        { status: 500 }
      );
    }

    // Try basic query
    try {
      await client.$queryRaw`SELECT 1 as test`;

    } catch (queryError) {

      await client.$disconnect();
      return NextResponse.json(
        {
          success: false,
          error: 'Database query failed',
          message: queryError.message,
        },
        { status: 500 }
      );
    }

    await client.$disconnect();


    return NextResponse.json({
      success: true,
      message: 'Prisma setup is working correctly',
      checks: {
        prismaImport: true,
        clientCreation: true,
        databaseConnection: true,
        basicQuery: true,
      },
    });
  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: 'Setup check failed',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

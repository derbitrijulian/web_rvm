import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Test Prisma import
    const { PrismaClient } = await import('@prisma/client');

    const prisma = new PrismaClient();

    // Test database connection
    await prisma.$connect();

    // Test simple query
    const userCount = await prisma.user.count();
    const rvmCount = await prisma.rvmLocation.count();

    await prisma.$disconnect();

    return NextResponse.json({
      message: 'Prisma connection successful',
      data: {
        userCount,
        rvmCount,
        connectionStatus: 'OK',
      },
    });
  } catch (error) {

    return NextResponse.json(
      {
        error: 'Prisma connection failed',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

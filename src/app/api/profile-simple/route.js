import { NextResponse } from 'next/server';

export async function GET(req) {
  try {

    // Import Prisma
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Connect
    await prisma.$connect();

    // Get token from cookies
    const token = req.cookies.get('token')?.value;
    if (!token) {
      await prisma.$disconnect();
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    // Verify token
    const jwt = await import('jsonwebtoken');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (tokenError) {
      await prisma.$disconnect();
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        nama: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        bottleCount: true,
      },
    });

    await prisma.$disconnect();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

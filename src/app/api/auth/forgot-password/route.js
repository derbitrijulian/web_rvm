import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email wajib diisi' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: 'Jika email terdaftar, link reset password akan dikirim' },
        { status: 200 }
      );
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // In a real app, you would send an email here
    // For now, we'll just return the token for testing
    const resetLink = `${
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }/new-password?token=${resetToken}`;

    return NextResponse.json(
      {
        message: 'Jika email terdaftar, link reset password akan dikirim',
        // Remove this in production - only for testing
        resetLink:
          process.env.NODE_ENV === 'development' ? resetLink : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

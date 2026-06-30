import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../../../lib/email';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email wajib diisi' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Jika email terdaftar, link reset password akan dikirim' },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 2);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: tokenExpiry,
      },
    });

    const resetLink = `${
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }/new-password?token=${resetToken}`;

    try {
      await sendPasswordResetEmail(user.email, resetLink);
      console.log('✅ Password reset email sent to:', user.email);
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError);
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: null,
          resetPasswordTokenExpiry: null,
        },
      });

      return NextResponse.json(
        { message: 'Gagal mengirim email. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Jika email terdaftar, link reset password akan dikirim',
        resetLink:
          process.env.NODE_ENV === 'development' ? resetLink : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

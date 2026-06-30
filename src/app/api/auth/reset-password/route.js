import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { token, newPassword, confirmPassword } = await req.json();

    if (!token || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: 'Password konfirmasi tidak cocok' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    console.log('🔍 Reset Password Debug:');
    console.log('Token received (first 10 chars):', token.substring(0, 10));
    console.log('Hashed token (first 10 chars):', hashedToken.substring(0, 10));
    console.log('Current server time:', new Date().toISOString());

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      const userWithToken = await prisma.user.findFirst({
        where: { resetPasswordToken: hashedToken },
        select: { 
          email: true, 
          resetPasswordToken: true, 
          resetPasswordTokenExpiry: true 
        },
      });

      console.log('❌ User not found with valid token');
      if (userWithToken) {
        console.log('⚠️  Token exists but expired');
        console.log('Token expiry:', userWithToken.resetPasswordTokenExpiry?.toISOString());
        console.log('Current time:', new Date().toISOString());
        const diff = userWithToken.resetPasswordTokenExpiry 
          ? (userWithToken.resetPasswordTokenExpiry.getTime() - new Date().getTime()) / 1000 / 60
          : 0;
        console.log('Time difference (minutes):', diff);
      } else {
        console.log('⚠️  Token does not exist in database');
      }

      return NextResponse.json(
        { message: 'Token reset password tidak valid atau sudah kadaluarsa' },
        { status: 400 }
      );
    }

    console.log('✅ Valid token found for user:', user.email);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password dan clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Password berhasil diperbarui. Silakan login dengan password baru Anda.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

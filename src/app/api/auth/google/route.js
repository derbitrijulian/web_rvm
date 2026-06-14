import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    console.log('🔍 Google Auth - ID Token received:', idToken ? 'YES' : 'NO');

    if (!idToken) {
      console.error('❌ ID Token tidak ditemukan');
      return NextResponse.json(
        { error: 'ID Token tidak ditemukan' },
        { status: 400 }
      );
    }

    // Decode JWT ID Token (tanpa verify signature karena sudah di-verify oleh Google di client)
    console.log('🔄 Decoding ID Token...');
    let payload;
    try {
      const parts = idToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      // Decode payload (base64url)
      const decoded = Buffer.from(parts[1], 'base64').toString('utf-8');
      payload = JSON.parse(decoded);
      console.log('✅ ID Token decoded:', {
        email: payload.email,
        name: payload.name,
        sub: payload.sub,
      });
    } catch (err) {
      console.error('❌ Failed to decode ID Token:', err.message);
      return NextResponse.json(
        { error: 'Gagal decode ID Token', details: err.message },
        { status: 400 }
      );
    }

    const { email, name, sub: googleId, aud: audience } = payload;

    console.log('🔐 Verifying audience (client ID)...');
    const expectedClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (audience !== expectedClientId) {
      console.error('❌ Client ID mismatch:', {
        expected: expectedClientId,
        received: audience,
      });
      return NextResponse.json(
        { error: 'Client ID tidak sesuai' },
        { status: 400 }
      );
    }

    if (!email || !googleId) {
      console.error('❌ Missing email or googleId in token');
      return NextResponse.json(
        { error: 'Email atau Google ID tidak ditemukan dalam token' },
        { status: 400 }
      );
    }

    // Cek apakah user sudah ada dengan googleId
    console.log('🔍 Checking if user exists with googleId:', googleId);
    let user = await prisma.user.findUnique({
      where: { googleId },
    });

    let isNewUser = false;

    // Jika belum ada, cek apakah email sudah terdaftar
    if (!user) {
      console.log('🔍 User not found by googleId, checking email:', email);
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        console.warn('⚠️ Email already registered with different account');
        return NextResponse.json(
          {
            error:
              'Email sudah terdaftar dengan akun lain. Silahkan gunakan akun yang sudah ada atau email lain.',
            existingUser: true,
          },
          { status: 400 }
        );
      }

      // Buat user baru
      console.log('➕ Creating new user with Google OAuth');
      user = await prisma.user.create({
        data: {
          email,
          nama: name || 'Google User',
          googleId,
          isGoogleAuth: true,
          password: null,
        },
      });

      // Buat UserBottleCount untuk user baru
      console.log('➕ Creating UserBottleCount for new user');
      await prisma.userBottleCount.create({
        data: {
          userId: user.id,
        },
      });

      isNewUser = true;
      console.log('✅ New user created:', user.id);
    } else if (!user.isGoogleAuth) {
      // Update user yang sudah ada untuk enable Google Auth
      console.log('🔄 Updating existing user to enable Google Auth');
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          isGoogleAuth: true,
        },
      });
    }

    console.log('✅ Google auth success for user:', user.id);

    // Buat JWT token untuk aplikasi (sama seperti login biasa)
    console.log('🔐 Creating JWT token for app...');
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return response dengan token di cookies
    const response = NextResponse.json(
      {
        message: 'Login Google berhasil',
        isNewUser,
        user: {
          id: user.id,
          email: user.email,
          nama: user.nama,
          googleId: user.googleId,
        },
      },
      { status: 200 }
    );

    // Set JWT token di cookies
    response.cookies.set('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 hari
      path: '/',
    });

    console.log('✅ JWT token set in cookies and response sent');

    return response;
  } catch (error) {
    console.error('❌ Google auth error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Terjadi kesalahan',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

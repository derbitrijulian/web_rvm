import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password, confirmPassword, fullName, phone } =
      await req.json();

    console.log('📝 Registration attempt:', { email, fullName, phone });

    // Validasi field kosong
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { message: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Validasi password cocok
    if (password !== confirmPassword) {
      console.error('❌ Password mismatch');
      return NextResponse.json(
        { message: 'Password tidak cocok' },
        { status: 400 }
      );
    }

    // Validasi password length
    if (password.length < 6) {
      console.error('❌ Password too short');
      return NextResponse.json(
        { message: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Cek duplikasi email
    console.log('🔍 Checking email duplication...');
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      console.warn('⚠️ Email already exists');
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Cek duplikasi phone
    console.log('🔍 Checking phone duplication...');
    const existingUserByPhone = await prisma.user.findFirst({
      where: { phoneNumber: phone },
    });
    if (existingUserByPhone) {
      console.warn('⚠️ Phone already exists');
      return NextResponse.json(
        { message: 'Nomor telepon sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    console.log('💾 Creating new user...');
    const newUser = await prisma.user.create({
      data: {
        email,
        nama: fullName,
        phoneNumber: phone,
        password: hashedPassword,
        googleId: null,
        isGoogleAuth: false,
      },
    });

    // Buat UserBottleCount untuk user baru
    console.log('➕ Creating UserBottleCount...');
    await prisma.userBottleCount.create({
      data: {
        userId: newUser.id,
      },
    });

    console.log('✅ Registration successful for user:', newUser.id);

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        userId: newUser.id,
        email: newUser.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    console.error('Error details:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

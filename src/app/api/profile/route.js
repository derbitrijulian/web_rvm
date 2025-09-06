import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Helper function untuk verifikasi token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token tidak ditemukan. Silakan login kembali.' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Token tidak valid. Silakan login kembali.' },
        { status: 401 }
      );
    }


    await prisma.$connect();

    // Ambil data user dari database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        bottleCount: true, // Include bottle count data
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus password dari response untuk keamanan
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        code: 200,
        message: 'Berhasil mengambil data profile',
        data: {
          id: userWithoutPassword.id,
          email: userWithoutPassword.email,
          nama: userWithoutPassword.nama,
          phoneNumber: userWithoutPassword.phoneNumber,
          createdAt: userWithoutPassword.createdAt,
          updatedAt: userWithoutPassword.updatedAt,
          bottleCount: userWithoutPassword.bottleCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {

    return NextResponse.json(
      {
        message: 'Terjadi kesalahan server',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  } c
}

export async function PUT(req) {
  try {
    // Ambil token dari cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token tidak ditemukan. Silakan login kembali.' },
        { status: 401 }
      );
    }

    // Verifikasi token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Token tidak valid. Silakan login kembali.' },
        { status: 401 }
      );
    }

    const { nama, phoneNumber } = await req.json();

    // Validasi input
    if (!nama || !phoneNumber) {
      return NextResponse.json(
        { message: 'Nama dan nomor telepon wajib diisi' },
        { status: 400 }
      );
    }

    // Update data user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        nama,
        phoneNumber,
        updatedAt: new Date(),
      },
      include: {
        bottleCount: true,
      },
    });

    // Hapus password dari response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        code: 200,
        message: 'Profile berhasil diupdate',
        data: {
          id: userWithoutPassword.id,
          email: userWithoutPassword.email,
          nama: userWithoutPassword.nama,
          phoneNumber: userWithoutPassword.phoneNumber,
          createdAt: userWithoutPassword.createdAt,
          updatedAt: userWithoutPassword.updatedAt,
          bottleCount: userWithoutPassword.bottleCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update Profile Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
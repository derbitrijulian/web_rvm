import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Helper function untuk verifikasi token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: Tidak ada token' },
        { status: 401 }
      );
    }

    // Verifikasi token
    const decoded = verifyToken(token.value);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized: Token tidak valid' },
        { status: 401 }
      );
    }

    // Ambil data user dari database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        bottleCount: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus password dari response
    const { password, ...userWithoutPassword } = user;

    const userDetails = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      nama: userWithoutPassword.nama,
      phoneNumber: userWithoutPassword.phoneNumber,
      createdAt: userWithoutPassword.createdAt,
      updatedAt: userWithoutPassword.updatedAt,
      bottleCount: userWithoutPassword.bottleCount,
    };

    return NextResponse.json(
      {
        code: 200,
        message: 'Success',
        data: userDetails,
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

// GET all users (untuk admin)
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where condition for search
    const whereCondition = search
      ? {
          OR: [
            { nama: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phoneNumber: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Get total count
    const totalData = await prisma.user.count({
      where: whereCondition,
    });

    // Get users with pagination
    const users = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        bottleCount: true,
      },
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

    const totalPage = Math.ceil(totalData / limit);

    return NextResponse.json(
      {
        code: 200,
        message: 'Success fetching users',
        data: {
          total_data: totalData,
          page,
          limit,
          total_page: totalPage,
          data: users,
        },
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

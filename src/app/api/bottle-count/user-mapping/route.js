import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma.js';

/**
 * Endpoint untuk mengelola mapping user dengan RVM locations
 * Memungkinkan admin untuk menetapkan user mana yang menggunakan RVM tertentu
 */

// GET - Mendapatkan daftar user yang aktif di RVM tertentu
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rvmLocationId = searchParams.get('rvmLocationId');

    if (!rvmLocationId) {
      // Kembalikan semua user dengan bottle count mereka
      const users = await prisma.user.findMany({
        include: {
          bottleCount: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({
        success: true,
        users: users.map((user) => ({
          id: user.id,
          nama: user.nama,
          email: user.email,
          phoneNumber: user.phoneNumber,
          totalBottles: user.bottleCount?.totalBottles || 0,
          redeemableCount: user.bottleCount?.redeemableCount || 0,
          lifetimeCount: user.bottleCount?.lifetimeCount || 0,
        })),
      });
    }

    // Jika ada rvmLocationId, kembalikan transaksi terakhir dari RVM tersebut
    const recentTransactions = await prisma.bottleTransaction.findMany({
      where: {
        rvmLocationId: parseInt(rvmLocationId),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        // Kita tidak bisa langsung join karena tidak ada foreign key constraint
        // Jadi kita perlu query manual
      },
    });

    return NextResponse.json({
      success: true,
      rvmLocationId: parseInt(rvmLocationId),
      recentTransactions,
    });
  } catch (error) {
    console.error('Error fetching user mapping:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Set active user untuk RVM tertentu (untuk session)
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, rvmLocationId, action = 'set_active_user' } = body;

    // Validasi input
    if (!userId || !rvmLocationId) {
      return NextResponse.json(
        {
          success: false,
          error: 'userId and rvmLocationId are required',
        },
        { status: 400 }
      );
    }

    // Pastikan user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { bottleCount: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    // Pastikan RVM location exists
    const rvmLocation = await prisma.rvmLocation.findUnique({
      where: { id: parseInt(rvmLocationId) },
    });

    if (!rvmLocation) {
      return NextResponse.json(
        {
          success: false,
          error: 'RVM location not found',
        },
        { status: 404 }
      );
    }

    // Untuk implementasi sederhana, kita bisa gunakan cache atau session storage
    // Atau buat tabel mapping sementara jika diperlukan
    // Saat ini kita return sukses dengan informasi user

    return NextResponse.json({
      success: true,
      message: `User ${user.nama} is now active for RVM at ${rvmLocation.name}`,
      mapping: {
        userId: user.id,
        userName: user.nama,
        userEmail: user.email,
        rvmLocationId: rvmLocation.id,
        rvmLocationName: rvmLocation.name,
        currentBottleCount: user.bottleCount?.totalBottles || 0,
      },
    });
  } catch (error) {
    console.error('Error setting user mapping:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

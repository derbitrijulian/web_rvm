import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { broadcastBottleDetection } from '../../../../lib/socket.js';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    console.log('=== Arduino Bottle API Called ===');
    console.log('⏰ Timestamp:', new Date().toISOString());

    let body;
    try {
      const text = await request.text();
      console.log('📥 Raw request body:', text);

      if (!text || text.trim() === '') {
        throw new Error('Empty request body');
      }

      body = JSON.parse(text);
      console.log('📥 Parsed data:', body);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          error: parseError.message,
        },
        { status: 400 }
      );
    }

    // Parse and validate the data
    const parsedData = {
      deviceId: body.deviceId,
      bottleCount: parseInt(body.bottleCount) || 1,
      userId: body.userId || null,
      rvmLocationId: parseInt(body.rvmLocationId),
      description: body.description || 'Arduino Detection',
      distance: parseFloat(body.distance) || 0,
    };

    console.log('🔍 Parsed values:', parsedData);

    if (!parsedData.deviceId || !parsedData.rvmLocationId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: deviceId and rvmLocationId',
        },
        { status: 400 }
      );
    }

    console.log(
      '⚙️ Processing bottle detection from device:',
      parsedData.deviceId
    );

    // Verify location exists
    const location = await prisma.rvmLocation.findUnique({
      where: { id: parsedData.rvmLocationId },
    });

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: `Location with ID ${parsedData.rvmLocationId} not found`,
        },
        { status: 404 }
      );
    }

    console.log('✅ Valid location ID found:', parsedData.rvmLocationId);

    // Create bottle detection record
    const newRecord = await prisma.bottleCount.create({
      data: {
        deviceId: parsedData.deviceId,
        count: parsedData.bottleCount,
        distance: parsedData.distance,
        source: 'arduino',
        timestamp: new Date(),
      },
    });

    console.log('✅ Bottle detection recorded:', {
      deviceId: parsedData.deviceId,
      count: parsedData.bottleCount,
      distance: parsedData.distance,
      id: newRecord.id,
    });

    console.log('📝 Bottle detection recorded for BottleIn display');

    // Calculate total unclaimed bottles
    const totalUnclaimedBottles = await prisma.bottleCount.aggregate({
      where: {
        userBottleCountId: null, // Belum diklaim
      },
      _sum: {
        count: true,
      },
    });

    const totalBottles = totalUnclaimedBottles._sum.count || 0;
    console.log('🔢 Total unclaimed bottles:', totalBottles);

    // Broadcast real-time update via Socket.IO
    const realtimeData = {
      deviceId: parsedData.deviceId,
      bottleCount: parsedData.bottleCount,
      totalUnclaimedBottles: totalBottles,
      distance: parsedData.distance,
      locationName: location.name,
      recordId: newRecord.id,
      timestamp: newRecord.timestamp,
    };

    // Broadcast to all connected clients
    broadcastBottleDetection(realtimeData);

    return NextResponse.json({
      success: true,
      message: 'Bottle detection recorded successfully',
      data: {
        recordId: newRecord.id,
        deviceId: parsedData.deviceId,
        bottleCount: parsedData.bottleCount,
        distance: parsedData.distance,
        totalUnclaimedBottles: totalBottles,
        thisDetectionCount: newRecord.count,
        location: location.name,
      },
    });
  } catch (error) {
    console.error('❌ Arduino API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('=== Arduino Stats API Called ===');

    // ✅ Stats dengan filter yang lebih detail
    const totalTransactions = await prisma.bottleTransaction.count({
      where: { transactionType: 'DEPOSIT' },
    });

    const totalBottles = await prisma.bottleTransaction.aggregate({
      where: { transactionType: 'DEPOSIT' },
      _sum: { bottleCount: true },
    });

    // Ambil transaksi terbaru dengan informasi lengkap
    const recentTransactions = await prisma.bottleTransaction.findMany({
      where: { transactionType: 'DEPOSIT' },
      orderBy: { timestamp: 'desc' },
      take: 10,
      select: {
        id: true,
        userBottleCountId: true,
        deviceId: true,
        transactionType: true,
        bottleCount: true,
        pointsEarned: true,
        timestamp: true,
      },
    });

    // Stats per device
    const statsByDevice = await prisma.bottleTransaction.groupBy({
      by: ['deviceId'],
      where: {
        transactionType: 'DEPOSIT',
        deviceId: { not: null },
      },
      _sum: { bottleCount: true },
      _count: { id: true },
    });

    const response = {
      success: true,
      message: 'Arduino API is working',
      timestamp: new Date().toISOString(),
      stats: {
        totalTransactions,
        totalBottles: totalBottles._sum.bottleCount || 0,
        recentTransactions,
        statsByDevice,
      },
    };

    console.log('📊 Stats response:', response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get stats',
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

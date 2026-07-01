import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  try {
    // VALIDASI API KEY DARI ARDUINO
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ARDUINO_API_KEY) {
      console.error('❌ Unauthorized: Invalid API Key during polling');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) {
      return NextResponse.json(
        { success: false, error: 'deviceId parameter is required' },
        { status: 400 }
      );
    }

    const now = new Date();

    const activeSession = await prisma.arduinoSession.findFirst({
      where: {
        deviceId,
        isActive: true,
        expiresAt: {
          gt: now,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (activeSession) {
      console.log(`✅ Active session found for device ${deviceId}`);
      console.log(`👤 User: ${activeSession.userId}`);

      return NextResponse.json({
        success: true,
        userId: activeSession.userId,
        sessionId: activeSession.id,
        expiresAt: activeSession.expiresAt,
      });
    } else {
      const expiredSessions = await prisma.arduinoSession.updateMany({
        where: {
          deviceId,
          isActive: true,
          expiresAt: {
            lte: now,
          },
        },
        data: {
          isActive: false,
        },
      });

      if (expiredSessions.count > 0) {
        console.log(
          `🔒 ${expiredSessions.count} expired session(s) deactivated for device ${deviceId}`
        );
      }

      return NextResponse.json({
        success: true,
        userId: null,
        message: 'No active session',
      });
    }
  } catch (error) {
    console.error('❌ Error checking active session:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

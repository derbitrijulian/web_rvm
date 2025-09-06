import { NextRequest, NextResponse } from 'next/server';
import { bottleService } from '../../../services/bottle-service.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const bottleCount = await bottleService.getUserBottleCount(userId);

    return NextResponse.json({
      success: true,
      data: bottleCount
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, action, amount, rvmLocationId, description } = body;

    if (!userId || !action || !amount) {
      return NextResponse.json(
        { success: false, message: 'User ID, action, and amount are required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'add':
        result = await bottleService.addBottles(userId, amount, rvmLocationId, description);
        break;
      case 'redeem':
        result = await bottleService.redeemBottles(userId, amount, description);
        break;
      case 'adjust':
        if (!description) {
          return NextResponse.json(
            { success: false, message: 'Description is required for adjustment' },
            { status: 400 }
          );
        }
        result = await bottleService.adjustBottleCount(userId, amount, description);
        break;
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action. Use: add, redeem, or adjust' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `Bottles ${action} successful`
    });
  } catch (error) {
    console.error('Error processing bottle action:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { bottleService } from '../../../../services/bottle-service.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const history = await bottleService.getTransactionHistory(
      userId,
      page,
      limit
    );

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

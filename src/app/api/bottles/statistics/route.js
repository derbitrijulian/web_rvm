import { NextRequest, NextResponse } from 'next/server';
import { bottleService } from '../../../../services/bottle-service.js';

export async function GET(request) {
  try {
    // TODO: Add admin authentication check here
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { success: false, message: 'Admin access required' },
    //     { status: 403 }
    //   );
    // }

    const statistics = await bottleService.getBottleStatistics();

    return NextResponse.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

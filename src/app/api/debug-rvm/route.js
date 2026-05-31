import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Get raw data from database
    const locations = await prisma.rvmLocation.findMany({
      take: 5,
    });

    console.log('🔍 Raw locations data from database:');
    locations.forEach((loc) => {
      console.log(`Location ID ${loc.id} (${loc.name}):`, {
        image: loc.image,
        imageLength: loc.image?.length || 0,
        imageType: typeof loc.image,
      });
    });

    return NextResponse.json({
      success: true,
      data: locations.map((loc) => ({
        id: loc.id,
        name: loc.name,
        image: loc.image,
      })),
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

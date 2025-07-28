import prisma from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (!id || isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Valid ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const { name, position, capacity, capacityStatus } = body;

    if (
      !name ||
      !position?.latitude ||
      !position?.longitude ||
      typeof capacity !== 'number' ||
      !capacityStatus
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid fields' },
        { status: 400 }
      );
    }

    const updatedRvm = await prisma.rvmLocation.update({
      where: { id: numericId },
      data: {
        name,
        position: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
        capacity,
        capacityStatus,
      },
    });

    return NextResponse.json(
      { message: 'RVM location updated', data: updatedRvm },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT /rvm-locations/[id]/edit error:', error);
    return NextResponse.json(
      { error: 'Failed to update RVM location' },
      { status: 500 }
    );
  }
}

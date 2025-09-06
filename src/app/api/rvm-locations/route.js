import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;


    // Test database connection
    await prisma.$connect();


    const totalData = await prisma.rvmLocation.count();

    const locations = await prisma.rvmLocation.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        position: true,
        capacity: true,
        capacityStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });


    const totalPage = Math.ceil(totalData / limit);

    return NextResponse.json({
      code: 200,
      message: 'Success fetching RVM locations',
      data: {
        total_data: totalData,
        page,
        limit,
        total_page: totalPage,
        data: locations.map((loc) => ({
          id: loc.id,
          name: loc.name,
          position: loc.position,
          capacity: loc.capacity,
          capacityStatus: loc.capacityStatus,
          created_at: loc.createdAt,
          updated_at: loc.updatedAt,
        })),
      },
    });
  } catch (error) {

    return NextResponse.json(
      {
        code: 500,
        message: 'Internal server error',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, latitude, longitude, status } = body;

    if (!name || latitude == null || longitude == null || !status) {
      return new NextResponse(
        JSON.stringify({ error: 'Semua field harus diisi' }),
        { status: 400 }
      );
    }

    const location = await prisma.rvmLocation.create({
      data: {
        name,
        position: {
          latitude,
          longitude,
        },
        capacity: 0, // atau nilai default
        capacityStatus: status,
      },
    });

    return new NextResponse(JSON.stringify(location), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

// Delete by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required to delete an RVM location.' },
        { status: 400 }
      );
    }

    // Check if RVM location exists
    const existingLocation = await prisma.rvmLocation.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingLocation) {
      return NextResponse.json(
        { error: 'RVM location with this ID does not exist' },
        { status: 404 }
      );
    }

    // Delete the RVM location
    await prisma.rvmLocation.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: `RVM location with ID ${id} successfully deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting RVM location:', error);
    return NextResponse.json(
      { error: 'Failed to delete RVM location' },
      { status: 500 }
    );
  }
}

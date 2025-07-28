import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

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

        // updatedAt: true,
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
    console.error(error);
    return NextResponse.json(
      {
        code: 500,
        message: 'Internal server error',
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
    console.error('POST Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

// delete by id rvm
export async function DELETEBYID(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID is required to delete a marker.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const markerDoc = doc(db, 'rvm-locations', `rvm-${id}`);
    const markerSnapshot = await getDoc(markerDoc);

    if (!markerSnapshot.exists()) {
      return new Response(
        JSON.stringify({ error: 'Marker with this ID does not exists' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await deleteDoc(markerDoc);

    return new Response(
      JSON.stringify({
        message: `RVM location with ID ${id} successfully deleted`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting RVM location:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete RVM location' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// delete all rvm
export async function DELETE(req) {
  try {
    const rvmCollection = collection(db, 'rvm-locations');
    const snapshot = await getDocs(rvmCollection);

    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    return new Response(
      JSON.stringify({ message: 'All RVM locations successfully deleted.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting RVM locations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete RVM locations' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

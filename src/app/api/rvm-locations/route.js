import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Get total count and locations in parallel for better performance
    const [totalData, locations] = await Promise.all([
      prisma.rvmLocation.count(),
      prisma.rvmLocation.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          address: true,
          position: true,
          capacity: true,
          currentStock: true,
          capacityStatus: true,
          operationalHours: true,
          contactNumber: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const totalPage = Math.ceil(totalData / limit);

    // Validate and transform location data
    const validatedLocations = locations.map((loc) => {
      // Validate position
      const position = loc.position;
      let validPosition = position;

      if (position && typeof position === 'object') {
        const lat = position.latitude;
        const lng = position.longitude;

        // Log position data for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`📍 Location ${loc.id} (${loc.name}):`, {
            lat,
            lng,
            type: typeof position,
            isObject: true,
          });
        }

        // Validate coordinates
        if (
          typeof lat === 'number' &&
          typeof lng === 'number' &&
          !isNaN(lat) &&
          !isNaN(lng)
        ) {
          if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            validPosition = position;
          } else {
            console.error(`❌ Invalid coordinate range for ${loc.name}:`, {
              lat,
              lng,
            });
            validPosition = { latitude: 0, longitude: 0 }; // Fallback
          }
        }
      }

      return {
        id: loc.id,
        name: loc.name,
        address: loc.address,
        position: validPosition,
        capacity: loc.capacity,
        currentStock: loc.currentStock,
        capacityStatus: loc.capacityStatus,
        operationalHours: loc.operationalHours,
        contactNumber: loc.contactNumber,
        status: loc.status,
        created_at: loc.createdAt,
        updated_at: loc.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      code: 200,
      message: 'Success fetching RVM locations',
      data: validatedLocations,
      pagination: {
        total_data: totalData,
        page,
        limit,
        total_page: totalPage,
      },
    });
  } catch (error) {
    console.error('Error fetching RVM locations:', error);

    return NextResponse.json(
      {
        success: false,
        code: 500,
        message: 'Internal server error',
        error:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Database connection failed',
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      address,
      latitude,
      longitude,
      status,
      capacity,
      currentStock,
      operationalHours,
      contactNumber,
    } = body;

    // Validate required fields
    if (!name || latitude == null || longitude == null || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Required fields: name, latitude, longitude, status',
        },
        { status: 400 }
      );
    }

    // Validate latitude and longitude ranges
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid latitude or longitude values',
        },
        { status: 400 }
      );
    }

    // Calculate capacity status based on current stock and capacity
    let calculatedCapacityStatus = 'AVAILABLE';
    if (currentStock && capacity) {
      const fillPercentage = (currentStock / capacity) * 100;
      if (fillPercentage >= 90) {
        calculatedCapacityStatus = 'FULL';
      } else if (fillPercentage >= 70) {
        calculatedCapacityStatus = 'ALMOST_FULL';
      }
    }

    const location = await prisma.rvmLocation.create({
      data: {
        name,
        address: address || null,
        position: {
          latitude: lat,
          longitude: lng,
        },
        capacity: capacity ? parseInt(capacity) : 100,
        currentStock: currentStock ? parseInt(currentStock) : 0,
        capacityStatus: calculatedCapacityStatus,
        operationalHours: operationalHours || '08:00-22:00',
        contactNumber: contactNumber || null,
        status: status.toUpperCase(), // Ensure consistent case
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'RVM location created successfully',
        data: {
          id: location.id,
          name: location.name,
          address: location.address,
          position: location.position,
          capacity: location.capacity,
          currentStock: location.currentStock,
          capacityStatus: location.capacityStatus,
          operationalHours: location.operationalHours,
          contactNumber: location.contactNumber,
          status: location.status,
          createdAt: location.createdAt,
          updatedAt: location.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating RVM location:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID is required to delete an RVM location.',
        },
        { status: 400 }
      );
    }

    // Check if RVM location exists
    const existingLocation = await prisma.rvmLocation.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingLocation) {
      return NextResponse.json(
        {
          success: false,
          error: 'RVM location with this ID does not exist',
        },
        { status: 404 }
      );
    }

    // Delete the RVM location
    await prisma.rvmLocation.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      {
        success: true,
        message: `RVM location with ID ${id} successfully deleted`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting RVM location:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete RVM location',
      },
      { status: 500 }
    );
  }
}

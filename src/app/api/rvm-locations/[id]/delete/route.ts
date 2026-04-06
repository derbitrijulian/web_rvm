import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const rvm = await prisma.rvmLocation.findUnique({
      where: { id: parseInt(id, 10) }, // Convert to number
    });

    if (!rvm) {
      return NextResponse.json(
        { error: `No RVM location found with ` },
        { status: 404 }
      );
    }

    await prisma.rvmLocation.delete({
      where: { id: parseInt(id, 10) }, // Convert to number
    });

    return NextResponse.json(
      { message: `RVM location with ID deleted` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete RVM location' },
      { status: 500 }
    );
  }
}

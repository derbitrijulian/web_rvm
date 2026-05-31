import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST to publish/unpublish news
export async function POST(request) {
  try {
    const { id, isPublished } = await request.json();

    const news = await prisma.news.update({
      where: { id },
      data: {
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({
      message: `News ${isPublished ? 'published' : 'unpublished'} successfully`,
      news,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

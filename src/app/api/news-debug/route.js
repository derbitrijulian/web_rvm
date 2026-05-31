import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// DEBUG: Get ALL news including unpublished
export async function GET(request) {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const publishedNews = await prisma.news.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json({
      total: allNews.length,
      published: publishedNews.length,
      unpublished: allNews.filter((n) => !n.isPublished).length,
      allNews,
      publishedNews,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

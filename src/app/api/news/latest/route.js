import { NextResponse } from 'next/server';
import { getAllNews } from '../../../../services/news-service';

export async function GET() {
  try {
    const news = await getAllNews();
    return NextResponse.json({ data: news });
  } catch (error) {
    console.error('[API] Error in /api/news/latest:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest news' },
      { status: 500 }
    );
  }
}

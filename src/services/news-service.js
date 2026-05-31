import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all published news
export async function getAllNews() {
  try {
    // Fetch all news (include unpublished) so user app always sees latest records.
    // If you want only published items, revert to filtering `isPublished: true`.
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('[NEWS SERVICE] Fetched', news.length, 'published news');
    return news;
  } catch (error) {
    console.error('[NEWS SERVICE] Error fetching news:', error.message);
    return [];
  }
}

// Get news by ID
export async function getNewsById(id) {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
    });
    return news;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    return null;
  }
}

// Create news (admin only)
export async function createNews(data) {
  try {
    const news = await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        category: data.category,
        createdBy: data.createdBy,
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });
    return news;
  } catch (error) {
    console.error('Error creating news:', error);
    return null;
  }
}

// Update news (admin only)
export async function updateNews(id, data) {
  try {
    const news = await prisma.news.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        category: data.category,
        isPublished: data.isPublished,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });
    return news;
  } catch (error) {
    console.error('Error updating news:', error);
    return null;
  }
}

// Delete news (admin only)
export async function deleteNews(id) {
  try {
    await prisma.news.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    console.error('Error deleting news:', error);
    return false;
  }
}

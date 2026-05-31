import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixNewsData() {
  try {
    console.log('Starting to fix news data...');

    // Get all news
    const allNews = await prisma.news.findMany();

    console.log('Found', allNews.length, 'news records');

    // Update each news with proper publishedAt
    for (const news of allNews) {
      if (!news.publishedAt) {
        // Set publishedAt to createdAt if it's null
        await prisma.news.update({
          where: { id: news.id },
          data: {
            publishedAt: news.createdAt,
            isPublished: true,
          },
        });
        console.log('Updated:', news.title);
      }
    }

    console.log('✅ All news data fixed!');

    // Show all news
    const updatedNews = await prisma.news.findMany();
    console.log('\nFinal data:');
    updatedNews.forEach((n) => {
      console.log(`- ${n.title}`);
      console.log(`  Category: ${n.category}`);
      console.log(`  Published: ${n.isPublished}`);
      console.log(`  PublishedAt: ${n.publishedAt}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixNewsData();

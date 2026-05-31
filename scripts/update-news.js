import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAllNews() {
  try {
    console.log('📝 Finding and updating all news...\n');

    // Get all news first
    const allNews = await prisma.news.findMany();
    console.log(`Found ${allNews.length} news record(s)\n`);

    // Update each one
    for (const news of allNews) {
      const updated = await prisma.news.update({
        where: { id: news.id },
        data: {
          category: 'Teknologi RVM',
          isPublished: true,
          publishedAt: news.createdAt,
        },
      });

      console.log('✅ Updated:');
      console.log('- ID:', updated.id);
      console.log('- Title:', updated.title);
      console.log('- Category:', updated.category);
      console.log('- IsPublished:', updated.isPublished);
      console.log('- PublishedAt:', updated.publishedAt);
      console.log('');
    }

    console.log('✅ All news updated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllNews();

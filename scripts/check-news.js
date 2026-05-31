import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkNewsData() {
  try {
    const allNews = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        isPublished: true,
        createdAt: true,
        publishedAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log('\n📋 NEWS DATA IN DATABASE:\n');
    allNews.forEach((news, index) => {
      console.log(`${index + 1}. ${news.title}`);
      console.log(`   Category: ${news.category}`);
      console.log(`   IsPublished: ${news.isPublished}`);
      console.log(`   CreatedAt: ${news.createdAt}`);
      console.log(`   PublishedAt: ${news.publishedAt}`);
      console.log(`   UpdatedAt: ${news.updatedAt}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkNewsData();

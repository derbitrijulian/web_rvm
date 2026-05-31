import Image from 'next/image';
import Link from 'next/link';
import { getNewsById } from '@/services/news-service';
import { getRelativeTime } from '@/utils/dateFormatter';

export default async function NewsPage({ searchParams }) {
  const { id } = await searchParams;
  const news = id ? await getNewsById(id) : null;

  // Default fallback jika news tidak ditemukan
  const defaultNews = {
    title: 'Berita tidak ditemukan',
    content: 'Maaf, berita yang Anda cari tidak tersedia.',
    publishedAt: new Date(),
    imageUrl: '/png/image-news1.png',
  };

  const newsData = news || defaultNews;

  return (
    <div className="relative h-screen pt-[35px]">
      {/* Background Image */}
      <Image
        src={newsData.imageUrl || '/png/image-news1.png'}
        alt={newsData.title}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="z-0"
      />

      {/* Header */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-30">
        <div className="flex items-center justify-between p-4">
          {/* Back Button */}
          <Link href="/news">
            <button className="text-white">
              <Image
                src="/svg/image-back.svg"
                alt="Back"
                width={14}
                height={25}
              />
            </button>
          </Link>

          {/* Page Title */}
          <h1 className="text-bgSecondary font-semibold w-full text-start text-[24px] pb-6 pt-4 pl-7">
            Berita
          </h1>
        </div>

        {/* Content Section */}
        <div className=" bg-white rounded-t-3xl p-6 mt-80">
          <h2 className="text-xl font-bold mb-2 text-primary">
            {newsData.title}
          </h2>
          <p className="text-primary mb-4">
            {getRelativeTime(newsData.publishedAt || newsData.createdAt)}
          </p>
          <p className="text-text-primary leading-relaxed">
            {newsData.content}
          </p>
        </div>
      </div>
    </div>
  );
}

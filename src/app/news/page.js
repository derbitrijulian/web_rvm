import Image from 'next/image';
import Link from 'next/link';
import { getAllNews } from '@/services/news-service';
import { getRelativeTime } from '@/utils/dateFormatter';

export default async function Page() {
  const news = await getAllNews();

  console.log('[NEWS PAGE] Rendered with', news?.length || 0, 'news items');

  return (
    <div className="bg-primary pt-[35px] min-h-screen flex flex-col">
      <div className="absolute ">
        <div className="flex items-center justify-between px-6">
          {/* Back Button */}
          <Link href="/home">
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
      </div>
      <div className="bg-bgSecondary rounded-t-[36px] pt-10 mt-16 flex-1">
        <div className="grid gap-8 px-5 pb-8">
          {news && news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="flex gap-8">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    width={112}
                    height={112}
                    alt={item.title}
                    className="rounded-[10px] object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-sm font-medium text-text-primary">
                      {item.title}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-[10px] font-medium text-primary">
                        {getRelativeTime(item.publishedAt || item.createdAt)}
                      </p>
                      <Link href={`/view-news?id=${item.id}`}>
                        <p className="text-[10px] font-medium text-primary hover:underline">
                          Selengkapnya
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-text-primary">Tidak ada berita saat ini</p>
              <p className="text-[12px] text-primary mt-2">
                Total berita: {news?.length || 0}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

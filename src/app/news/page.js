import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-primary pt-[35px]">
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
      <div className="bg-bgSecondary h-screen rounded-t-[36px] pt-10 mt-16">
        <div className="grid gap-8 px-5">
          {/* image 1 */}
          <div className="flex gap-8">
            <Image
              src="/png/image-news1.png"
              width={112}
              height={112}
              alt="news 1"
              className="rounded-[10px]"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">Hari ini</h1>
              <p className="text-sm font-medium text-text-primary py-2">
                Sinar Mas resmikan reverse vending Machine Di Kalibata Plaza
              </p>
              <div className="flex justify-between">
                <p className="text-[10px] font-medium text-primary">
                  6 jam yang lalu
                </p>
                <Link href="/view-news">
                  <p className="text-[10px] font-medium text-primary hover:underline">
                    Selengkapnya
                  </p>
                </Link>
              </div>
            </div>
          </div>
          {/* image 2 */}
          <div className="flex gap-8">
            <Image
              src="/png/image-news2.png"
              width={112}
              height={112}
              alt="news 2"
              className="rounded-[10px]"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">
                2 hari yang lalu
              </h1>
              <p className="text-sm font-medium text-text-primary py-4">
                ASDP tambah reverse vending machine
              </p>
              <div className="flex justify-between">
                <p className="text-[10px] font-medium text-primary">
                  28 Feb 2024
                </p>
                <p className="text-[10px] font-medium text-primary hover:underline">
                  Selengkapnya
                </p>
              </div>
            </div>
          </div>
          {/* image 3 */}
          <div className="flex gap-8">
            <Image
              src="/png/image-news3.png"
              width={112}
              height={112}
              alt="news 3"
              className="rounded-[10px]"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">
                Seminggu yang lalu
              </h1>
              <p className="text-sm font-medium text-text-primary py-2">
                RH Group Luncurkan Kosmetik reverse Vending Machine
              </p>
              <div className="flex justify-between">
                <p className="text-[10px] font-medium text-primary">
                  21 Feb 2024
                </p>
                <p className="text-[10px] font-medium text-primary hover:underline">
                  Selengkapnya
                </p>
              </div>
            </div>
          </div>
          {/* image 4 */}
          <div className="flex gap-8">
            <Image
              src="/png/image-news4.png"
              width={112}
              height={112}
              alt="news 4"
              className="rounded-[10px]"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">
                2 Minggu yang lalu
              </h1>
              <p className="text-sm font-medium text-text-primary py-2">
                Sinar Mas resmikan reverse vending Machine Di Kalibata Plaza
              </p>
              <div className="flex justify-between">
                <p className="text-[10px] font-medium text-primary">
                  18 Feb 2024
                </p>
                <p className="text-[10px] font-medium text-primary hover:underline">
                  Selengkapnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

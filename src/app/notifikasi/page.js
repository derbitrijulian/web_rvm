'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-primary h-screen pt-[35px] ">
      <div className="flex justify-beetween items-center pl-10 pt-2 gap-6">
        <Link href="/home">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>
        <h1 className="text-bgSecondary font-semibold text-start text-[20px] ">
          Notifikasi
        </h1>
        <span className="text-2xl rounded-full bg-[#FEFEFE] px-2">0</span>
      </div>

      <div className="grid justify-center bg-bgSecondary h-full rounded-t-[36px] mt-10 pt-10 px-9 pb-8">
        <div className="flex justify-center items-center bg-secondary rounded-full w-[283px] h-[283px] mt-28">
          <Image src="/svg/notif.svg" alt="notif" width={149} height={193} />
        </div>
        <div className="flex justify-center">
          <span className="text-center font-bold text-[22px]">
            Tidak ada Notifikasi
            <Link href="/" className="">
              <button className="px-16 py-3 my-12 bg-primary rounded-xl text-white font-semibold text-xl">
                Ulangi
              </button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

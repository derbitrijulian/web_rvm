import OptionItem from '@/components/containers/option-items';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="bg-primary h-screen pt-[35px]">
      {/* Header */}
      <div className="justify-center mx-6">
        <h1 className="text-bgSecondary font-semibold w-full text-center text-[24px] pb-6 pt-1">
          Aktifitas
        </h1>

        <div className="space-y-2">
          <div className="grid gap-0 justify-center text-center shadow-lg rounded-2xl bg-white h-16 p-1">
            <span className="font-medium text-text-primary">Total Poin</span>
            <span className="font-bold text-primary text-2xl">512</span>
          </div>

          <div className="flex justify-beetween gap-2">
            {/* Total Poin */}
            <div className="grid gap-0 justify-center text-center shadow-lg rounded-2xl bg-primary w-[160px] h-16 p-1">
              <div className="flex justify-beetween">
                <Image
                  src="/svg/Income.svg"
                  alt="income"
                  width={12}
                  height={12}
                />
                <span className="font-regular text-white text-xs pl-2 my-1">
                  Total Tarik Saldo
                </span>
              </div>
              <span className="font-bold text-white text-2xl">Rp. 62.720</span>
            </div>
            <div className="grid gap-0 justify-center text-center shadow-lg rounded-2xl bg-white w-[160px] h-16 p-1">
              <div className="flex justify-beetween">
                <Image
                  src="/svg/Expense.svg"
                  alt="expense"
                  width={12}
                  height={12}
                />
                <span className="font-regular text-primary text-xs pl-2 my-1">
                  Total Botol
                </span>
              </div>
              <span className="font-bold text-primary text-2xl">256 pcs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] pt-10 px-9 pb-8 mt-3 relative">
        <div className="">
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-start">April 2024</span>
            <div className="flex justify-end gap-1">
              <Image
                src="/svg/calendar.svg"
                alt="icon calendar"
                width={15.75}
                height={15.75}
              />
              <p className="text-primary hover:underline text-sm">
                Lihat Semua
              </p>
            </div>
          </div>
        </div>

        {/* Ambil Poin */}
        <div className="space-y-6 my-5">
          <div className="flex justify-start space-x-4 ">
            <div className="bg-secondary w-14 h-[53px] rounded-2xl "></div>
            <div className="grid gap-0">
              <h1 className="font-medium text-sm">Ambil Poin</h1>
              <p className="font-semibold text-gray-500 text-xs">
                18:27 - April 30
              </p>
            </div>
            <div className="py-4">
              <p className="text-xs">56</p>
            </div>
            <div>
              <button className="bg-primary rounded-xl text-nowrap p-1 my-2 text-white">
                Ambil Poin
              </button>
            </div>
          </div>

          <div className="flex justify-start space-x-4  ">
            <div className="bg-secondary w-14 h-[53px] rounded-2xl "></div>
            <div className="grid gap-0">
              <h1 className="font-medium text-sm">Botol Masuk</h1>
              <p className="font-semibold text-gray-500 text-xs">
                17:00 - April 24
              </p>
            </div>
            <div className="py-4 pl-1">
              <p className="text-xs">1</p>
            </div>
            <div>
              <button className="text-nowrap px-5 my-2 text-gray-500">
                Selesai
              </button>
            </div>
          </div>

          <div className="flex justify-start space-x-4  ">
            <div className="bg-secondary w-14 h-[53px] rounded-2xl "></div>
            <div className="grid gap-0">
              <h1 className="font-medium text-sm">Ambil Poin</h1>
              <p className="font-semibold text-gray-500 text-xs">
                8:30 - April 15
              </p>
            </div>
            <div className="py-4">
              <p className="text-xs text-center">112</p>
            </div>
            <div>
              <button className="text-nowrap px-5 my-2 text-gray-500">
                Selesai
              </button>
            </div>
          </div>
          <div className="flex justify-start space-x-4  ">
            <div className="bg-secondary w-14 h-[53px] rounded-2xl "></div>
            <div className="grid gap-0">
              <h1 className="font-medium text-sm">Botol Masuk</h1>
              <p className="font-semibold text-gray-500 text-xs">
                9:30 - April 08
              </p>
            </div>
            <div className="py-4 pl-1">
              <p className="text-xs">2</p>
            </div>
            <div>
              <button className="text-nowrap px-5 my-2 text-gray-500">
                Selesai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

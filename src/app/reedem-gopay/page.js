import Image from 'next/image';
import Link from 'next/link';

export default function RedeemGopayPage() {
  return (
    <div className="bg-primary pt-[35px]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <Link href="/reedem-decision">
            <Image
              src="/svg/image-back.svg"
              alt="Back"
              width={14}
              height={25}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <Image
              src="/svg/icon-poin.svg"
              alt="Points"
              width={23}
              height={26.6}
            />
            <span className="text-white text-lg font-regular">0</span>
          </div>
          <span className="text-white text-sm font-regular">Poin Saya</span>
        </div>
      </div>

      <h1 className="text-center font-semibold mt-5 text-white text-3xl">
        Gopay
      </h1>

      {/* Content Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] pt-10 my-10">
        {/* Kode Produk */}
        <div className="grid gap-4 px-5 py-5">
          <div className="px-5">
            <h1 className="text-start text-xl text-text-primary font-medium">
              Kode Produk
            </h1>
            <div>
              <input
                disabled
                type="text"
                placeholder="GOPAY_CUSTOMER10"
                className=" mt-2 py-3 w-[300px] h-[60px] p-4 bg-secondary rounded-[10px] text-sm"
              />
            </div>
          </div>
          {/* Voucher */}
          <div className="px-5">
            <h1 className="text-start text-xl text-text-primary font-medium">
              Voucher
            </h1>
            <div>
              <input
                disabled
                type="text"
                placeholder="GOPAY 10.000"
                className=" mt-2 py-3 w-[300px] h-[60px] p-4 bg-secondary rounded-[10px] text-sm"
              />
            </div>
          </div>
          {/* Voucher */}
          <div className="px-5">
            <h1 className="text-start text-xl text-text-primary font-medium">
              Jumlah Poin
            </h1>
            <div>
              <input
                disabled
                type="text"
                placeholder="11250"
                className=" mt-2 py-3 w-[300px] h-[60px] p-4 bg-secondary rounded-[10px] text-sm"
              />
            </div>
          </div>
          {/* Nomor HP Gopay */}
          <div className="px-5">
            <h1 className="text-start text-xl text-text-primary font-medium">
              Nomor HP Gopay
            </h1>
            <div>
              <input
                type="text"
                placeholder="Masukkan No HP Gopay"
                className=" mt-2 py-3 w-[300px] h-[60px] p-4 bg-secondary rounded-[10px] text-sm"
              />
            </div>
          </div>
        </div>
        <Link href="/#" className="flex justify-center pt-8">
          <button className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl">
            Tukar Poin
          </button>
        </Link>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
export default function ReceiptRedeemQrPage({ title, children }) {
  return (
    <div className="bg-primary pt-[35px] h-full flex flex-col">

      <h1 className="text-center font-semibold mt-5 text-white text-3xl mb-12">
        {title}
      </h1>

      {/* Content Section */}
      <div className="bg-bgSecondary border  rounded-t-[36px] p-5">
        {/* Success Icon */}
        <div className="bg-white rounded-t-lg shadow-lg px-4 pb-14">
          <div className="flex justify-center ">
            <div className=" -translate-y-5 p-3 rounded-full bg-white shadow-xl">
              <Image
                src="/svg/icon-success.svg"
                alt="icon success"
                width={32}
                height={32}
              />
            </div>
          </div>
          {/* children item start */}
          {children}
          {/* children item end */}
        </div>

        {/* Home Button */}
        <Link href="/home" className="flex justify-center">
          <button className="mt-10 py-3 px-9 bg-primary rounded-xl text-white font-semibold text-xl">
            Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}

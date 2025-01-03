import Image from 'next/image';
import Link from 'next/link';

export default function RedeemDecisionPage() {
  return (
    <div className="bg-primary h-full pt-[35px]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <Link href="/reedem-voucher">
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

      <h2 className="text-center font-semibold mt-5 text-white text-3xl">
        Redeem
      </h2>
      <p className="text-center font-regular pt-4 text-white text-sm">
        Silahkan pilih metode penukaran poin.
      </p>

      {/* Content Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] pt-10 mt-10 pb-20">
        {/* Bank */}
        <div className="grid gap-4 px-5 py-5">
          <h1 className="text-center text-2xl text-text-primary font-medium">
            Bank
          </h1>
          <div className="flex justify-around">
            <Link href="/reedem-verification-bca">
              <div>
                <Image
                  src="/svg/icon-bca.svg"
                  alt="icon bca"
                  width={47.82}
                  height={15}
                  className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
                />
                <p className="text-center pt-1 font-medium text-sm">BCA</p>
              </div>
            </Link>
            <div>
              <Image
                src="/svg/icon-bri.svg"
                alt="icon bri"
                width={46}
                height={27}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">BRI</p>
            </div>
            <div>
              <Image
                src="/svg/icon-bsi.svg"
                alt="icon bsi"
                width={43.41}
                height={26.48}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">BSI</p>
            </div>
            <div>
              <Image
                src="/svg/icon-mandiri.svg"
                alt="icon mandiri"
                width={53}
                height={16}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">MANDIRI</p>
            </div>
          </div>
        </div>
        {/* E-Wallet */}
        <div className="grid gap-4 px-5 py-5">
          <h1 className="text-center text-2xl text-text-primary font-medium">
            E-Wallet
          </h1>
          <div className="flex justify-around">
            <Link href="/reedem-gopay">
              <div>
                <Image
                  src="/svg/icon-gopay.svg"
                  alt="icon gopay"
                  width={38}
                  height={38}
                  className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
                />
                <p className="text-center pt-1 font-medium text-sm">Gopay</p>
              </div>
            </Link>
            <div>
              <Image
                src="/svg/icon-ovo.svg"
                alt="icon ovo"
                width={36}
                height={36}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">OVO</p>
            </div>
            <div>
              <Image
                src="/svg/icon-dana.svg"
                alt="icon dana"
                width={36.78}
                height={36.78}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">Dana</p>
            </div>
            <div>
              <Image
                src="/svg/icon-shopee.svg"
                alt="icon shopee"
                width={36.6}
                height={33.4}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">Shopee</p>
            </div>
          </div>
        </div>
        {/* Voucher Pulsa */}
        <div className="grid gap-4 py-5 px-5">
          <h1 className="text-center text-2xl text-text-primary font-medium">
            Pulsa
          </h1>
          <div className="flex justify-around">
            <div>
              <Image
                src="/svg/icon-telkomsel.svg"
                alt="icon telkomsel"
                width={28}
                height={37}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center text-xs"
              />
              <p className="text-center pt-1 font-medium text-sm">Telkomsel</p>
            </div>
            <div>
              <Image
                src="/svg/icon-indosat.svg"
                alt="icon indosat"
                width={40}
                height={21}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">Indosat</p>
            </div>
            <div>
              <Image
                src="/svg/icon-by.u.svg"
                alt="icon by.u"
                width={46}
                height={28}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">By.U</p>
            </div>
            <div>
              <Image
                src="/svg/icon-xl.svg"
                alt="icon xl"
                width={39}
                height={29}
                className="w-[63px] h-[63px] px-2 bg-secondary rounded-lg items-center"
              />
              <p className="text-center pt-1 font-medium text-sm">XL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

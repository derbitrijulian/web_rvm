import Image from 'next/image';
import Link from 'next/link';

export default function onboardingPage() {
  return (
    <div className="bg-bgSecondary h-screen">
      <div className="pt-[154px]">
        <div className="grid place-items-center">
          <Image
            src="/svg/image-onboarding.svg"
            alt="image onboarding"
            width={179}
            height={179}
          />
        </div>
        <h1 className="font-semibold text-primary w-full text-center text-[52.14px] pt-3">
          Plastic - In
        </h1>
        <p className="text-sm font-normal text-center pt-2 pb-11">
          Selamat Datang Di Plastic-In!{' '}
        </p>
      </div>
      <div className="grid justify-center gap-3">
        <Link href="/login">
          <button className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl">
            Masuk
          </button>
        </Link>

        <Link href="/registration">
          <button className="py-3 bg-secondary rounded-xl w-52 text-text-primary font-semibold text-xl">
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
}

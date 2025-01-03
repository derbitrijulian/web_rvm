'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SplashScreen() {
  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      route.push('/onboarding');
    }, 5000);
    return () => clearTimeout(timer);
  }, [route]);

  return (
    <div className="bg-primary h-screen">
      <div className="pt-[220px]">
        <div className="grid place-items-center animate-bounce">
          <Image
            src="/svg/image-splash.svg"
            alt="image splash"
            width={179}
            height={179}
          />
        </div>
        <h1 className="font-semibold text-white w-full text-center text-[52.14px] pt-3">
          Plastic - In
        </h1>
      </div>
    </div>
  );
}

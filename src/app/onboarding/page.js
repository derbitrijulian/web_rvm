'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../../components/GoogleLoginButton';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function onboardingPage() {
  if (!GOOGLE_CLIENT_ID) {
    console.error(
      'NEXT_PUBLIC_GOOGLE_CLIENT_ID tidak ditemukan di environment variables'
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
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
          <p className="text-sm font-normal text-center pt-2 pb-11 text-text-primary">
            Selamat Datang Di Plastic-In!{' '}
          </p>
        </div>
        <div className="flex flex-col items-center w-full gap-3 px-4">
          <Link href="/login" className="w-full flex justify-center">
            <button className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl">
              Masuk
            </button>
          </Link>

          <Link href="/registration" className="w-full flex justify-center">
            <button className="py-3 bg-secondary rounded-xl w-52 text-text-primary font-semibold text-xl">
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

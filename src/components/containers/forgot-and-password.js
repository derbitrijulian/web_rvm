'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/app/firebase';

auth;
export default function ForgotAndNewPassword({ title, children }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Email reset password telah dikirim!');
      setError('');
    } catch (err) {
      setError('Terjadi kesalahan, periksa kembali alamat email Anda.');
      setSuccess('');
    }
  };

  return (
    <div className="bg-primary pt-[35px]">
      <div className="flex items-center justify-center">
        <Link href="/login" className="absolute left-8 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>

        <h1 className="text-bgSecondary font-semibold w-full text-center text-[28px] pb-6 pt-1">
          {title}
        </h1>
      </div>

      <div className="bg-bgSecondary h-screen rounded-t-[36px] pt-20 px-9">
        <div>
          <h1 className="text-text-primary font-semibold text-[20px]">
            {title}
          </h1>
          <p className="text-text-primary font-regular text-[10px] pt-3 pb-5">
            Masukkan alamat email Anda untuk menerima tautan reset password.
          </p>
        </div>

        <div>
          <label className="text-text-primary text-sm font-medium text-[15px]">
            Masukkan Alamat Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Alamat Email"
            className="mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="grid justify-center gap-3 pt-5 pb-3">
          <button
            onClick={handleForgotPassword}
            className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl"
          >
            Verifikasi!
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="text-text-primary text-xs font-regular w-full flex justify-center pb-14">
          {children}
        </div>
      </div>
    </div>
  );
}

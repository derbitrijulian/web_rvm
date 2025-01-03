'use client';

import { useState } from 'react';
import { auth } from '../firebase'; // Sesuaikan path dengan lokasi file firebaseConfig.js
import { sendPasswordResetEmail } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import ForgotAndNewPassword from '@/components/containers/forgot-and-password';

export default function Page() {
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
    <ForgotAndNewPassword title="Lupa Password">
      <span>
        Belum punya akun?{' '}
        <Link
          href="/registration"
          className="hover:underline text-primary w-full"
        >
          Daftar
        </Link>
      </span>
    </ForgotAndNewPassword>
  );
}

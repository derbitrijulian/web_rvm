'use client';

import Link from 'next/link';
import ForgotAndNewPassword from '@/components/containers/forgot-and-password';

export default function Page() {
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

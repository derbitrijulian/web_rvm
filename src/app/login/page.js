'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth-service';

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi!');
      return;
    }

    try {
      await loginUser(email, password);

      router.push('/home');
    } catch (error) {
      setError('Email atau kata sandi salah!');
    }
  };

  return (
    <div className="bg-primary h-screen pt-[35px]">
      <div className="flex items-center justify-center">
        <Link href="/onboarding" className="absolute left-8 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>

        <h1 className="text-bgSecondary font-semibold w-full text-center text-[28px]">
          Selamat Datang
        </h1>
      </div>

      <p className="text-bgSecondary text-sm font-regular text-center text-[12px] pt-1 pb-4 pl-20 pr-20">
        Silahkan masuk atau daftar jika belum mempunyai akun.
      </p>

      <div className="bg-bgSecondary h-screen rounded-t-[36px] pt-20 px-9">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-text-primary text-sm font-medium text-[15px]">
              Nama Pengguna atau Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mt-6">
            <label className="text-text-primary text-sm font-medium text-[15px] flex justify-between">
              <span>Kata Sandi</span>
              <Link href="/forgot-password">
                <p className="text-primary text-[12px] cursor-pointer hover:underline">
                  Lupa Password?
                </p>
              </Link>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Masukkan Kata Sandi"
              value={formData.password}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="grid justify-center gap-3 pt-12 pb-10">
            <button
              type="submit"
              className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl"
            >
              Masuk
            </button>

            <Link href="/registration">
              <button className="py-3 bg-secondary rounded-xl w-52 text-text-primary font-semibold text-xl">
                Daftar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

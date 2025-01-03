'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { registerUser } from '@/services/auth-service';

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password do not match');
      return;
    }

    if (!checked) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await registerUser(formData);
      console.log(response);
      setSuccess(response.message || 'Registrasi Berhasil!!');

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
      setChecked(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-primary pt-[34px]">
      <div className="flex items-center justify-center">
        <Link href="/login" className="absolute left-8 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>
        <h1 className="text-bgSecondary font-semibold w-full text-center text-[28px]">
          Daftar
        </h1>
      </div>
      <p className="text-bgSecondary text-sm font-regular text-center text-[12px] pt-1 pb-4 px-12">
        Silahkan isi form untuk bergabung
      </p>
      <form onSubmit={handleSubmit}>
        <div className="bg-bgSecondary h-full rounded-t-[36px] pt-20 px-9">
          <div>
            <label
              className="text-text-primary text-sm font-medium"
              htmlFor="fullName"
            >
              Nama Lengkap
            </label>
            <input
              required
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Masukkan Nama Pengguna"
              value={formData.fullName}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Kata Sandi
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Masukkan Kata Sandi"
              value={formData.password}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Konfirmasi Kata Sandi
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Kata Sandi"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Nomor Hp
            </label>
            <input
              required
              type="text"
              name="phone"
              placeholder="Masukkan No Hp"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <p className="text-xs pt-2">*Tanda Kolom Wajib Diisi</p>
          <div className="flex items-start gap-5 px-6 mt-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="peer h- w-5 cursor-pointer rounded border border-gray-300 checked:bg-primary"
              />
              <span className="ml-2 text-xs">
                Saya menyetujui <Link href="/syarat-ketentuan?callback=/registration">Syarat dan Ketentuan</Link>
              </span>
            </label>
          </div>
          <div className="grid justify-center gap-3 pt-8 pb-3">
            <button
              type="submit"
              className="py-3 bg-primary rounded-full w-52 text-bgSecondary font-semibold text-xl"
            >
              Daftar
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </div>
      </form>

    </div>
  );
}

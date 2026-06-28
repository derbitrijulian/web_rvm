'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthDialog from '../ui/auth-dialog';

export default function NewPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [userHasPassword, setUserHasPassword] = useState(true);
  const [checkingUser, setCheckingUser] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const isChangePasswordMode = !token;

  useEffect(() => {
    if (isChangePasswordMode) {
      checkUserPasswordStatus();
    }
  }, [isChangePasswordMode]);

  useEffect(() => {
    if (isChangePasswordMode && !checkingUser && !userHasPassword) {
      setShowDialog(true);
    }
  }, [isChangePasswordMode, checkingUser, userHasPassword]);

  const checkUserPasswordStatus = async () => {
    setCheckingUser(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      if (data.code === 200) {
        setUserHasPassword(!!data.data.password);
      }
    } catch (err) {
      console.error('Error checking user:', err);
      setError('Gagal memuat data user');
    } finally {
      setCheckingUser(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');

    if (isChangePasswordMode && userHasPassword && !currentPassword) {
      setError('Password lama wajib diisi');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Semua field wajib diisi');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password konfirmasi tidak cocok');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      if (isChangePasswordMode) {
        const response = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            currentPassword: userHasPassword ? currentPassword : undefined,
            newPassword: password,
            confirmPassword: confirmPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(
            data.message || 'Password berhasil diubah! Kembali ke profil...'
          );
          setTimeout(() => {
            router.push('/profil');
          }, 2000);
        } else {
          setError(data.message || 'Terjadi kesalahan');
        }
      } else {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            newPassword: password,
            confirmPassword: confirmPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(
            'Password berhasil diperbarui! Mengalihkan ke halaman login...'
          );
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setError(data.message || 'Terjadi kesalahan');
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  if (checkingUser) {
    return (
      <div className="bg-primary h-screen flex items-center justify-center">
        <div className="text-bgSecondary text-xl">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="bg-primary h-full min-h-screen pt-[35px]">
      <div className="flex items-center justify-center relative">
        <Link href="/profil" className="absolute left-8 justify-center mb-4">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>
        <h1 className="text-bgSecondary font-semibold w-full text-center text-[28px] pb-6 pt-1">
          {isChangePasswordMode
            ? userHasPassword
              ? 'Ubah Kata Sandi'
              : 'Buat Kata Sandi'
            : 'Kata Sandi Baru'}
        </h1>
      </div>

      <div className="bg-bgSecondary min-h-screen rounded-t-[36px] pt-10 px-9">
        {isChangePasswordMode && userHasPassword && (
          <div className="mb-6">
            <label className="text-text-primary text-sm font-medium text-[15px]">
              Password Lama
            </label>
            <div className="flex items-center mt-2 border-[3px] border-secondary rounded-[10px] focus-within:ring-2 focus-within:ring-primary bg-white">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan password lama"
                className="text-text-primary pl-3 py-3 w-full text-sm focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="pr-3 text-text-primary hover:text-primary transition-colors flex-shrink-0"
              >
                {showCurrentPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>
        )}

        <div className={isChangePasswordMode && userHasPassword ? '' : 'mt-6'}>
          <label className="text-text-primary text-sm font-medium text-[15px]">
            {isChangePasswordMode ? 'Password Baru' : 'Kata Sandi'}
          </label>
          <div className="flex items-center mt-2 border-[3px] border-secondary rounded-[10px] focus-within:ring-2 focus-within:ring-primary bg-white">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                isChangePasswordMode
                  ? 'Masukkan password baru'
                  : 'Masukkan kata sandi baru'
              }
              className="text-text-primary pl-3 py-3 w-full text-sm focus:outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="pr-3 text-text-primary hover:text-primary transition-colors flex-shrink-0"
            >
              {showNewPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-text-primary text-sm font-medium text-[15px] flex justify-between">
            Konfirmasi {isChangePasswordMode ? 'Password Baru' : 'Kata Sandi'}
          </label>

          <div className="flex items-center mt-2 border-[3px] border-secondary rounded-[10px] focus-within:ring-2 focus-within:ring-primary bg-white">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={
                isChangePasswordMode
                  ? 'Konfirmasi password baru'
                  : 'Konfirmasi kata sandi baru'
              }
              className="text-text-primary pl-3 py-3 w-full text-sm focus:outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="pr-3 text-text-primary hover:text-primary transition-colors flex-shrink-0"
            >
              {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="grid justify-center gap-3 pt-12 pb-10">
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            {loading
              ? 'Menyimpan...'
              : isChangePasswordMode
                ? userHasPassword
                  ? 'Ubah Password'
                  : 'Buat Password'
                : 'Ganti Kata Sandi'}
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-sm text-center font-medium">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}
      </div>

      {showDialog && (
        <AuthDialog type="oauthUserInfo" onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
}

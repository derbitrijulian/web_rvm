'use client';
import OptionItem from '@/components/containers/option-items';
import { logout } from '@/services/auth-service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user profile data
  const loadUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, redirect to login
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      if (data.code === 200) {
        setUserDetail(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      alert('Logout successful!');
      router.push('/login');
    } else {
      alert(`Logout failed: ${result.message}`);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-primary h-full pt-[35px]">
      {/* Header */}
      <div className="justify-center">
        <h1 className="text-bgSecondary font-semibold w-full text-center text-[24px] pb-6 pt-1">
          Profil
        </h1>
      </div>

      {/* Profile Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] pt-10 px-9 pb-8 mt-20 relative">
        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center">
            <div className="absolute -top-16 w-[130px] h-[130px] rounded-full bg-gray-300 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
            </div>
            <div className="mt-[60px] mb-6">
              <div className="h-8 w-48 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="w-full mt-10 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        ) : error ? (
          // Error State
          <div className="flex flex-col items-center text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Error Loading Profile
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadUser}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : (
          // Success State
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="absolute -top-16 w-[130px] h-[130px] rounded-full bg-text-primary flex items-center justify-center">
              <Image
                src="/svg/icon-user.svg"
                alt="icon user"
                width={130}
                height={130}
              />
              {/* Edit Icon */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Link href="/edit">
                  <Image
                    src="/svg/icon-edit.svg"
                    alt="edit"
                    width={14}
                    height={14}
                  />
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-[60px] mb-6">
              <h1 className="text-text-primary font-semibold text-2xl mb-2">
                {userDetail?.nama || 'No Name'}
              </h1>
              <p className="text-gray-600 text-sm">{userDetail?.email}</p>
              <p className="text-gray-600 text-sm">{userDetail?.phoneNumber}</p>
            </div>

            {/* Options */}
            <div className="grid gap-y-7 text-center w-full mt-10">
              <OptionItem
                icon="/svg/icon-password.svg"
                text="Ubah Kata Sandi"
                href="/new-password"
              />
              <OptionItem
                icon="/svg/icon-terms.svg"
                text="Syarat & Ketentuan"
                href="/syarat-ketentuan?callback=/profil"
              />
              <OptionItem
                icon="/svg/icon-about.svg"
                text="Tentang Kami"
                href="#"
              />
              <OptionItem
                icon="/svg/icon-privacy.svg"
                text="Kebijakan Privasi"
                href="/kebijakan-privasi"
              />
            </div>

            <div className="grid justify-center pt-10 pb-36">
              <button
                type="submit"
                onClick={handleLogout}
                className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl hover:bg-primary/90 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

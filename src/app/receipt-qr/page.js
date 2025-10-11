'use client';
import Link from 'next/link';
import ReceiptRedeemQrPage from '@/components/containers/receipt-reedem-qr';
import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';

export default function Page() {
  const [data, loading, error] = useFetch('/api/bottle-count');
  const [accessTime, setAccessTime] = useState('');
  const [claimResult, setClaimResult] = useState(null);

  // Check for claim result from sessionStorage
  useEffect(() => {
    const storedClaimResult = sessionStorage.getItem('claimResult');
    if (storedClaimResult) {
      setClaimResult(JSON.parse(storedClaimResult));
      // Clear after use
      sessionStorage.removeItem('claimResult');
    }
  }, []);

  // Extract bottle data from API response or claim result
  const bottleData = data?.bottleData || {};
  const {
    bottleCount = 0,
    totalBottles = 0,
    points = 0,
    lifetimePoints = 0,
    redeemableCount = claimResult?.bottlesAdded || 0,
    userId = null,
  } = bottleData;

  // Use claim result data if available
  const sessionBottles = claimResult?.bottlesAdded || redeemableCount;
  const sessionPoints = claimResult?.pointsEarned || redeemableCount * 50;

  // You might need to fetch user details separately if not included in bottle-count API
  const [userData, userLoading, userError] = useFetch('/api/user/profile');

  useEffect(() => {
    // Use claim time if available, otherwise current time
    const timeToFormat = claimResult?.claimTime
      ? new Date(claimResult.claimTime)
      : new Date();
    const formattedTime = timeToFormat.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setAccessTime(formattedTime);
  }, [claimResult]);

  console.log('Receipt data:', data);
  console.log('User data:', userData);

  return (
    <ReceiptRedeemQrPage title="Sesi Selesai">
      {/* Error Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {claimResult && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <p className="text-center text-green-800 font-medium text-sm">
            Klaim berhasil diproses!
          </p>
        </div>
      )}

      <h2 className="text-[18px] font-semibold mt-6 mb-2 text-center">
        {claimResult ? 'Klaim Botol Berhasil!' : 'Anda Meninggalkan RVM Lokasi'}
      </h2>
      <p className="text-sm text-regular text-gray-600 mb-6 text-center">
        {claimResult ? 'Hasil Klaim Anda' : 'Hasil Sesi Anda'}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-left text-sm mb-4">
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Botol Sesi Ini</p>
          <p className="font-semibold text-[#121212] text-[24px] pt-3">
            {loading ? 'Loading...' : sessionBottles}
          </p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Poin Earned</p>
          <p className="font-semibold text-[#121212] text-[24px] pt-3">
            {loading ? 'Loading...' : `+${sessionPoints}`}
          </p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Total Poin</p>
          <p className="font-semibold text-[#121212] text-sm">
            {loading ? 'Loading...' : points.toLocaleString()}
          </p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Waktu</p>
          <p className="font-semibold text-[#121212] text-sm">
            {accessTime || 'Loading...'}
          </p>
        </div>
      </div>

      {/* Full width cards */}
      <div className="space-y-4">
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Lokasi</p>
          <p className="font-semibold text-[#121212] text-sm">
            Lab RVM Station - Paramadina
          </p>
        </div>

        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500 text-sm">Nama Pengguna</p>
          <p className="font-semibold text-[#121212] text-sm">
            {userLoading
              ? 'Loading...'
              : userData?.user?.nama || userData?.nama || 'Guest User'}
          </p>
        </div>

        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500 text-sm">User ID</p>
          <p className="font-semibold text-[#121212] text-xs break-all">
            {loading ? 'Loading...' : userId || 'N/A'}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <h3 className="font-semibold text-green-800 mb-2">Sesi Berhasil!</h3>
          <p className="text-sm text-green-600">
            Anda telah mengumpulkan {loading ? '...' : sessionBottles} botol dan
            mendapatkan {loading ? '...' : sessionPoints} poin
          </p>
          <p className="text-xs text-green-500 mt-1">
            Total poin Anda sekarang:{' '}
            {loading ? '...' : (points + sessionPoints).toLocaleString()}
          </p>
        </div>
      </div>

    </ReceiptRedeemQrPage>
  );
}

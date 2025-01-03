'use client';
import Link from 'next/link';
import ReceiptRedeemQrPage from '@/components/containers/receipt-reedem-qr';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/user';
import { useBottle } from '@/context/bottle-count';

export default function Page() {
  const { userDetail, loadUser } = useUserContext();
  const { points, bottleCount } = useBottle();
  const [accessTime, setAccessTime] = useState('');

  useEffect(() => {
    loadUser();

    const now = new Date();
    const formattedTime = now.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setAccessTime(formattedTime);
  }, []);
  return (
    <ReceiptRedeemQrPage title="Sesi Selesai">
      {/* Success Message */}
      <h2 className="text-[18px] font-semibold mt-6 mb-2 text-center">
        Anda Meninggalkan RVM Lokasi
      </h2>
      <p className="text-sm text-regular text-gray-600 mb-6 text-center">
        Hasil
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-left text-sm">
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Botol</p>
          <p className="font-semibold text-[#121212] text-[24px] pt-3">
            {bottleCount ? bottleCount : 'Loading ...'}
          </p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Poin</p>
          <p className="font-semibold text-[#121212] text-[24px] pt-3">
            {points ? points : 'Loading ...'}
          </p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-regular text-gray-500 text-sm">Lokasi</p>
          <p className="font-semibold text-[#121212] text-sm">Paramadina</p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Waktu</p>
          <p className="font-semibold text-[#121212] text-sm">
            {accessTime || 'Loading ...'}
          </p>
        </div>
      </div>
      <div className="border shadow-sm p-3 rounded-lg">
        <p className="font-semibold text-gray-500 text-sm">Nama Pengguna</p>
        <p className="font-semibold text-[#121212] text-sm">
          {userDetail ? userDetail.fullName : 'Loading ...'}
        </p>
      </div>

      {/* Activity Link */}
      <Link href="/aktifitas">
        <div className="text-[#616161] text-[12px] cursor-pointer hover:underline pt-12 text-center">
          Lihat Aktivitas
        </div>
      </Link>
    </ReceiptRedeemQrPage>
  );
}

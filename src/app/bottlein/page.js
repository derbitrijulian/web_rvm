'use client';
import Modal from '@/components/ui/modal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RedeemGopayPage() {
  const [bottleCount, setBottleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval
    const fetchBottleData = async () => {
      try {
        const response = await fetch('/api/bottle-count');
        if (!response.ok) {
          throw new Error('Failed to fetch bottle data');
        }
        const data = await response.json();
        console.log(data.bottleData.bottleCount);
        setBottleCount(data.bottleData.bottleCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBottleData();
    interval = setInterval(() => {
      fetchBottleData();
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-primary h-screen pt-[35px] min-h-screen flex flex-col">
      {/* Header */}

      <h1 className="text-center font-semibold mt-5 text-white text-3xl">
        Masukkan Botol
      </h1>
      <p className="text-center font-regular mt-5 text-white text-xs mb-8">
        Silahkan masukkan botol kedalam mesin
      </p>

      {/* Content Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] p-5">
        <div className="grid justify-center mt-20">
          <h1 className="text-center text-semibold text-text-primary text-2xl">
            Botol Terkumpul
          </h1>

          <div className="my-5">
            <div className="flex justify-between gap-7">
              <Image
                src="/svg/bottle.svg"
                alt="bottle"
                width={130.42}
                height={247.79}
              />
              <h1 className="text-9xl text-primary font-semibold my-24">
                {loading ? '...' : bottleCount}
              </h1>
            </div>
          </div>
        </div>
        {/* Ambil Poin */}
        <Link href="/receipt-qr" className="flex justify-center">
          <button className="py-3 px-9 bg-primary rounded-xl text-white font-semibold text-xl">
            Ambil Poin
          </button>
        </Link>
        <Modal />
      </div>
    </div>
  );
}

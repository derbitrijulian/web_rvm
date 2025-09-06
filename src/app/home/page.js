'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useFetch from '../../lib/use-fetch';
import dynamic from 'next/dynamic';

// Import Leaflet secara dinamik untuk menghindari SSR issues
const DynamicMap = dynamic(() => import('../../components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

export default function Page() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { data: locations, loading, error } = useFetch('/api/rvm-locations');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Location Error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-primary h-full">
      {/* Header */}
      <div className="px-8 pt-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/image-splash.svg"
              alt="image splash"
              width={41}
              height={41}
            />
            <div>
              <h1 className="font-semibold text-white text-xl">Plastic - In</h1>
              <p className="font-regular text-white text-sm">Selamat Datang</p>
            </div>
          </div>
          <Link href="/notifikasi">
            <Image
              src="/svg/Notification.svg"
              alt="notification"
              width={30}
              height={30}
            />
          </Link>
        </div>

        {/* Section Utama */}
        <div className="bg-bgSecondary rounded-[14px] px-4 py-4 mt-4 h-[140px]">
          <div className="items-center">
            <h1 className="text-text-primary">Botol Terkumpul</h1>
            {/* <h2 className="text-primary font-semibold text-[16px]">
              {loading ? '' : bottleCount}Pcs
            </h2> */}
          </div>
        </div>

        <div className="bg-primary rounded-[14px] px-4 py-4 mt-4 drop-shadow-xl -translate-y-20 h-[70px] flex justify-between">
          <div className="items-center">
            <h1 className="text-bgSecondary">Plastic-In Poin</h1>
            {/* <h2 className="text-bgSecondary font-semibold text-[16px]">
              {points}
            </h2> */}
          </div>
          <div className="flex items-center gap-2 pt-6">
            <button className="text-bgSecondary text-xs">Reedem Poin</button>
            <Link href="/reedem-voucher">
              <Image
                src="/svg/button-reedem.svg"
                alt="button reedem"
                width={19}
                height={19}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="bg-bgSecondary  rounded-t-[20px]  p-7">
        {/* Lokasi Terdekat */}
        <div className="mb-4">
          <h1 className="text-lg font-bold text-text-primary">
            Lokasi Terdekat
          </h1>
          <div className="flex gap-4 overflow-x-auto mt-3 scrollbar-hide">
            {(locations?.data || [])
              .map((rvm) => {
                // Handle different position formats
                let lat, lng;
                if (rvm.position && typeof rvm.position === 'object') {
                  // If position is an object with lat/lng or latitude/longitude
                  lat = rvm.position.lat || rvm.position.latitude;
                  lng = rvm.position.lng || rvm.position.longitude;
                } else if (
                  Array.isArray(rvm.position) &&
                  rvm.position.length === 2
                ) {
                  // If position is an array [lat, lng]
                  lat = rvm.position[0];
                  lng = rvm.position[1];
                }

                const distance =
                  currentLocation && lat && lng
                    ? calculateDistance(
                        currentLocation[0],
                        currentLocation[1],
                        lat,
                        lng
                      )
                    : null;

                if (distance && distance <= 7000) {
                  return (
                    <div
                      key={rvm.id}
                      className="w-56 flex-shrink-0 bg-white rounded-[14px] p-4 flex flex-col drop-shadow-md"
                    >
                      <div className="mt-2 text-text-primary flex-1 flex flex-col">
                        <h3 className="text-sm font-semibold">{rvm.name}</h3>
                        <div className="flex flex-col gap-3 mt-3 flex-grow">
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                rvm.capacityStatus === 'full'
                                  ? '/svg/image-battery-red.svg'
                                  : rvm.capacityStatus === 'almost-full'
                                  ? '/svg/image-battery-yellow.svg'
                                  : '/svg/image-battery-green.svg'
                              }
                              alt="battery-status"
                              width={20}
                              height={20}
                            />
                            <p className="text-sm text-text-primary">
                              {rvm.capacityStatus}
                            </p>
                          </div>
                          <div className="flex justify-between mt-auto">
                            <div className="flex items-center gap-2">
                              <Image
                                src="/svg/icon-lokasi.svg"
                                alt="location"
                                width={20}
                                height={20}
                              />
                              <p className="text-sm text-text-primary">
                                {distance === null
                                  ? 'Loading...'
                                  : `${
                                      distance >= 1000
                                        ? (distance / 1000).toFixed(2)
                                        : distance.toFixed(2)
                                    } ${distance >= 1000 ? 'km' : 'm'}`}
                              </p>
                            </div>
                            <div>
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button className="px-6 py-2 bg-primary rounded-[8px] text-bgSecondary font-reguler text-xs">
                                  Rute
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
              .filter(Boolean)}

            {/* Remove null values */}
          </div>
        </div>

        {/* News Section */}
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-text-primary mb-3 ">Berita</h1>

          <Link href="/news">
            <h2 className="text-primary text-sm cursor-pointer hover:underline">
              Lihat Semua
            </h2>
          </Link>
        </div>
        <div className="w-full mb-28">
          <Image
            src="/png/image-news1.png"
            alt="news1"
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

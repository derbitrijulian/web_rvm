'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useLocation } from '../../contexts/LocationContext';

const Map = dynamic(() => import('../../components/containers/maps/page'), {
  ssr: false,
});

export default function Lokasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const {
    currentLocation,
    setCurrentLocation,
    permitLocationAccess,
    setPermitLocationAccess,
  } = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset modal visibility based on permitLocationAccess
  // If permitLocationAccess is false, show modal again (e.g., when returning from another page)
  // If permitLocationAccess is true, keep modal hidden
  useEffect(() => {
    if (mounted && !permitLocationAccess) {
      setShowModal(true);
    } else if (permitLocationAccess) {
      setShowModal(false);
    }
  }, [permitLocationAccess, mounted]);

  const handleSearch = (e) => {
    e.preventDefault();
    // searchQuery state is passed to Map component automatically via prop
  };

  const requestLocationPermission = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000, // Allow cache for 60 seconds
        });
      });

      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
      setPermitLocationAccess(true);
      setShowModal(false);
      console.log('✅ Location permission granted:', latitude, longitude);
    } catch (error) {
      console.error('❌ Location error:', error);
      // Set fallback location instead of rejecting
      console.log('🏙️ Using fallback location: Jakarta');
      setCurrentLocation([-6.2088, 106.8456]);
      setPermitLocationAccess(true); // Still set as permitted to show map
      setShowModal(false); // Hide modal

      if (error.code === 1) {
        alert(
          'Izin lokasi ditolak. Silakan aktifkan lokasi di pengaturan perangkat Anda.'
        );
      } else if (error.code === 3) {
        alert('Waktu tunggu lokasi habis. Menggunakan lokasi default.');
      }
    }
  };

  const handleDenyPermission = () => {
    console.log(
      '❌ User denied location permission - showing map without location'
    );
    // Set fallback location and hide modal instead of setting permitLocationAccess to false
    setCurrentLocation([-6.2088, 106.8456]);
    setShowModal(false);
  };

  return (
    <div className="h-screen w-screen">
      {/* Permission Modal - Only show if modal should be displayed */}
      {showModal && mounted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h2 className="text-center text-lg font-semibold mb-2 text-gray-800">
              Aktifkan Lokasi
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Izinkan akses lokasi untuk menemukan posisi anda dan menavigasi ke
              lokasi RVM terdekat?
            </p>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleDenyPermission}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200 text-sm"
              >
                Tidak
              </button>
              <button
                type="button"
                onClick={requestLocationPermission}
                className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Lokasi */}
      <div className="absolute top-5 left-5 right-5 z-50">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="flex items-center flex-1 h-12 bg-white rounded-xl shadow-md px-3">
            {/* Ikon Lokasi */}
            <Image
              src="/svg/icon-lokasi.svg"
              alt="icon lokasi"
              width={20}
              height={20}
            />
            {/* Input Lokasi */}
            <input
              type="text"
              placeholder="Masukkan lokasi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ml-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <Map searchQuery={searchQuery} />
      </div>
    </div>
  );
}

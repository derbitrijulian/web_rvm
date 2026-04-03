'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useLocation } from '../../contexts/LocationContext';

const Map = dynamic(() => import('../../components/containers/maps/page'), {
  ssr: false,
});

export default function Lokasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const { currentLocation, setCurrentLocation, setPermitLocationAccess } =
    useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    // searchQuery state is passed to Map component automatically via prop
  };

  const requestLocationPermission = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
      setPermitLocationAccess(true);
      setShowPermissionModal(false);
      console.log('✅ Location permission granted:', latitude, longitude);
    } catch (error) {
      console.error('❌ Location permission denied:', error);
      alert(
        'Izin lokasi ditolak. Silakan aktifkan lokasi di pengaturan perangkat Anda.'
      );
    }
  };

  const handleDenyPermission = () => {
    console.log(
      '❌ User denied location permission - showing map without location'
    );
    setPermitLocationAccess(false);
    setShowPermissionModal(false);
  };

  return (
    <div className="h-screen w-screen">
      {/* Permission Modal */}
      {showPermissionModal && (
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
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h2 className="text-center text-lg font-semibold mb-6">
              Aktifkan navigasi untuk menemukan posisi anda ?
            </h2>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={requestLocationPermission}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Ya
              </button>
              <button
                onClick={handleDenyPermission}
                className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Tidak
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

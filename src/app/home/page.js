'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFetch } from '@/hooks/use-fetch';
import dynamic from 'next/dynamic';
import { useLocation } from '@/contexts/LocationContext';

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
  const { currentLocation, setCurrentLocation } = useLocation();
  const [locationPermission, setLocationPermission] = useState('pending'); // 'granted', 'denied', 'pending'
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  // Use useFetch with array destructuring - Updated to match your hook
  const [locationsData, locationsLoading, locationsError] =
    useFetch('/api/rvm-locations');
  const [userStatsData, statsLoading, statsError] = useFetch('/api/user-stats');

  // Extract data with safe defaults
  const locations = locationsData || [];
  const userStats = userStatsData || {
    totalBottles: 0,
    redeemableCount: 0,
    points: 0,
    userName: '',
    lifetimePoints: 0,
  };

  // Function to request current position
  const requestCurrentPosition = async () => {
    // Guard against server-side rendering
    if (typeof window === 'undefined') {
      console.log('Running on server, skipping geolocation');
      setDefaultLocation();
      return;
    }

    if (!('geolocation' in navigator)) {
      console.error('Geolocation is not supported by this browser.');
      setLocationPermission('denied');
      setDefaultLocation();
      return;
    }

    setIsRequestingLocation(true);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000, // Reduced from 15000ms
          maximumAge: 60000, // 1 minute cache
        });
      });

      const { latitude, longitude } = position.coords;
      console.log('✅ Current location obtained:', latitude, longitude);
      setCurrentLocation([latitude, longitude]);
      setLocationPermission('granted');
    } catch (error) {
      console.error('❌ Location Error:', error);
      setLocationPermission('denied');

      // Show specific error messages
      if (error.code === 1) {
        console.log('User denied location permission');
      } else if (error.code === 2) {
        console.log('Location unavailable');
      } else if (error.code === 3) {
        console.log('Location request timeout - using fallback');
      }

      setDefaultLocation();
    } finally {
      setIsRequestingLocation(false);
    }
  };

  const setDefaultLocation = () => {
    // Set Jakarta coordinates as fallback
    console.log('🏙️ Using default location: Jakarta');
    setCurrentLocation([-6.2088, 106.8456]);
  };

  useEffect(() => {
    // Initial location request
    requestCurrentPosition();
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

  // Debug: Log locations data
  console.log('📍 Locations data:', locations);
  console.log('📍 Current location:', currentLocation);
  console.log('📍 Location permission:', locationPermission);

  // Show loading state
  if (locationsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4">Loading locations...</p>
        </div>
      </div>
    );

  // Show error state
  if (locationsError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <p className="text-xl mb-4">Error: {locationsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );

  // Filter and process locations
  const processedLocations = (locations || [])
    .map((rvm) => {
      // Handle the position format from API
      let lat, lng;

      console.log('🗺️ RVM position data:', rvm.position, rvm.name); // Debug log with name

      // API structure uses position.latitude and position.longitude
      if (rvm.position && rvm.position.latitude && rvm.position.longitude) {
        lat = parseFloat(rvm.position.latitude);
        lng = parseFloat(rvm.position.longitude);
      }

      const distance =
        currentLocation && lat && lng
          ? calculateDistance(currentLocation[0], currentLocation[1], lat, lng)
          : null;

      const isValid = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

      console.log(
        `📍 ${rvm.name}: lat=${lat}, lng=${lng}, distance=${distance}, valid=${isValid}`
      );

      return {
        ...rvm,
        lat,
        lng,
        distance,
        isValid,
      };
    })
    .filter((location) => location.isValid); // Only show locations with valid coordinates

  // Sort by distance if available
  const sortedLocations = processedLocations.sort((a, b) => {
    if (a.distance === null && b.distance === null) return 0;
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });

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
              <p className="font-regular text-white text-sm">
                Selamat Datang
                {userStats?.userName ? `, ${userStats.userName}` : ''}
              </p>
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

        {/* Location Permission Notice */}
        {locationPermission === 'denied' && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <strong className="font-bold">Info: </strong>
                <span className="block sm:inline">
                  Lokasi diperlukan untuk menampilkan RVM terdekat. Menggunakan
                  Jakarta sebagai default.
                </span>
              </div>
              <button
                onClick={requestCurrentPosition}
                disabled={isRequestingLocation}
                className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 disabled:opacity-50"
              >
                {isRequestingLocation ? 'Requesting...' : 'Izinkan Lokasi'}
              </button>
            </div>
          </div>
        )}

        {/* Location Status */}
        {locationPermission === 'pending' && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 mt-4">
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Meminta akses lokasi...
            </span>
          </div>
        )}

        {/* Error Messages */}
        {statsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4">
            <strong className="font-bold">Stats Error: </strong>
            <span className="block sm:inline">{statsError}</span>
          </div>
        )}

        {/* Section Utama */}
        <div className="bg-bgSecondary rounded-[14px] px-4 py-4 mt-4 h-[140px] flex flex-col justify-between">
          <div>
            <h1 className="text-text-primary text-sm">Botol Terkumpul</h1>
            <h2 className="text-primary font-semibold text-2xl mt-1">
              {statsLoading ? '...' : `${userStats?.totalBottles || 0} Pcs`}
            </h2>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-text-secondary text-xs">Dapat Ditukar</p>
              <p className="text-primary font-medium text-sm">
                {statsLoading
                  ? '...'
                  : `${userStats?.redeemableCount || 0} Pcs`}
              </p>
            </div>
            <Link
              href="/aktifitas"
              className="text-primary text-xs underline hover:text-primary-dark"
            >
              Lihat Detail
            </Link>
          </div>
        </div>

        <div className="bg-primary rounded-[14px] px-4 py-4 mt-4 drop-shadow-xl -translate-y-20 h-[70px] flex justify-between">
          <div className="items-center">
            <h1 className="text-bgSecondary text-sm">Plastic-In Poin</h1>
            <h2 className="text-bgSecondary font-semibold text-lg mt-1">
              {statsLoading ? '...' : (userStats?.points || 0).toLocaleString()}
            </h2>
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
      <div className="bg-bgSecondary rounded-t-[20px] p-7">
        {/* Lokasi Terdekat */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-lg font-bold text-text-primary">
              Lokasi Terdekat
            </h1>
          </div>

          <div className="flex gap-4 overflow-x-auto mt-3 scrollbar-hide">
            {sortedLocations.length > 0 ? (
              sortedLocations.map((rvm) => (
                <div
                  key={rvm.id}
                  className="w-56 flex-shrink-0 bg-white rounded-[14px] p-4 flex flex-col drop-shadow-md"
                >
                  <div className="mt-2 text-text-primary flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold">{rvm.name}</h3>
                    {rvm.address && (
                      <p className="text-xs text-gray-500 mt-1">
                        {rvm.address}
                      </p>
                    )}
                    <div className="flex flex-col gap-3 mt-3 flex-grow">
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            rvm.capacityStatus === 'FULL'
                              ? '/svg/image-battery-red.svg'
                              : rvm.capacityStatus === 'ALMOST_FULL'
                                ? '/svg/image-battery-yellow.svg'
                                : '/svg/image-battery-green.svg'
                          }
                          alt="battery-status"
                          width={20}
                          height={20}
                        />
                        <p className="text-sm text-text-primary">
                          {rvm.capacityStatus || 'AVAILABLE'}
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
                            {rvm.distance === null
                              ? 'Calculating...'
                              : `${
                                  rvm.distance >= 1000
                                    ? (rvm.distance / 1000).toFixed(1)
                                    : Math.round(rvm.distance)
                                } ${rvm.distance >= 1000 ? 'km' : 'm'}`}
                          </p>
                        </div>
                        <div>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${rvm.lat},${rvm.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="px-6 py-2 bg-primary rounded-[8px] text-bgSecondary font-regular text-xs hover:bg-primary-dark">
                              Rute
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500 py-8">
                <p className="text-lg mb-2">🗺️ Tidak ada lokasi RVM tersedia</p>
                <p className="text-sm">
                  Total data: {locations?.length || 0} lokasi
                </p>
                <p className="text-xs mt-2 text-gray-400">
                  Valid coordinates: {processedLocations.length}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* News Section */}
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-text-primary mb-3">Berita</h1>
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

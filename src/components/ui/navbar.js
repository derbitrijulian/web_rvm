'use client';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from 'react-icons/io5';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { FiActivity } from 'react-icons/fi';
import { BiNavigation } from 'react-icons/bi';
import Link from 'next/link';
import { useLocation } from '@/context/location';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { selectedLocation } = useLocation();

  const isActive = (path) => pathname === path;

  const openGoogleMaps = () => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        '_blank'
      );
    } else {
      console.error('No Location Selected');
    }
  };

  return (
    <div className="bg-white border rounded-t-3xl mx-2 fixed -bottom-1 inset-x-0 shadow-navbar-shadow">
      <ul className="flex gap-4 justify-center items-center p-2 h-[85px]">
        <Link href="/home">
          <li
            className={`flex flex-col items-center ${
              isActive('/home') ? 'text-primary' : 'text-black'
            }`}
          > 
            <div>
              <IoHomeOutline className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Beranda</span>
          </li>
        </Link>

        <Link href="/lokasi">
          <li
            className={`flex flex-col items-center ${
              isActive('/lokasi') ? 'text-primary' : 'text-black'
            }`}
          >
            <div className="flex justify-center">
              <CiLocationOn className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Lokasi</span>
          </li>
        </Link>

        {pathname === '/lokasi' ? (
          <li
            onClick={selectedLocation ? openGoogleMaps : null}
            className={`flex flex-col items-center cursor-pointer transform ${
              selectedLocation ? 'text-black' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="relative flex justify-center -translate-y-10">
              {selectedLocation ? (
                <>
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
                  <div className=" relative inline-flex rounded-full w-20 h-20 bg-sky-500   items-center justify-center ">
                    <BiNavigation className="text-white w-10 h-10 text-center  " />
                  </div>
                </>
              ) : (
                <div className='grid items-center'>
                  <div className=" relative inline-flex rounded-full w-20 h-20 bg-primary  items-center justify-center ">
                    <BiNavigation className="text-white w-10 h-10 text-center  " />
                  </div>
                  <p>navigasi</p>
                </div>
              )}
            </div>
          </li>
        ) : (
          <Link href="/qr">
            <li className="flex flex-col items-center -translate-y-9 ">
              <div className="rounded-full p-6 bg-primary mb-2 ">
                <Image
                  src="/svg/icon-scan.svg"
                  alt="icon scan"
                  width={42}
                  height={42}
                />
              </div>
              <span className="text-xs font-medium text-black">QR Scanner</span>
            </li>
          </Link>
        )}

        <Link href="/aktifitas">
          <li
            className={`flex flex-col items-center ${
              isActive('/aktifitas') ? 'text-primary' : 'text-black'
            }`}
          >
            <div className="pb-1">
              <FiActivity className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Aktifitas</span>
          </li>
        </Link>

        <Link href="/profil">
          <li
            className={`flex flex-col items-center ${
              isActive('/profil') ? 'text-primary' : 'text-black'
            }`}
          >
            <div>
              <CiUser className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Profil</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

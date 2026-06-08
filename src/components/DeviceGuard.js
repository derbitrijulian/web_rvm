'use client';
import { useState, useEffect } from 'react';

export default function DeviceGuard({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Logic to detect desktop/laptop
      // We can use screen width or user agent
      const isWindowDesktop = window.innerWidth >= 1024;
      const isUA =
        /Windows|Macintosh|Linux/i.test(navigator.userAgent) &&
        !/Mobile|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent);

      setIsDesktop(isWindowDesktop || isUA);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isDesktop) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gunakan Perangkat Mobile
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Mohon maaf, aplikasi ini dirancang khusus untuk penggunaan pada
            <span className="font-bold text-primary"> smartphone</span> atau
            <span className="font-bold text-primary"> tablet</span>.
          </p>
          <div className="pt-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-bold">
                Langkah Selanjutnya
              </p>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                    1
                  </span>
                  <span>Buka browser di HP atau Tablet Anda</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                    2
                  </span>
                  <span>Kunjungi kembali situs ini</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return children;
}

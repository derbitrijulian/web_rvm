'use client';
import { useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import { usePathname } from 'next/navigation';

export default function clientLayout({ children }) {
  const pathName = usePathname();
  const NavbarPages = ['/home', '/profil', '/aktifitas', '/lokasi'];

  useEffect(() => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((reg) => {
            console.log('✅ Service Worker registered:', reg);
          })
          .catch((err) => {
            console.error('❌ Service Worker failed:', err);
          });
      });
    }
  }, []);

  return (
    <section>
      {children}
      {NavbarPages.includes(pathName) && <Navbar />}
    </section>
  );
}

'use client';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/ui/navbar';
import { usePathname } from 'next/navigation';

export default function clientLayout({ children }) {
  const pathName = usePathname();
  const NavbarPages = ['/home', '/profil', '/aktifitas', '/lokasi'];
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Trigger install prompt when notification is clicked
  const handleInstallClick = useCallback(async (prompt) => {
    if (!prompt) {
      console.log('Install prompt not available');
      return;
    }

    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    console.log(`User response: ${outcome}`);
    setInstallPrompt(null);
  }, []);

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

    // Handle beforeinstallprompt event (for Android Chrome)
    const handleBeforeInstallPrompt = (e) => {
      console.log('📦 Install prompt event triggered');
      e.preventDefault();
      setInstallPrompt(e);

      // Show notification instead of button
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Instal Aplikasi RVM', {
          body: 'Klik untuk menginstal aplikasi RVM di perangkat Anda',
          icon: '/png/icon-192x192.png',
          badge: '/png/icon-192x192.png',
          tag: 'install-prompt',
          requireInteraction: false,
        }).onclick = () => {
          handleInstallClick(e);
        };
      } else if (
        'Notification' in window &&
        Notification.permission !== 'denied'
      ) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('Instal Aplikasi RVM', {
              body: 'Klik untuk menginstal aplikasi RVM di perangkat Anda',
              icon: '/png/icon-192x192.png',
              badge: '/png/icon-192x192.png',
              tag: 'install-prompt',
              requireInteraction: false,
            }).onclick = () => {
              handleInstallClick(e);
            };
          }
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      console.log('✅ App installed!');
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    // For iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      console.log('📱 iOS detected - Use Share > Add to Home Screen');
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, [handleInstallClick]);

  return (
    <section>
      {children}
      {NavbarPages.includes(pathName) && <Navbar />}
    </section>
  );
}

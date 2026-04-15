'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/ui/navbar';
import { usePathname } from 'next/navigation';

export default function clientLayout({ children }) {
  const pathName = usePathname();
  const NavbarPages = ['/home', '/profil', '/aktifitas', '/lokasi'];
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

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
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('📦 Install prompt event triggered');
      e.preventDefault();
      setInstallPrompt(e);
    });

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
  }, []);

  // Trigger install prompt when user clicks (optional)
  const handleInstallClick = async () => {
    if (!installPrompt) {
      console.log('Install prompt not available');
      return;
    }

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    setInstallPrompt(null);
  };

  return (
    <section>
      {children}
      {NavbarPages.includes(pathName) && <Navbar />}

      {/* Optional: Show install button if prompt available */}
      {installPrompt && !isInstalled && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#0099cc',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: 'bold',
          }}
          onClick={handleInstallClick}
        >
          📱 Install App
        </div>
      )}
    </section>
  );
}

import './globals.css';
import { Poppins } from 'next/font/google';
import ClientLayout from './client-layout';
import { LocationProvider } from '../contexts/LocationContext';
import { UserProvider } from '../contexts/UserContextNew';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const metadata = {
  title: 'Web RVM - Reverse Vending Machine',
  description:
    'Aplikasi Reverse Vending Machine untuk pengelolaan botol dan poin reward',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Web RVM',
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/png/icon-192x192.png',
    apple: '/png/icon-192x192.png',
  },
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} `}>
        <LocationProvider>
          <UserProvider>
            <ClientLayout>
              <main>{children}</main>
            </ClientLayout>
          </UserProvider>
        </LocationProvider>
      </body>
    </html>
  );
}

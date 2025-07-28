'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function QRScanner() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const html5QrcodeScannerRef = useRef(null);
  const readerRef = useRef(null);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const startScanning = async (deviceId) => {
    if (!readerRef.current) return;

    const scanner = new Html5Qrcode(readerRef.current.id);
    html5QrcodeScannerRef.current = scanner;

    try {
      await scanner.start(
        { deviceId: { exact: deviceId } },
        {
          fps: 5,
          qrbox: { width: 300, height: 400 },
        },
        (decodedText) => {
          console.log('Decoded:', decodedText);
          setScanResult(decodedText);
          scanner.stop().catch((e) => console.warn('Stop error:', e));
          if (isValidUrl(decodedText)) {
            router.push(decodedText);
          } else {
            alert('Hasil scan bukan URL valid:\n' + decodedText);
          }
        },
        (err) => {
          console.warn('Scan error:', err);
        }
      );
    } catch (err) {
      console.error('Start scan error:', err);
    }
  };

  const stopScanner = async () => {
    if (html5QrcodeScannerRef.current) {
      await html5QrcodeScannerRef.current.stop().catch(() => {});
      html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
  };

  const toggleCamera = async () => {
    if (cameras.length <= 1) return;

    await stopScanner();
    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIndex);
    startScanning(cameras[nextIndex].deviceId);
  };

  useEffect(() => {
    const setupScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) {
          alert('Kamera tidak ditemukan.');
          return;
        }

        setCameras(devices);
        setCurrentCameraIndex(0);
        startScanning(devices[0].deviceId);
      } catch (err) {
        console.error('Camera error:', err);
        alert('Gagal mengakses kamera.');
      }
    };

    setupScanner();

    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen bg-gray-100">
      {/* Fullscreen camera */}
      <div
        ref={readerRef}
        id="reader"
        className="w-full h-full"
        style={{
          objectFit: 'cover',
        }}
      />
      {scanResult && (
        <div className="mt-4 p-4 bg-white border border-green-500 rounded-md shadow-md">
          <p className="text-green-800 font-semibold">Hasil Scan:</p>
          <p className="text-sm text-gray-800 break-words">{scanResult}</p>
        </div>
      )}

      <div className="rounded-2xl bg-white w-[336px] h-[67px] bottom-0 absolute shadow-md">
        <div className="flex justify-center gap-[210px] py-4 px-7">
          <div onClick={toggleCamera} className="cursor-pointer">
            <Image
              src="/svg/switch-camera.svg"
              alt="Switch Camera"
              width={35}
              height={35}
            />
          </div>
          <div>
            <Link href="/panduan">
              <Image
                src="/svg/panduan.svg"
                alt="panduan"
                width={35}
                height={35}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

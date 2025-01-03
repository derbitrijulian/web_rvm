'use client';
import { Html5Qrcode } from 'html5-qrcode';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const initializeScanner = async () => {
      const qrReaderId = 'reader';

      if (!document.getElementById(qrReaderId)) {
        console.warn(`Element with ID '${qrReaderId}' is not available.`);
        return;
      }

      const qrScanner = new Html5Qrcode(qrReaderId);
      setScanner(qrScanner);

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );
        setCameras(videoDevices);

        if (videoDevices.length > 0) {
          startScanning(qrScanner, videoDevices[0].deviceId);
        } else {
          console.warn('No cameras found.');
        }
      } catch (error) {
        console.error('Error initializing cameras:', error);
      }
    };

    initializeScanner();

    return () => {
      if (scanner) {
        scanner
          .stop()
          .catch((err) => console.warn('Error stopping scanner:', err));
        scanner.clear();
      }
    };
  }, []);

  const startScanning = async (qrScanner, deviceId) => {
    try {
      await qrScanner.start(
        { deviceId: { exact: deviceId } },
        {
          fps: 5,
          qrbox: { width: 300, height: 250 },
        },
        (decodedText) => {
          console.log('Decoded Text:', decodedText);
          setScanResult(decodedText);
          qrScanner
            .stop()
            .catch((err) => console.warn('Error stopping scanner:', err));

          if (isValidUrl(decodedText)) {
            router.replace(decodedText);
          } else {
            alert('Hasil scan bukan URL valid: ' + decodedText);
          }
        },
        (errorMessage) => {
          console.warn('Scan error:', errorMessage);
        }
      );
    } catch (err) {
      console.error('Error starting scanner:', err);
    }
  };

  const toggleCamera = async () => {
    if (scanner && cameras.length > 1) {
      const nextIndex = (currentCameraIndex + 1) % cameras.length;
      setCurrentCameraIndex(nextIndex);
      await scanner
        .stop()
        .catch((err) => console.warn('Error stopping scanner:', err));
      startScanning(scanner, cameras[nextIndex].deviceId);
    } else {
      console.warn('Cannot toggle camera. Only one camera available.');
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen bg-gray-100">
      <div id="reader" className="w-full max-w-md bg-gray-300 rounded-md"></div>

      {scanResult && (
        <div className="mt-4 p-4 bg-primary border border-green-500 rounded">
          <p className="text-green-800 font-medium">Hasil Scan:</p>
          <p className="text-sm text-gray-800 break-words">{scanResult}</p>
        </div>
      )}

      <div className="rounded-2xl bg-white w-[336px] h-[67px] bottom-0 absolute">
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

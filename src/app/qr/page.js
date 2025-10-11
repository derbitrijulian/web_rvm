'use client';

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function QRScannerPage() {
  const [scanner, setScanner] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentStream, setCurrentStream] = useState(null);
  const router = useRouter();

  // Simplified and more reliable cleanup function
  const cleanupStreams = async () => {
    try {
      console.log('🧹 Cleaning up camera resources...');

      // Stop current stream tracks
      if (currentStream) {
        currentStream.getTracks().forEach((track) => {
          try {
            track.stop();
            console.log('✅ Stopped track:', track.kind);
          } catch (e) {
            console.warn('Error stopping track:', e);
          }
        });
        setCurrentStream(null);
      }

      // Stop scanner if running
      if (scanner) {
        try {
          if (isScanning) {
            await scanner.stop();
            setIsScanning(false);
          }
          console.log('✅ Scanner stopped');
        } catch (e) {
          console.warn('Error stopping scanner:', e);
        }
      }

      // Simple delay for cleanup
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  };

  // Add custom styles for full screen camera
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #reader {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 1 !important;
        background: #000 !important;
      }
      #reader > div {
        width: 100% !important;
        height: 100% !important;
      }
      #reader video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center !important;
      }
      #reader canvas {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center !important;
      }
      #reader__scan_region {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 10 !important;
      }
      #reader__scan_region img {
        width: 300px !important;
        height: 300px !important;
        border: 2px solid #00ff00 !important;
        border-radius: 12px !important;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const initializeScanner = async () => {
      const qrReaderId = 'reader';

      // Wait for DOM to be ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!document.getElementById(qrReaderId)) {
        console.warn(`Element with ID '${qrReaderId}' is not available.`);
        setIsInitializing(false);
        return;
      }

      try {
        // Force comprehensive cleanup first
        await cleanupStreams();

        console.log('🔄 Initializing camera...');

        const qrScanner = new Html5Qrcode(qrReaderId);
        setScanner(qrScanner);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );

        console.log('📱 Available cameras:', videoDevices.length);
        setCameras(videoDevices);

        if (videoDevices.length > 0) {
          // Priority untuk back camera
          const backCamera = videoDevices.find((device) => {
            const label = device.label.toLowerCase();
            return (
              label.includes('back') ||
              label.includes('environment') ||
              label.includes('rear') ||
              label.includes('world')
            );
          });

          let cameraToUse;
          if (backCamera) {
            cameraToUse = backCamera;
            console.log('✅ Using back camera:', backCamera.label);
          } else if (videoDevices.length > 1) {
            // Use last camera (usually back)
            cameraToUse = videoDevices[videoDevices.length - 1];
            console.log(
              '⚠️ No back camera found, using last camera:',
              cameraToUse.label
            );
          } else {
            // Single camera
            cameraToUse = videoDevices[0];
            console.log('📱 Single camera:', cameraToUse.label);
          }

          // Add delay before starting
          await new Promise((resolve) => setTimeout(resolve, 500));
          await startScanning(qrScanner, cameraToUse.deviceId);
        } else {
          setCameraError('No cameras found.');
        }
      } catch (error) {
        console.error('Error initializing cameras:', error);
        setCameraError(`Camera initialization failed: ${error.message}`);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeScanner();

    // Cleanup on component unmount
    return () => {
      cleanupStreams();
    };
  }, []);

  const startScanning = async (qrScanner, deviceId) => {
    console.log('🎥 Starting camera scan...');
    setCameraError(null);
    setIsScanning(true);

    // Simple, reliable camera start with back camera priority
    const constraints = [
      { facingMode: 'environment' }, // Back camera
      { deviceId: deviceId }, // Specific device
      { video: true }, // Fallback
    ];

    for (let i = 0; i < constraints.length; i++) {
      try {
        console.log(`Trying camera constraint ${i + 1}:`, constraints[i]);

        await qrScanner.start(
          constraints[i],
          {
            fps: 20,
            qrbox: (width, height) => {
              const size = Math.min(width, height) * 0.6;
              return { width: size, height: size };
            },
          },
          (decodedText) => {
            console.log('🎯 QR Code Detected:', decodedText);
            setScanResult(decodedText);

            // Stop scanner immediately
            qrScanner.stop().catch(console.warn);
            setIsScanning(false);

            // Clean up streams
            cleanupStreams();

            // Handle different types of QR codes
            console.log('🔄 Processing QR result...');

            // Special handling for bottlein
            if (
              decodedText.includes('bottlein') ||
              decodedText.includes('/bottlein')
            ) {
              console.log('✅ Detected bottlein QR, redirecting...');
              setTimeout(() => {
                router.push('/bottlein');
              }, 500);
              return;
            }

            // Handle full URLs
            if (
              decodedText.startsWith('http://localhost:3000/bottlein') ||
              decodedText.startsWith('https://localhost:3000/bottlein')
            ) {
              console.log('✅ Detected localhost bottlein URL, redirecting...');
              setTimeout(() => {
                router.push('/bottlein');
              }, 500);
              return;
            }

            // Handle any localhost URL
            if (decodedText.includes('localhost:3000')) {
              console.log('✅ Detected localhost URL:', decodedText);
              try {
                const url = new URL(decodedText);
                setTimeout(() => {
                  router.push(url.pathname + url.search);
                }, 500);
              } catch (e) {
                console.error('Error parsing localhost URL:', e);
                setTimeout(() => {
                  router.push('/bottlein');
                }, 500);
              }
              return;
            }

            // Handle relative paths
            if (decodedText.startsWith('/')) {
              console.log('✅ Detected relative path:', decodedText);
              setTimeout(() => {
                router.push(decodedText);
              }, 500);
              return;
            }

            // Handle full URLs
            if (isValidUrl(decodedText)) {
              console.log('✅ Detected valid URL:', decodedText);
              if (decodedText.startsWith('http')) {
                window.location.href = decodedText;
              } else {
                setTimeout(() => {
                  router.push(decodedText);
                }, 500);
              }
              return;
            }

            // Default fallback - assume it's for bottlein
            console.log(
              '⚠️ Unknown QR format, defaulting to bottlein:',
              decodedText
            );
            alert(
              `QR Code: ${decodedText}\nMengarahkan ke halaman Bottle In...`
            );
            setTimeout(() => {
              router.push('/bottlein');
            }, 1000);
          },
          (error) => {
            // Suppress common scanning errors
            if (!error.includes('No QR code found')) {
              console.warn('Scan error:', error);
            }
          }
        );

        console.log('✅ Camera started successfully');
        return; // Success, exit function
      } catch (error) {
        console.warn(`Camera constraint ${i + 1} failed:`, error.message);

        if (i === constraints.length - 1) {
          // Last attempt failed
          setCameraError(`Camera failed: ${error.message}`);
          setIsScanning(false);
        }
      }
    }
  };

  const isValidUrl = (string) => {
    try {
      // Check if it's a valid URL
      new URL(string);
      return true;
    } catch (error) {
      // Also accept relative paths that start with /
      if (string.startsWith('/')) {
        return true;
      }
      // Accept localhost URLs
      if (string.includes('localhost') || string.includes('127.0.0.1')) {
        return true;
      }
      return false;
    }
  };

  const goToPanduan = () => {
    console.log('🔄 Navigating to panduan, cleaning up camera...');
    cleanupStreams().then(() => {
      router.push('/panduan');
    });
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Initializing camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* QR Reader */}
      <div id="reader" className="w-full h-full"></div>

      {/* Top UI */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-white bg-black/50 rounded-full p-2"
          >
            <Image
              src="/svg/image-back.svg"
              alt="Back"
              width={24}
              height={24}
            />
          </button>
          <div className="text-white text-lg font-semibold">Scan QR Code</div>
          <button
            onClick={goToPanduan}
            className="text-white bg-white rounded-full p-2"
          >
            <Image src="/svg/panduan.svg" alt="Guide" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Bottom UI */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-center">
          <div className="text-white text-sm mb-4">
            Arahkan kamera ke QR code
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-2 h-2 rounded-full ${
                isScanning ? 'bg-green-400' : 'bg-red-400'
              } mr-2`}
            ></div>
            <span className="text-white text-sm">
              {isScanning ? 'Camera Active' : 'Camera Inactive'}
            </span>
          </div>

          {cameraError && (
            <div className="text-red-400 text-sm mb-4">{cameraError}</div>
          )}

          {scanResult && (
            <div className="text-green-400 text-sm">
              Scan Result: {scanResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

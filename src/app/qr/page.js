'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [autoStartFailed, setAutoStartFailed] = useState(false);
  const readerRef = useRef(null);
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

  useLayoutEffect(() => {
    const initializeScanner = async () => {
      // Wait for ref to be available (with extended timeout for production)
      let attempts = 0;
      const maxAttempts = 30; // 3 seconds total (30 * 100ms)
      while (attempts < maxAttempts && !readerRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (!readerRef.current) {
        console.error(
          `❌ Reader element not available after ${maxAttempts * 100}ms`
        );
        setCameraError('Halaman render gagal. Coba refresh.');
        setAutoStartFailed(true);
        setIsInitializing(false);
        return;
      }

      console.log('✅ Reader element found on attempt', attempts + 1);

      try {
        // Force comprehensive cleanup first
        await cleanupStreams();

        console.log('🔄 Initializing camera...');

        // Request permission FIRST so device labels are available
        try {
          await requestCameraPermission();
        } catch (permErr) {
          console.debug('Permission request during init:', permErr?.message);
        }

        const qrScanner = new Html5Qrcode('reader');
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

          setIsCameraReady(true);
          // Add delay before starting
          await new Promise((resolve) => setTimeout(resolve, 500));
          await startScanning(qrScanner, cameraToUse.deviceId);
          setAutoStartFailed(false);
        } else {
          const msg = 'No cameras found.';
          console.error(msg);
          setCameraError(msg);
          setAutoStartFailed(true);
        }
      } catch (error) {
        console.error('Error initializing cameras:', error);
        const errMsg = `Camera init failed: ${error?.message || String(error)}`;
        setCameraError(errMsg);
        setAutoStartFailed(true);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsInitializing(false);
      }
    };

    initializeScanner();

    // Cleanup on component unmount
    return () => {
      cleanupStreams();
    };
  }, []);

  const requestCameraPermission = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      throw new Error('Browser tidak mendukung akses kamera.');
    }

    const tempStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    tempStream.getTracks().forEach((track) => track.stop());
  };

  const startScanning = async (qrScanner, deviceId) => {
    console.log('🎥 Starting camera scan...', { deviceId });
    setCameraError(null);
    setIsScanning(false);

    // Try deviceId first (most reliable), then fallback to facingMode
    const attempts = [
      { type: 'deviceId', deviceId },
      { type: 'facingMode', facingMode: 'environment' },
      { type: 'facingMode', facingMode: 'user' }, // Last resort
    ];

    for (let i = 0; i < attempts.length; i++) {
      const attempt = attempts[i];
      try {
        console.log(`Attempt ${i + 1}:`, attempt.type, attempt);

        // Build config for Html5Qrcode based on attempt type
        let config;
        if (attempt.type === 'deviceId') {
          config = { deviceId: { exact: attempt.deviceId } };
        } else {
          config = { facingMode: { ideal: attempt.facingMode } };
        }

        // Pre-test stream to ensure permission and constraint works
        let testStream = null;
        try {
          testStream = await navigator.mediaDevices.getUserMedia({
            video: config,
            audio: false,
          });
          if (testStream) setCurrentStream(testStream);
          console.log(`✅ Stream test passed for ${attempt.type}`);
        } catch (streamErr) {
          console.debug(
            `Stream test failed for ${attempt.type}:`,
            streamErr?.message
          );
          // Continue to next attempt if stream test fails
          if (i < attempts.length - 1) continue;
          throw streamErr; // Throw if this was last attempt
        }

        await qrScanner.start(
          attempt.deviceId || { facingMode: attempt.facingMode },
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
            qrScanner.stop().catch(console.warn);
            setIsScanning(false);
            cleanupStreams();

            // reuse existing result handling
            if (
              decodedText.includes('bottlein') ||
              decodedText.includes('/bottlein')
            ) {
              setTimeout(() => router.push('/bottlein'), 500);
              return;
            }
            if (decodedText.includes('localhost:3000')) {
              try {
                const url = new URL(decodedText);
                setTimeout(() => router.push(url.pathname + url.search), 500);
              } catch (e) {
                setTimeout(() => router.push('/bottlein'), 500);
              }
              return;
            }
            if (decodedText.startsWith('/')) {
              setTimeout(() => router.push(decodedText), 500);
              return;
            }
            if (isValidUrl(decodedText)) {
              if (decodedText.startsWith('http'))
                window.location.href = decodedText;
              else setTimeout(() => router.push(decodedText), 500);
              return;
            }

            alert(
              `QR Code: ${decodedText}\nMengarahkan ke halaman Bottle In...`
            );
            setTimeout(() => router.push('/bottlein'), 1000);
          },
          (error) => {
            if (!String(error).includes('No QR code found'))
              console.warn('Scan error:', error);
          }
        );

        setIsScanning(true);
        setIsCameraReady(true);
        console.log('✅ Camera started successfully with', attempt.type);
        return;
      } catch (error) {
        console.warn(
          `Attempt ${i + 1} (${attempt.type}) failed:`,
          error?.message || error
        );
        if (i === attempts.length - 1) {
          const errorMsg = `Camera failed: ${error?.message || String(error)}`;
          setCameraError(errorMsg);
          setIsScanning(false);
          setIsCameraReady(false);
          console.error('❌ All camera attempts exhausted:', errorMsg);
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

  const goHome = () => {
    console.log('🔄 Navigating home, cleaning up camera...');
    cleanupStreams().then(() => {
      router.push('/home');
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
      <div ref={readerRef} id="reader" className="w-full h-full"></div>

      {/* Top UI */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center">
          <button
            onClick={goHome}
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

          {!isScanning && autoStartFailed && (
            <button
              type="button"
              onClick={async () => {
                try {
                  setAutoStartFailed(false);
                  setCameraError(null);

                  if (scanner) {
                    await cleanupStreams();
                  }

                  await requestCameraPermission();

                  if (!cameras || cameras.length === 0) {
                    throw new Error('Kamera tidak terdeteksi.');
                  }

                  const selectedCamera =
                    cameras[currentCameraIndex] || cameras[0];
                  const newScanner = new Html5Qrcode('reader');
                  setScanner(newScanner);
                  await startScanning(newScanner, selectedCamera.deviceId);
                } catch (error) {
                  const errMsg = error?.message || String(error);
                  setCameraError(`Kamera gagal: ${errMsg}`);
                  setAutoStartFailed(true);
                  console.error('Retry button error:', error);
                }
              }}
              className="mb-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              🔄 Coba Lagi
            </button>
          )}

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

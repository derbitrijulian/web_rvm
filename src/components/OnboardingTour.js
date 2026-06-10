'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUserContext } from '@/contexts/UserContextNew';

export default function OnboardingTour() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elementPosition, setElementPosition] = useState(null);
  const { userDetail, isLoading } = useUserContext();

  useEffect(() => {
    console.log('🎯 OnboardingTour useEffect triggered', {
      isLoading,
      hasUserDetail: !!userDetail,
      userDetailStructure: userDetail ? Object.keys(userDetail) : [],
      userId: userDetail?.id,
      userDataId: userDetail?.data?.id,
      userEmail: userDetail?.email,
      userDataEmail: userDetail?.data?.email,
      windowExists: typeof window !== 'undefined',
    });

    if (typeof window === 'undefined') {
      console.log('⚠️ Window undefined - SSR');
      return;
    }

    if (isLoading) {
      console.log('⏳ User data still loading...');
      return;
    }

    if (!userDetail) {
      console.log('❌ No user detail available');
      return;
    }

    const userId = userDetail.id || userDetail.data?.id;

    if (!userId) {
      console.log('❌ No user ID found in userDetail', { userDetail });
      return;
    }

    const userKey = `hasSeenOnboarding_${userId}`;
    const hasSeenOnboarding = localStorage.getItem(userKey);

    console.log('✅ Checking onboarding status', {
      userId,
      userKey,
      hasSeenOnboarding,
      allOnboardingKeys: Object.keys(localStorage).filter((k) =>
        k.includes('hasSeenOnboarding')
      ),
    });

    if (!hasSeenOnboarding) {
      console.log('🎉 First time user! Showing onboarding in 1.5s...');
      setTimeout(() => {
        setShowWelcome(true);
      }, 1500);
    } else {
      console.log('👍 User has already seen onboarding', {
        userKey,
        value: hasSeenOnboarding,
      });
    }
  }, [userDetail, isLoading]);

  useEffect(() => {
    if (isActive && typeof window !== 'undefined') {
      const updatePosition = () => {
        const currentStepData = steps[currentStep];
        const element = document.querySelector(
          currentStepData.highlightSelector
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          setElementPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          });
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isActive, currentStep]);

  const handleYes = () => {
    setShowWelcome(false);
    setIsActive(true);
    setCurrentStep(0);
  };

  const handleNo = () => {
    setShowWelcome(false);
    const userId = userDetail?.id || userDetail?.data?.id;
    if (userId) {
      const userKey = `hasSeenOnboarding_${userId}`;
      localStorage.setItem(userKey, 'true');
      console.log('🚫 User declined onboarding', { userId, userKey });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      const userId = userDetail?.id || userDetail?.data?.id;
      if (userId) {
        const userKey = `hasSeenOnboarding_${userId}`;
        localStorage.setItem(userKey, 'true');
        console.log('✅ Onboarding completed', { userId, userKey });
      }
    }
  };

  const steps = [
    {
      id: 'notification',
      title: 'Notifikasi',
      description: 'Untuk melihat pembaruan atau pesan yang masuk untuk kamu',
      position: 'top-right',
      highlightSelector: '[data-tour="notification"]',
      tooltipStyle: {
        top: '80px',
        right: '20px',
      },
    },
    {
      id: 'location',
      title: 'Lokasi',
      description: 'Untuk melihat lokasi RVM terdekat dari posisi kamu',
      position: 'middle-left',
      highlightSelector: '[data-tour="location"]',
      tooltipStyle: {
        bottom: '110px',
        left: '80px',
      },
    },
    {
      id: 'scan',
      title: 'Scan',
      description:
        'Untuk mengakses fitur scan QR untuk memulai memasukkan botol ke RVM',
      position: 'bottom-center',
      highlightSelector: '[data-tour="scan"]',
      tooltipStyle: {
        bottom: '110px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    {
      id: 'activities',
      title: 'Aktifitas',
      description: 'Untuk melihat riwayat dan aktivitas transaksi kamu',
      position: 'bottom-right',
      highlightSelector: '[data-tour="activities"]',
      tooltipStyle: {
        bottom: '110px',
        right: '80px',
      },
    },
    {
      id: 'profile',
      title: 'Profil',
      description: 'Untuk melihat profil dan mengatur akun kamu',
      position: 'bottom-right',
      highlightSelector: '[data-tour="profile"]',
      tooltipStyle: {
        bottom: '110px',
        right: '20px',
      },
    },
  ];

  if (!showWelcome && !isActive) return null;

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <Image
                  src="/svg/emote.svg"
                  alt="welcome"
                  width={54}
                  height={54}
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center text-text-primary mb-2">
              Selamat Datang!
            </h2>
            <p className="text-center text-text-secondary mb-6 text-sm">
              Apakah anda membutuhkan intruksi terkait aplikasi?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleYes}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark"
              >
                Ya
              </button>
              <button
                onClick={handleNo}
                className="flex-1 py-3 text-text-primary rounded-xl font-medium bg-secondary"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {isActive && elementPosition && (
        <div className="fixed inset-0 z-[90]">
          <div
            className="absolute rounded-full border-4 border-white pointer-events-none z-[91]"
            style={{
              left: elementPosition.x - 50,
              top: elementPosition.y - 50,
              width: 100,
              height: 100,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            }}
          />

          <div
            className="absolute bg-white rounded-2xl p-5 shadow-2xl w-72 pointer-events-auto z-[92]"
            style={getTooltipPosition(steps[currentStep].id, elementPosition)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/svg/image-splash.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary text-base">
                  {steps[currentStep].title}
                </h3>
                <p className="text-text-secondary text-xs mt-1">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark"
            >
              {currentStep < steps.length - 1 ? 'Lanjut' : 'Selesai'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function getTooltipPosition(stepId, elementPosition) {
  if (!elementPosition) return {};

  const tooltipWidth = 288;
  const tooltipHeight = 150;
  const offset = 20;

  switch (stepId) {
    case 'notification':
    case 'help':
      return {
        top: elementPosition.y + 60,
        right: 20,
      };
    case 'scan':
      return {
        bottom: 150,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'activities':
      return {
        bottom: 150,
        right: 80,
      };
    case 'profile':
      return {
        bottom: 150,
        right: 20,
      };
    case 'location':
      return {
        bottom: 150,
        left: 20,
      };
    default:
      return {
        top: elementPosition.y + 60,
        left: 20,
      };
  }
}

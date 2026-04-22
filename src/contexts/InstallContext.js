'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const InstallContext = createContext();

export const InstallProvider = ({ children }) => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Handle beforeinstallprompt event (for Android Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const triggerInstall = async (prompt) => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    console.log(`User response: ${outcome}`);
    setInstallPrompt(null);
  };

  return (
    <InstallContext.Provider
      value={{ installPrompt, isInstalled, triggerInstall }}
    >
      {children}
    </InstallContext.Provider>
  );
};

export const useInstall = () => {
  const context = useContext(InstallContext);
  if (!context) {
    throw new Error('useInstall must be used within InstallProvider');
  }
  return context;
};

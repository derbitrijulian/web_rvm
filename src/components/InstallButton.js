'use client';
import { useInstall } from '@/contexts/InstallContext';

export default function InstallButton() {
  const { installPrompt, isInstalled, triggerInstall } = useInstall();

  // Jangan tampilkan jika sudah installed atau tidak ada prompt
  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <button
      onClick={() => triggerInstall(installPrompt)}
      className="bg-white text-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 active:scale-95"
      title="Install aplikasi di perangkat Anda"
    >
      Get App
    </button>
  );
}

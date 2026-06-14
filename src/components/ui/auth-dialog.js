'use client';

export default function AuthDialog({ type, onClose, onNavigate }) {
  const configs = {
    emailNotFound: {
      icon: '!',
      iconBg: 'bg-primary',
      title: 'Email belum terdaftar',
      message: 'Silahkan daftar terlebih dahulu',
      buttonText: 'Kembali',
      buttonAction: onClose,
    },
    invalidData: {
      icon: '✕',
      iconBg: 'bg-primary',
      title: 'Data Salah',
      message: 'Mohon Isi data dengan Lengkap dan Benar',
      buttonText: 'Kembali',
      buttonAction: onClose,
    },
    registrationSuccess: {
      icon: '✓',
      iconBg: 'bg-primary',
      title: 'Registrasi Berhasil',
      message: 'Akun anda berhasil dibuat',
      buttonText: 'Ke Halaman Login',
      buttonAction: onNavigate || onClose,
    },
  };

  const config = configs[type] || configs.invalidData;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative w-80 max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full ${config.iconBg} flex items-center justify-center mb-5`}
          >
            <span className="text-white text-6xl font-bold leading-none">
              {config.icon}
            </span>
          </div>

          <h2 className="text-poppins text-lg font-bold text-gray-800 text-center mb-3">
            {config.title}
          </h2>

          <p className="text-sm text-gray-600 text-center mb-6">
            {config.message}
          </p>

          <button
            onClick={config.buttonAction}
            className="w-full py-3 bg-primary text-white text-base font-medium rounded-lg hover:bg-[#0096b8] transition-colors"
          >
            {config.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

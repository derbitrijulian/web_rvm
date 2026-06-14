'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { registerUser } from '../../services/auth-service';
import AuthDialog from '../../components/ui/auth-dialog';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔍 Form submitted, validating...');

    if (formData.password !== formData.confirmPassword) {
      console.log('❌ Password mismatch, showing dialog');
      setDialogType('invalidData');
      setShowDialog(true);
      return;
    }

    if (!checked) {
      console.log('❌ Checkbox not checked, showing dialog');
      setDialogType('invalidData');
      setShowDialog(true);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      console.log('❌ Empty fields detected, showing dialog');
      setDialogType('invalidData');
      setShowDialog(true);
      return;
    }

    try {
      console.log('✅ Validation passed, calling API...');
      setError('');
      setSuccess('');

      const response = await registerUser(formData);
      console.log('✅ Registration successful:', response);
      
      setDialogType('registrationSuccess');
      setShowDialog(true);

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
      setChecked(false);
    } catch (error) {
      console.log('❌ Registration failed:', error.message);
      setDialogType('invalidData');
      setShowDialog(true);
    }
  };

  return (
    <div className="bg-primary pt-[34px] min-h-full flex flex-col">
      <div className="flex items-center justify-center">
        <Link href="/login" className="absolute left-8 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>
        <h1 className="text-bgSecondary font-semibold w-screen text-center text-[28px]">
          Daftar
        </h1>
      </div>
      <p className="text-bgSecondary text-sm font-regular text-center text-[12px] pt-1 pb-4 px-12">
        Silahkan isi form untuk bergabung
      </p>
      <form onSubmit={handleSubmit}>
        <div className="bg-bgSecondary rounded-t-[36px] pt-20 px-9 flex-1">
          <div>
            <label
              className="text-text-primary text-sm font-medium"
              htmlFor="fullName"
            >
              Nama Lengkap
            </label>
            <input
              required
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Masukkan Nama Pengguna"
              value={formData.fullName}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              className="text-text-primary mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Kata Sandi
            </label>
            <div className="flex items-center mt-2 border-[3px] border-secondary rounded-[10px] focus-within:ring-2 focus-within:ring-primary bg-white">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan Kata Sandi"
                value={formData.password}
                onChange={handleChange}
                className="text-text-primary pl-3 py-3 w-full text-sm focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3 text-text-primary hover:text-primary transition-colors flex-shrink-0"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Konfirmasi Kata Sandi
            </label>
            <div className="flex items-center mt-2 border-[3px] border-secondary rounded-[10px] focus-within:ring-2 focus-within:ring-primary bg-white">
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="text-text-primary pl-3 py-3 w-full text-sm focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="pr-3 text-text-primary hover:text-primary transition-colors flex-shrink-0"
              >
                {showConfirmPassword ? (
                  <FiEye size={20} />
                ) : (
                  <FiEyeOff size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-text-primary text-sm font-medium">
              Nomor Hp
            </label>
            <input
              required
              type="text"
              name="phone"
              placeholder="Masukkan No Hp"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            />
          </div>

          <p className="text-xs pt-2 text-red-500">*Tanda Kolom Wajib Diisi</p>
          <div className="flex items-start gap-5 px-6 mt-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="peer h- w-5 cursor-pointer rounded border border-gray-300 checked:bg-primary"
              />
              <span className="ml-2 text-xs text-text-primary">
                Saya menyetujui{' '}
                <Link href="/syarat-ketentuan?callback=/registration">
                  Syarat dan Ketentuan
                </Link>
              </span>
            </label>
          </div>
          <div className="grid justify-center gap-3 pt-8 pb-3">
            <button
              type="submit"
              className="py-3 bg-primary rounded-full w-52 text-bgSecondary font-semibold text-xl"
            >
              Daftar
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </div>
      </form>
      {showDialog && (
        <AuthDialog
          type={dialogType}
          onClose={() => setShowDialog(false)}
          onNavigate={() => router.push('/login')}
        />
      )}
    </div>
  );
}

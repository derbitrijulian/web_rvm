import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="bg-primary pt-[35px]">
      {/* Header */}
      <div className="justify-center">
        <Link href="/edit" className="absolute left-6 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>
        <h1 className="text-bgSecondary font-semibold w-full text-center text-[24px] pb-6 pt-1">
          Profil
        </h1>
      </div>

      {/* Profile Section */}
      <div className="bg-bgSecondary h-full rounded-t-[36px] py-10 px-9 mt-20 relative">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="absolute -top-16 w-[130px] h-[130px] rounded-full bg-text-primary flex items-center justify-center">
            <Image
              src="/svg/icon-user.svg"
              alt="icon user"
              width={130}
              height={130}
            />
          </div>

          {/* Username */}
          <h1 className="text-text-primary font-semibold text-2xl mt-[60px] mb-6">
            @Comefeelme
          </h1>

          {/* Input Fields */}
          <div className="w-full space-y-4">
            <Field label="Nama Lengkap" placeholder="Example" />
            <Field
              label="Email"
              placeholder="example@example.com"
              type="email"
              className="text-text-primary"
            />
            <Field
              label="No Handphone"
              placeholder="081331955901"
              className="text-text-primary"
            />
          </div>

          {/* Button */}
          <div className="mt-32">
            <Link href="#">
              <button
                type="submit"
                className="py-3 px-6 bg-primary text-bgSecondary font-semibold text-lg rounded-xl shadow-md hover:bg-blue-600"
              >
                Simpan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field Component
function Field({
  label,
  placeholder,
  type = 'text',
  disabled = false,
  className = '',
}) {
  return (
    <div>
      <label className="text-text-primary text-sm font-medium block mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      />
    </div>
  );
}

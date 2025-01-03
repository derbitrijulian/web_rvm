import ForgotAndNewPassword from '@/components/containers/forgot-and-password';
import Image from 'next/image';
import Link from 'next/link';

export default function newpasswordPage() {
  return (
    // <div className="bg-primary h-screen pt-[35px] ">
    //   <div className="flex items-center justify-center">
    //     <Link href="/login" className="absolute left-8 top-[44px]">
    //       <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
    //     </Link>

    //     <h1 className="text-bgSecondary font-semibold w-full text-center text-[28px] pb-6 pt-1">
    //       Kata sandi Baru
    //     </h1>
    //   </div>

    //   <div className="bg-bgSecondary h-[559px] rounded-t-[36px] pt-20 px-9">
    //     <div>
    //       <label className="text-text-primary text-sm font-medium text-[15px]">
    //         Kata Sandi
    //       </label>
    //       <input
    //         type="text"
    //         placeholder=""
    //         className="mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    //       />
    //     </div>

    //     <div className="mt-6">
    //       <label className="text-text-primary text-sm font-medium text-[15px] flex justify-between">
    //         Konfirmasi Kata Sandi
    //       </label>

    //       <input
    //         type="text"
    //         placeholder=""
    //         className="mt-2 pl-3 pr-3 w-full p-3 border-[3px] border-secondary rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    //       />
    //     </div>

    //     <div className="grid justify-center gap-3 pt-12 pb-10">
    //       <Link href="/login">
    //         <button className="py-3 bg-primary rounded-xl w-52 text-bgSecondary font-semibold text-xl">
    //           Ganti Kata Sandi
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <ForgotAndNewPassword title="Ubah Kata Sandi" />
  );
}

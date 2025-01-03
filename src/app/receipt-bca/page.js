import Link from 'next/link';
import ReceiptRedeemQrPage from '@/components/containers/receipt-reedem-qr';

export default function Page() {
  return (
    <ReceiptRedeemQrPage title="BCA">
      {/* Success Message */}
      <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
        Redeem Berhasil!
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Redeem anda telah berhasil dilakukan.
      </p>

      {/* Total Redeem */}
      <div className="text-lg font-bold mb-4 text-center">Total Redeem</div>
      <div className="text-2xl font-semibold text-primary mb-6 text-center">
        IDR 10.000
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-left text-sm">
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Nomor</p>
          <p>712xxxxxxx</p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Waktu</p>
          <p>25 Feb 2023, 13:22</p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Nama</p>
          <p>Anto</p>
        </div>
        <div className="border shadow-sm p-3 rounded-lg">
          <p className="font-semibold text-gray-500">Rekening</p>
          <p>BCA</p>
        </div>
      </div>

      {/* Activity Link */}
      <Link href="/aktifitas">
        <div className="text-[#616161] text-[12px] cursor-pointer hover:underline pt-12 text-center">
          Lihat Aktivitas
        </div>
      </Link>
    </ReceiptRedeemQrPage>
  );
}

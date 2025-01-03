'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Page() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callback') || '/profil';

  return (
    <div className="bg-primary h-screen pt-[35px] ">
      <div className="flex items-center justify-center">
        <Link href={callbackUrl} className="absolute left-6 top-[44px]">
          <Image src="/svg/image-back.svg" alt="Back" width={14} height={25} />
        </Link>

        <h1 className="text-bgSecondary font-semibold w-full text-center text-[20px] pb-6 pt-1">
          Kebijakan Privasi
        </h1>
      </div>

      <div className="bg-bgSecondary h-full rounded-t-[36px] pt-10 px-9 pb-8">
        <p className="text-text-primary font-normal px-1 pt-6 pb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
          tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
          ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
          Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi
          eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
          imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
          Egestas integer eget aliquet nibh praesent. In hac habitasse platea
          dictumst quisque sagittis purus. Pulvinar elementum integer enim neque
          volutpat ac. Senectus et netus et malesuada. Nunc pulvinar sapien et
          ligula ullamcorper malesuada proin. Neque convallis a cras semper
          auctor. Libero id faucibus nisl tincidunt eget. Leo a diam
          sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod
          lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum
          posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non
          enim praesent elementum facilisis.
        </p>
      </div>
    </div>
  );
}

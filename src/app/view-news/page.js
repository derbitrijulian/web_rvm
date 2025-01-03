import Image from 'next/image';
import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="relative h-screen pt-[35px]">
      {/* Background Image */}
      <Image
        src="/png/image-news1.png"
        alt="news 1"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="z-0"
      />

      {/* Header */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-30">
        <div className="flex items-center justify-between p-4">
          {/* Back Button */}
          <Link href="/news">
            <button className="text-white">
              <Image
                src="/svg/image-back.svg"
                alt="Back"
                width={14}
                height={25}
              />
            </button>
          </Link>

          {/* Page Title */}
          <h1 className="text-bgSecondary font-semibold w-full text-start text-[24px] pb-6 pt-4 pl-7">
            Berita
          </h1>
        </div>

        {/* Content Section */}
        <div className=" bg-white rounded-t-3xl p-6 mt-80">
          <h2 className="text-xl font-bold mb-2 text-primary">
            Sinar Mas Resmikan Reverse Vending Machine Di Kalibata Plaza
          </h2>
          <p className="text-primary mb-4">6 jam yang lalu</p>
          <p className="text-text-primary leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
            ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
            Commodo odio aenean sed adipiscing diam donec adipiscing tristique.
            Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
            imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
            Egestas integer eget aliquet nibh praesent. In hac habitasse platea
            dictumst quisque sagittis purus. Pulvinar elementum integer enim
            neque volutpat ac. Senectus et netus et malesuada. Nunc pulvinar
            sapien et ligula ullamcorper malesuada proin. Neque convallis a cras
            semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam
            sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod
            lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum
            posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus
            non enim praesent elementum facilisis.
          </p>
        </div>
      </div>
    </div>
  );
}

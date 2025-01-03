'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Perbaikan di sini

const Modal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const router = useRouter(); // Tidak akan error lagi

  const slides = [
    {
      image: '/svg/wifi.svg',
      title: 'TERHUBUNG',
      description: 'Anda bisa memutuskan koneksi',
      buttons: [
        {
          text: 'Lanjutkan',
          action: () => setCurrentSlide(1),
          color: 'bg-primary',
        },
        {
          text: 'Putuskan',
          action: () => router.push('/home'),
          color: 'bg-red-500',
        },
      ],
    },
    {
      images: [
        { src: '/svg/botol-isi.svg', alt: 'botol isi' },
        { src: '/svg/uncheck.svg', alt: 'uncheck' },
        { src: '/svg/botol-kosong.svg', alt: 'botol kosong' },
        { src: '/svg/check.svg', alt: 'check' },
      ],
      title: 'PERHATIKAN',
      description: 'Pastikan Botol Dalam Keadaan Kosong',
      buttons: [
        {
          text: 'Lanjutkan',
          action: () => setCurrentSlide(2),
          color: 'bg-primary',
        },
      ],
    },
    {
      image: '/svg/perhatikan.svg',
      title: 'PERHATIKAN',
      description:
        'Masukkan Botol Satu per Satu Tunggu signal suara dan lampu dari RVM',
      buttons: [
        {
          text: 'Mulai',
          action: () => setIsModalVisible(false),
          color: 'bg-primary',
        },
      ],
    },
  ];

  if (!isModalVisible) return null;

  const { image, images, title, description, buttons } = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative w-[350px] max-w-2xl p-4 bg-white rounded-lg shadow dark:bg-white">
        <div className="flex justify-center p-4">
          {images ? (
            <div className="flex space-x-4">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  width={100}
                  height={100}
                  className="item-center"
                />
              ))}
            </div>
          ) : (
            <Image
              src={image}
              alt="slide image"
              width={175}
              height={175}
              className="item-center"
            />
          )}
        </div>

        <div className="grid justify-center">
          <h1 className="text-text-primary text-[22px] text-center">{title}</h1>
          <p className="text-text-primary text-xs text-center">{description}</p>
        </div>

        <div className="grid space-y-3 items-center justify-center p-4 dark:border-gray-600">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`px-20 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 ${button.color}`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

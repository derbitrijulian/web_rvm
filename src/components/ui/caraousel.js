'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NextButton from '@/png/next.svg';

export default function Carousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="">
        <p>No Images</p>
      </div>
    );
  }

  return (
    <div id="caraousel" className="relative w-full">
      <div className="relative h-56 overflow-hidden ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="block w-full h-full object-cover"
              width={600}
              height={300}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <Image
          src="/svg/slide-right.svg"
          alt="next"
          width={32}
          height={32}
          className="rotate-180"
        />
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <Image src={NextButton} alt="next" width={32} height={32} />
      </button>
    </div>
  );
}

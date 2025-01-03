'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function OptionItem({ icon, text, href="" }) {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-4">
        <Image src={icon} alt="icon" width={21} height={21} />
        <p className="text-text-primary font-semibold text-base">{text}</p>
      </div>
    </Link>
  );
}

"use client";

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-auto px-4 py-2 bg-transparent">
      <div className="max-w-7xl mx-auto flex md:flex-row justify-between items-center gap-4">
        <div>
          <Image src="/logo.svg" alt='logo' width={100} height={50} />
        </div>
        <p className="text-sm text-gray-400">
          Built with love by{' '}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white hover:text-[#6FDBB5] hover:underline transition-colors"
          >
            Sarthak and Farhat
          </a>
        </p>
      </div>
    </footer>
  );
}
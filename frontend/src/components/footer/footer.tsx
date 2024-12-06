"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-4 py-2 fixed bottom-0 w-full border-t border-[#1E1E21] z-30 backdrop-blur-lg bg-[#111015aa]">
      <div className="w-full flex md:flex-row justify-between items-center gap-4">
        <div>
          <Image src="/logo.svg" alt="logo" width={100} height={50} />
        </div>
        <p className="text-sm text-gray-400">
          Built with love by{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#6FDBB5] hover:underline transition-colors"
          >
            Sarthak and Farhat
          </a>{" "}
          and Diffie-Hellman
        </p>
      </div>
    </footer>
  );
}

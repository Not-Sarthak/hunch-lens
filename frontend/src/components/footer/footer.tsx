"use client";

import { GITHUB_LINK, TWITTER_LINK } from 'src/links';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';

const docLinks = [
  { href: GITHUB_LINK, title: 'Github' },
  { href: TWITTER_LINK, title: 'X' },
];

export default function Footer() {
  return (
    <footer className="mt-auto px-4 py-2 bg-[#111015]">
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
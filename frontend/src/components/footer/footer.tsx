"use client";

import { GITHUB_LINK, TWITTER_LINK } from 'src/links';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';

const docLinks = [
  { href: GITHUB_LINK, title: 'Github' },
  { href: TWITTER_LINK, title: 'X' },
];

export default function Footer() {
  return (
    <footer className="mt-auto px-4 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          Built with love by{' '}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white hover:text-indigo-400 transition-colors"
          >
            Hunch
          </a>
        </p>
        
        <ul className="flex items-center gap-6">
          {docLinks.map(({ href, title }) => (
            <li key={href}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                title={title}
                className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {title}
                <ArrowUpRightIcon size={16} />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
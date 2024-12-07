"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={
        pathname !== "/"
          ? "px-4 py-2 fixed bottom-0 w-full border-t border-[#1E1E21] z-30 backdrop-blur-lg bg-[#111015aa]"
          : "max-w-landing px-4 py-4 w-full border-t border-x border-[#1E1E21] z-30 backdrop-blur-lg bg-[#111015] bg-opacity-80 rounded-t-2xl mt-4"
      }
    >
      <div className="flex items-center justify-between w-full gap-4 md:flex-row">
        <div>
          <Image src="/logo.svg" alt="logo" width={100} height={50} />
        </div>
        <p className="text-sm font-light text-[#787878]">
          Built with love by{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-[#6FDBB5] hover:underline transition-colors"
          >
            Sarthak and Farhat
          </a>{" "}
          and Diffie-Hellman
        </p>
      </div>
    </motion.footer>
  );
}

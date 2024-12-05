"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import WalletWrapper from "src/components/WalletWrapper";
import Image from "next/image";

interface NavItem {
  label: string;
  path: string;
}

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  index: number;
  path: string;
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  activeTab: number | null;
}

const Tab: React.FC<TabProps> = ({
  index,
  path,
  children,
  setPosition,
  setActiveTab,
  activeTab,
}) => {
  const router = useRouter();
  const ref = useRef<HTMLLIElement | null>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
    setActiveTab(index);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <li
      id={`tab-${index}`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative z-10 block cursor-pointer px-4 py-2 transition-colors duration-200 ${
        activeTab === index ? "text-white" : "text-gray-400"
      }`}
      role="tab"
      aria-selected={activeTab === index}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(path);
        }
      }}
    >
      <span className="pointer-events-none">{children}</span>
    </li>
  );
};

const navigationItems: NavItem[] = [
  { label: "⚡️Hunch", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeTab, setActiveTab] = useState<number | null>(() => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.path === pathname
    );
    return currentIndex !== -1 ? currentIndex : null;
  });

  const handleMouseLeave = () => {
    setPosition((prev) => ({ ...prev, opacity: 0 }));
    setActiveTab(null);
  };

  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && pathname === "/") {
      router.push("/launch-ai");
    }
  }, [isConnected, pathname, router]);

  return (
    <nav className="absolute top-4 left-0 right-0 z-20 px-4 text-white pb-3 border-b-[1px] border-[#1E1E21]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={100} height={40} />
        </div>

        <div className="relative flex-1 flex justify-center z-30">
          <ul
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit rounded-xl p-1 border border-green-300 bg-gradient-to-r from-[#26262A] to-[#16151A]"
          >
            {navigationItems.map((item, index) => (
              <Tab
                key={item.path}
                index={index}
                path={item.path}
                setPosition={setPosition}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
              >
                {item.label}
              </Tab>
            ))}
            <motion.li
              animate={{
                x: position.left,
                width: position.width,
                opacity: position.opacity,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="absolute z-0 h-10 rounded-xl bg-[radial-gradient(circle_at_top_center,_rgba(111,219,181,0.6)_0%,_rgba(69,161,118,0.3)_100%)] pointer-events-none"
            />
          </ul>
        </div>

        <div className="flex items-center justify-end">
          <WalletWrapper />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import WalletWrapper from "src/components/WalletWrapper";

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
        activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-300"
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
  { label: "Hunch", path: "/" },
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
    if (isConnected && pathname === '/') {
      router.push('/dashboard');
    }
  }, [isConnected, pathname, router]);

  return (
    <nav className="fixed top-4 left-0 right-0 z-20 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-1" />
        <div className="relative z-30">
          <ul
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit rounded-xl bg-gradient-to-br from-[#272A48]/30 to-[#0F0E26]/30 backdrop-blur-xl p-1 border border-gray-800"
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
              className="absolute z-0 h-10 rounded-xl bg-gradient-to-br from-[#272A48] to-[#0F0E26] pointer-events-none"
            />
          </ul>
        </div>
        <div className="flex-1 flex justify-end z-40">
          <WalletWrapper />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
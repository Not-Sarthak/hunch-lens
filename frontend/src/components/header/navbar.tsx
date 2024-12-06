"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import WalletWrapper from "src/components/WalletWrapper";
import Image from "next/image";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
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
  activeTab: number | null;
}

const Tab: React.FC<TabProps> = ({ index, path, children, activeTab }) => {
  const router = useRouter();
  const ref = useRef<HTMLLIElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(path);
  };

  const isActive = activeTab === index;

  return (
    <li
      id={`tab-${index}`}
      ref={ref}
      onClick={handleClick}
      className={`relative grid place-items-center z-10 cursor-pointer p-3 rounded-xl transition-all duration-200 outline-none ${
        isActive
          ? "bg-gradient-to-b from-[#26262A] to-[#16151A] border border-[#1E1E21]"
          : "hover:bg-[#26262A]/20 border border-transparent"
      }`}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(path);
        }
      }}
    >
      <span className={`pointer-events-none`}>
        {React.cloneElement(children as React.ReactElement, {
          className: isActive ? "active-gradient" : "text-[#737373]",
        })}
      </span>
    </li>
  );
};

const AnalyticsIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 19H5C2.79086 19 1 17.2091 1 15V1M5 12L5.61026 10.1692C6.35529 7.93413 9.52955 7.97104 10.2224 10.2228C10.8649 12.311 13.7261 12.5478 14.7032 10.5937L17 6"
        stroke={
          className === "active-gradient"
            ? "url(#analytics-gradient)"
            : "currentColor"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="analytics-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DashboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H17M1 13H17M1 1H17"
        stroke={
          className === "active-gradient"
            ? "url(#analytics-gradient)"
            : "currentColor"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="analytics-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ProfileIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        stroke={
          className === "active-gradient"
            ? "url(#analytics-gradient)"
            : "currentColor"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="analytics-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LeaderboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      stroke={
        className === "active-gradient"
          ? "url(#profile-gradient)"
          : "currentColor"
      }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 21V15C9 14.0681 9 13.6022 8.84776 13.2346C8.64477 12.7446 8.25542 12.3552 7.76537 12.1522C7.39782 12 6.93188 12 6 12C5.06812 12 4.60218 12 4.23463 12.1522C3.74458 12.3552 3.35523 12.7446 3.15224 13.2346C3 13.6022 3 14.0681 3 15V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H9ZM9 21H15M9 21V6C9 5.06812 9 4.60218 9.15224 4.23463C9.35523 3.74458 9.74458 3.35523 10.2346 3.15224C10.6022 3 11.0681 3 12 3C12.9319 3 13.3978 3 13.7654 3.15224C14.2554 3.35523 14.6448 3.74458 14.8478 4.23463C15 4.60218 15 5.06812 15 6V21M15 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11C21 10.0681 21 9.60218 20.8478 9.23463C20.6448 8.74458 20.2554 8.35523 19.7654 8.15224C19.3978 8 18.9319 8 18 8C17.0681 8 16.6022 8 16.2346 8.15224C15.7446 8.35523 15.3552 8.74458 15.1522 9.23463C15 9.60218 15 10.0681 15 11V21Z"
      />
      <defs>
        <linearGradient
          id="profile-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const navigationItems: NavItem[] = [
  { label: "⚡️Hunch", path: "/launch-ai", icon: <AnalyticsIcon /> },
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Profile", path: "/profile", icon: <ProfileIcon /> },
  { label: "Leaderboard", path: "/leaderboard", icon: <LeaderboardIcon /> },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<number | null>(() => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.path === pathname
    );
    return currentIndex !== -1 ? currentIndex : null;
  });

  const { isConnected } = useAccount();

  useLayoutEffect(() => {
    if (isConnected && pathname === "/") {
      router.push("/launch-ai");
    }
  }, [isConnected, pathname, router]);

  useEffect(() => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.path === pathname
    );
    setActiveTab(currentIndex !== -1 ? currentIndex : null);
  }, [pathname]);

  const { disconnect, connectors } = useDisconnect();
  const handleDisconnect = useCallback(() => {
    connectors.map((connector) => disconnect({ connector }));
  }, [disconnect, connectors]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 text-white py-3.5 h-20 border-b-[1px] border-[#1E1E21] backdrop-blur-lg bg-[#111015aa]">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={100} height={40} />
        </div>

        <div className="fixed top-20 left-0 w-20 h-[calc(100vh_-_5rem)] border-r border-[#1E1E21] flex-1 flex justify-center z-30 p-4 px-2">
          <ul className="relative flex flex-col gap-8 p-1 w-fit rounded-xl">
            {navigationItems.map((item, index) => (
              <Tab
                key={item.label}
                index={index}
                path={item.path}
                activeTab={activeTab}
              >
                {item.icon}
              </Tab>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="disconnect-btn" onClick={handleDisconnect}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66663 12.5833V9.66667C1.66663 7.33311 1.66663 6.16634 2.12077 5.27504C2.52024 4.49103 3.15766 3.85361 3.94167 3.45414C4.83296 3 5.99974 3 8.33329 3H11.25C12.4148 3 12.9972 3 13.4567 3.1903C14.0692 3.44404 14.5559 3.93072 14.8097 4.54329C14.9824 4.96043 14.9983 5.47895 14.9998 6.44275M1.66663 12.5833C1.66663 13.6914 1.66663 14.6621 1.98379 15.4278C2.40669 16.4488 3.21783 17.2599 4.23878 17.6828C5.00449 18 5.9752 18 7.91663 18H11.0004M1.66663 12.5833C1.66663 10.6419 1.66663 9.6712 1.98379 8.90549C2.40669 7.88453 3.21783 7.07339 4.23878 6.6505C5.00449 6.33333 5.9752 6.33333 7.91663 6.33333H12.0833C13.4449 6.33333 14.329 6.33333 14.9998 6.44275M14.9998 6.44275C15.2855 6.48934 15.5324 6.55578 15.7611 6.6505C16.7821 7.07339 17.5932 7.88453 18.0161 8.90549C18.2066 9.36533 18.2827 9.89912 18.3131 10.6727M11.6666 10.5H14.1666M14.3335 18.0002L16.3335 16.0002M16.3335 16.0002L18.3335 14.0002M16.3335 16.0002L14.3335 14.0002M16.3335 16.0002L18.3335 18.0002"
                stroke="#737373"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="pt-0.5">Disconnect</span>
          </button>

          <WalletWrapper />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

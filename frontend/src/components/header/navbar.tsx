"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectKitButton } from "connectkit";
import getProfiles from "src/utils/get-lens-profile";
import genChallenge from "src/utils/generate-challenge";
import authenticateUser, {
  getStoredId,
  getStoredToken,
} from "src/utils/authenticate-user";
import getUserFeed from "src/utils/get-user-feed";
import getPostMetadata from "src/utils/get-post-metadata";
import { Tab } from "./tab";
import { navigationItems } from "src/static";
import { ProfileIcon, HamburgerIcon } from "./tab-icons";
import { MobileTab } from "./mobile-tab";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLensAuthenticated, setIsLensAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [activeTab, setActiveTab] = useState<number | null>(() => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.path === pathname
    );
    return currentIndex !== -1 ? currentIndex : null;
  });

  const { isConnected } = useAccount();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    getPostMetadata("0x09b42e-0x01-DA-fdec7ac8");
    const checkLensAuth = () => {
      const token = getStoredToken();
      setIsLensAuthenticated(!!token);
      const profileId = getStoredId();
      if (profileId) {
        getUserFeed(profileId);
      }
    };

    checkLensAuth();
  }, [address]);

  useLayoutEffect(() => {
    if (isConnected && pathname === "/") {
      router.push("/dashboard");
    }
  }, [isConnected, pathname, router]);

  useEffect(() => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.path === pathname
    );
    setActiveTab(currentIndex !== -1 ? currentIndex : null);
  }, [pathname]);

  const handleLensSignIn = async () => {
    try {
      const ownedProfiles = await getProfiles(address as string);
      console.log("Lens Profiles:", ownedProfiles);

      if (!ownedProfiles || ownedProfiles.length === 0) {
        console.error("No Lens Profiles Found");
        return;
      }

      const challengeResult = await genChallenge(
        ownedProfiles[0].linkedTo.nftTokenId,
        address as string
      );
      console.log("Challenge Generated Successfully");

      const signature = await signMessageAsync({
        account: address,
        message: challengeResult.text,
      });
      console.log("Message Signed Successfully");

      const authResult = await authenticateUser(
        challengeResult.id,
        signature,
        ownedProfiles[0].linkedTo.nftTokenId
      );
      console.log("Lens Authentication Successful");
      await getUserFeed(ownedProfiles[0].linkedTo.nftTokenId);

      if (authResult) {
        setIsLensAuthenticated(true);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error signing in with Lens:", error);
      setIsLensAuthenticated(false);
    }
  };

  const handleProfileClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    router.push("/profile");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={
          pathname !== "/"
            ? "fixed top-0 left-0 right-0 z-20 text-white py-3.5 h-20 border-b-[1px] border-[#1E1E21] backdrop-blur-lg bg-[#111015aa]"
            : "max-w-landing bg-[#111015] z-20 text-white pt-3.5 h-20 border-[#1E1E21] backdrop-blur-lg border-x rounded-t-2xl"
        }
      >
        <div
          className={
            pathname !== "/"
              ? "flex items-center justify-between px-4"
              : "flex items-center justify-between px-4 pb-3.5 border-b-[1px] border-[#1E1E21] mx-4"
          }
        >
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={100} height={40} />
          </div>

          {/* Desktop Sidebar - unchanged */}
          {pathname !== "/" && (
            <div className="fixed hidden lg:flex top-20 left-0 w-20 h-[calc(100vh_-_5rem)] border-r border-[#1E1E21] flex-1 justify-center z-30 p-4 px-2">
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
          )}

          <div className="flex items-center justify-end gap-4">
            {/* Mobile hamburger menu button */}
            <div className="lg:hidden">
              <HamburgerIcon
                isOpen={isMobileMenuOpen}
                toggle={toggleMobileMenu}
              />
            </div>

            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {address && (
                <button
                  className={`disconnect-btn ${isLensAuthenticated ? "bg-green-500/10" : ""}`}
                  onClick={
                    isLensAuthenticated ? handleProfileClick : handleLensSignIn
                  }
                >
                  {isLensAuthenticated ? (
                    <ProfileIcon className="active-gradient" />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.66663 12.5833V9.66667C1.66663 7.33311 1.66663 6.16634 2.12077 5.27504C2.52024 4.49103 3.15766 3.85361 3.94167 3.45414C4.83296 3 5.99974 3 8.33329 3H11.25C12.4148 3 12.9972 3 13.4567 3.1903C14.0692 3.44404 14.5559 3.93072 14.8097 4.54329C14.9824 4.96043 14.9983 5.47895 14.9998 6.44275M1.66663 12.5833C1.66663 13.6914 1.66663 14.6621 1.98379 15.4278C2.40669 16.4488 3.21783 17.2599 4.23878 17.6828C5.00449 18 5.9752 18 7.91663 18H11.0004M1.66663 12.5833C1.66663 10.6419 1.66663 9.6712 1.98379 8.90549C2.40669 7.88453 3.21783 7.07339 4.23878 6.6505C5.00449 6.33333 5.9752 6.33333 7.91663 6.33333H12.0833C13.4449 6.33333 14.329 6.33333 14.9998 6.44275M14.9998 6.44275C15.2855 6.48934 15.5324 6.55578 15.7611 6.6505C16.7821 7.07339 17.5932 7.88453 18.0161 8.90549C18.2066 9.36533 18.2827 9.89912 18.3131 10.6727M11.6666 10.5H14.1666M14.3335 18.0002L16.3335 16.0002M16.3335 16.0002L18.3335 14.0002M16.3335 16.0002L14.3335 14.0002M16.3335 16.0002L18.3335 18.0002"
                        stroke={"#737373"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <span className="pt-0.5">
                    {isLensAuthenticated ? "Profile" : "Sign In With Lens"}
                  </span>
                </button>
              )}
              {pathname === "/" ? <ConnectKitButton /> : <ConnectKitButton />}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            ></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-[300px] bg-[#16151A] border-l border-[#1E1E21] overflow-y-auto"
            >
              {/* SVG Gradient Definitions for Mobile Menu */}
              <svg width="0" height="0" className="absolute">
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

              <div className="p-6 flex flex-col h-full">
                <div className="mb-8 flex justify-end">
                  <button
                    onClick={toggleMobileMenu}
                    className="text-white p-2"
                    aria-label="Close menu"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-1">
                  <h3 className="text-[#737373] uppercase text-xs font-semibold mb-4 tracking-wider">
                    Navigation
                  </h3>
                  <ul className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <MobileTab
                        key={item.label}
                        item={item}
                        isActive={activeTab === index}
                        onClick={() => {
                          router.push(item.path);
                          setIsMobileMenuOpen(false);
                        }}
                      />
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-[#1E1E21] space-y-4">
                  {address && (
                    <button
                      className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                        isLensAuthenticated
                          ? "bg-green-500/10"
                          : "bg-[#26262A]/20"
                      }`}
                      onClick={() => {
                        isLensAuthenticated
                          ? handleProfileClick()
                          : handleLensSignIn();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {isLensAuthenticated ? (
                        <ProfileIcon className="active-gradient" />
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.66663 12.5833V9.66667C1.66663 7.33311 1.66663 6.16634 2.12077 5.27504C2.52024 4.49103 3.15766 3.85361 3.94167 3.45414C4.83296 3 5.99974 3 8.33329 3H11.25C12.4148 3 12.9972 3 13.4567 3.1903C14.0692 3.44404 14.5559 3.93072 14.8097 4.54329C14.9824 4.96043 14.9983 5.47895 14.9998 6.44275M1.66663 12.5833C1.66663 13.6914 1.66663 14.6621 1.98379 15.4278C2.40669 16.4488 3.21783 17.2599 4.23878 17.6828C5.00449 18 5.9752 18 7.91663 18H11.0004M1.66663 12.5833C1.66663 10.6419 1.66663 9.6712 1.98379 8.90549C2.40669 7.88453 3.21783 7.07339 4.23878 6.6505C5.00449 6.33333 5.9752 6.33333 7.91663 6.33333H12.0833C13.4449 6.33333 14.329 6.33333 14.9998 6.44275M14.9998 6.44275C15.2855 6.48934 15.5324 6.55578 15.7611 6.6505C16.7821 7.07339 17.5932 7.88453 18.0161 8.90549C18.2066 9.36533 18.2827 9.89912 18.3131 10.6727M11.6666 10.5H14.1666M14.3335 18.0002L16.3335 16.0002M16.3335 16.0002L18.3335 14.0002M16.3335 16.0002L14.3335 14.0002M16.3335 16.0002L18.3335 18.0002"
                            stroke={"#737373"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <span className="text-white">
                        {isLensAuthenticated ? "Profile" : "Sign In With Lens"}
                      </span>
                    </button>
                  )}
                  <div className="w-full">
                    <ConnectKitButton />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

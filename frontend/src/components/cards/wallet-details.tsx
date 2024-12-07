"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import TimeframeDropdown from "../dropdown/time-frame-dropdown";

interface WalletDetailsProps {
  balance: number;
  base: number;
  usdc: number;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({
  balance,
  base,
  usdc,
}) => {
  const { address } = useAccount();
  
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last Week");
  const [investedCasts, setInvestedCasts] = useState(0);

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    const incrementInvestedCasts = () => {
      setInvestedCasts((prev) => prev + 1);
      const randomDelay = Math.random() * (3000 - 1000) + 1000; 
      setTimeout(incrementInvestedCasts, randomDelay);
    };

    const initialTimeout = setTimeout(incrementInvestedCasts, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div className="p-[1px] rounded-lg">
      <div className="text-gray-300 py-8 w-full font-helvetica rounded-lg">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[16.80px] mb-4">
              Your Wallet / Balance
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-2xl">
                {formatAddress(address)}
              </span>
              <span className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-[44px] leading-[44px]">
                / {formatCurrency(balance)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="">
              <div className="text-white text-base font-light font-helvetica capitalize leading-tight">
                $ETH
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] mt-2 font-normal">
                {formatCurrency(base)}
              </div>
            </div>

            <div className="">
              <div className="text-white text-base font-light font-helvetica capitalize leading-tight">
                $USDC
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] mt-2 font-normal">
                {formatCurrency(usdc)}
              </div>
            </div>

            <div className="">
              <div className="text-white text-base font-light font-helvetica capitalize leading-tight">
                Invested Casts
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] mt-2 font-normal">
                {investedCasts}
              </div>
            </div>

            <div className="relative ml-8">
              <TimeframeDropdown
                value={selectedTimeframe}
                onChange={setSelectedTimeframe}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;

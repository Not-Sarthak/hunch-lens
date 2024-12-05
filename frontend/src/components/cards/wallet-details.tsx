"use client";

import React, { useState } from "react";
import { useAccount } from 'wagmi';
import TimeframeDropdown from "../dropdown/time-frame-dropdown";

interface WalletDetailsProps {
  balance: number;
  base: number;
  usdc: number;
  investedCasts: number;
  timeframe?: "Last Week" | "Last Month" | "Last Year";
}

const WalletDetails: React.FC<WalletDetailsProps> = ({
  balance,
  base,
  usdc,
  investedCasts,
}) => {
  const { address } = useAccount();
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last Week");

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

  return (
    <div className="p-[1px] bg-gradient-to-b from-[#26262A] to-[#16151A] rounded-lg">
      <div className="bg-[#16151A] text-gray-300 px-32 py-16 w-full font-inter rounded-lg">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-neutral-500 text-sm font-normal font-inter leading-[16.80px]">
              Your Wallet / Balance
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-2xl">{formatAddress(address)}</span>
              <span className="bg-gradient-to-r from-[#6FDBB5] to-[#5BC49E] inline-block text-transparent bg-clip-text font-semibold text-[44px] leading-[44px]">
                / {formatCurrency(balance)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <div className="text-white text-base font-light font-inter capitalize leading-tight">
                $ETH
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] font-normal">
                {formatCurrency(base)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-white text-base font-light font-inter capitalize leading-tight">
                $USDC
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] font-normal">
                {formatCurrency(usdc)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-white text-base font-light font-inter capitalize leading-tight">
                Invested Casts
              </div>
              <div className="text-neutral-500 text-sm leading-[16.80px] font-normal">
                {investedCasts}
              </div>
            </div>

            <div className="relative">
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
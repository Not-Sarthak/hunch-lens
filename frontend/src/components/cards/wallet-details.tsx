"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import TimeframeDropdown from "../dropdown/time-frame-dropdown";
import { formatAddress, formatCurrency } from "src/utils/format-functions";

interface WalletDetailsProps {
  balance: number;
  base: number;
  usdc: number;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ balance, base, usdc }) => {
  const { address } = useAccount();
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last Week");

  return (
    <div className="rounded-lg w-full border border-[#1E1E21]">
      <div className="px-5 py-5 w-full bg-gradient-to-b from-[#26262A] to-[#16151A] font-helvetica rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <div className="text-[#787878] text-sm font-normal">
              Your Wallet / Balance
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-white text-xl sm:text-2xl font-medium">{formatAddress(address)}</span>
              <span className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-3xl sm:text-[44px] leading-[36px] sm:leading-[44px]">
                / {formatCurrency(balance)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-2 sm:mt-0">
            <div className="min-w-[80px]">
              <div className="text-white text-base font-medium">ETH</div>
              <div className="text-[#787878] text-sm mt-1">{formatCurrency(base)}</div>
            </div>

            <div className="min-w-[80px]">
              <div className="text-white text-base font-medium">USDC</div>
              <div className="text-[#787878] text-sm mt-1">{formatCurrency(usdc)}</div>
            </div>

            <div className="min-w-[80px]">
              <div className="text-white text-base font-medium">Invested Posts</div>
              <div className="text-[#787878] text-sm mt-1">10</div>
            </div>

            <div className="relative hidden md:block pl-2 sm:pl-4 ml-0 sm:ml-4 border-l border-[#1E1E21]">
              <TimeframeDropdown value={selectedTimeframe} onChange={setSelectedTimeframe} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;

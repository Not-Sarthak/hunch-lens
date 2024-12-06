"use client";

import WalletDetails from "src/components/cards/wallet-details";
import MarketBanner from "src/components/cards/market-banner";
import TabbedNavigation from "src/components/header/tabbed-navigation";
import Trending from "src/components/sections/trending";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="min-h-screen bg-[#111015] flex justify-center"
    >
      <div className="max-w-7xl w-full py-20">
        <div className="pt-4 pb-6 border-[#1E1E21] border-b-[1px]">
          <WalletDetails
            balance={1234.56}
            base={789.1}
            usdc={456.78}
            investedCasts={42}
          />
        </div>
        <div className="py-6 w-full flex gap-8">
          <div className="w-2/3 flex flex-col gap-4">
            <div>
              <MarketBanner />
            </div>
            <div>
              <Trending />
            </div>
          </div>
          <div className="w-1/3">
            <TabbedNavigation />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

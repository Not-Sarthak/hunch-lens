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
      <div className="w-full py-24 px-4 md:px-6 lg:pl-20 lg:pr-6 max-w-7xl">
        <div className="pt-4 pb-6 border-[#1E1E21] border-b-[1px]">
          <WalletDetails
            balance={1234.56}
            base={789.1}
            usdc={456.78}
          />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 py-6">
          <div className="flex flex-col w-full lg:w-2/3 gap-4">
            <div>
              <MarketBanner />
            </div>
            <div>
              <Trending />
            </div>
          </div>
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <TabbedNavigation />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

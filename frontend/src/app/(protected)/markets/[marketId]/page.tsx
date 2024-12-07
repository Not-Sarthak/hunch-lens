"use client";

import { motion } from "framer-motion";
import MarketSection from "src/components/sections/market";

interface MarketPageProps {
  params: {
    marketId: string;
  };
}

const MarketPage: React.FC<MarketPageProps> = ({ params }) => {
  const { marketId } = params;

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
      className="flex items-center justify-center w-full py-32 pl-20"
    >
      <MarketSection marketId={marketId} />
    </motion.div>
  );
};

export default MarketPage;

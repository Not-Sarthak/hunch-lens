import React, { useEffect, useState } from "react";
import { backendUrl } from "src/constants";

interface Market {
  id: number;
  type: string;
  url: string;
  data: string;
  publicAddress: string;
  createdAt: string;
}

interface MarketResponse {
  success: boolean;
  market: Market;
}

const MarketSection = ({ marketId }: { marketId: string }) => {
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/tokenization/markets/${marketId}`
        );
        const data = await response.json();
        if (data.success && data.market) {
          setMarket(data.market);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market:", error);
        setLoading(false);
      }
    };

    fetchMarket();
  }, [marketId]);

  if (loading) {
    return (
      <div className="relative w-full max-w-4xl overflow-hidden bg-gray-900 rounded-xl animate-pulse">
        <div className="bg-gray-800 h-96"></div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="w-full max-w-4xl p-6 text-red-400 bg-gray-900 rounded-xl">
        Error fetching market data!
      </div>
    );
  }

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
    <div className="w-full p-6 mx-24 text-white rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#787878]">Cast trends</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-white">
              {formatAddress(market.publicAddress)}
            </span>
            <span className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-[44px] leading-[44px]">
              / {formatCurrency(353.35)}
            </span>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-sm ">Type</div>
            <div className="text-[#787878]">{market.type}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Created</div>
            <div className="text-[#787878]">
              {new Date(market.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Graph Area - Left Column */}
        <div className="h-64 col-span-2 p-4 bg-gray-800 rounded-lg">
          <div className="w-full h-full rounded bg-gradient-to-b from-green-500/20 to-transparent"></div>
        </div>

        {/* Transaction Panel - Right Column */}
        <div className="p-4 bg-transparent rounded-lg">
          <div className="flex justify-between mb-4">
            <button className="px-6 py-2 bg-gray-700 rounded-lg">Buy</button>
            <button className="px-6 py-2 text-[#787878]">Sell</button>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-[#787878]">Balance: 0 SOL</div>
            <input
              type="number"
              placeholder="0.00"
              className="w-full p-2 text-white bg-gray-700 rounded"
            />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#787878]">Subtotal</span>
                <span>$0.01</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#787878]">Network Fee</span>
                <span>$0.11</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#787878]">Additional</span>
                <span>$0.087</span>
              </div>
            </div>
            <button className="w-full py-2 mt-4 text-black bg-white rounded-lg">
              Buy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[#787878] text-sm">URL: {market.url}</p>
      </div>
    </div>
  );
};

export default MarketSection;

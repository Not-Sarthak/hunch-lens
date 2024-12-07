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

const BuyScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p>Buy</p>
        <div className="text-sm text-[#787878]">Balance: 0.01 ETH</div>
      </div>
      <input
        type="number"
        placeholder="0.00"
        className="w-full px-3 py-4 text-white border border-[#16151A] bg-transparent rounded"
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
      <button className="w-full py-3 mt-4 text-black bg-white rounded-lg">
        Buy
      </button>
    </div>
  );
};

const SellScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p>Sell</p>
        <div className="text-sm text-[#787878]">Balance: 0.01 ETH</div>
      </div>
      <input
        type="number"
        placeholder="0.00"
        className="w-full px-3 py-4 text-white border border-[#16151A] bg-transparent rounded"
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
      <button className="w-full py-3 mt-4 text-black bg-white rounded-lg">
        Sell
      </button>
    </div>
  );
};

const TransactionPanel = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  const handleTabChange = (tab: "buy" | "sell") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  return (
    <div className="bg-transparent rounded-lg">
      <div className="flex justify-between gap-4 mb-4">
        <button
          onClick={() => {
            handleTabChange("buy");
          }}
          className={`flex-1 px-6 py-3 pt-3.5 transition-all border border-[#1E1E21] ${activeTab === "buy" ? "bg-gradient-to-b from-[#26262A] to-[#16151A]" : "text-[#787878]"} rounded-lg`}
        >
          Buy
        </button>
        <button
          onClick={() => {
            handleTabChange("sell");
          }}
          className={`flex-1 px-6 py-3 pt-3.5 transition-all border border-[#1E1E21] ${activeTab === "sell" ? "bg-gradient-to-b from-[#26262A] to-[#16151A]" : "text-[#787878]"} rounded-lg`}
        >
          Sell
        </button>
      </div>

      {activeTab === "buy" ? <BuyScreen /> : <SellScreen />}
    </div>
  );
};

const GraphContent = () => {
  return (
    <div className="col-span-2 p-4 border border-[#1E1E21] rounded-lg">
      <div className="w-full h-full rounded bg-gradient-to-b from-green-500/20 to-transparent"></div>
    </div>
  );
};

const CastContent = ({ data }: { data: string }) => {
  const parseData = (rawData: string) => {
    const lines = rawData.split("\n");
    const parsed: Record<string, string> = {};

    lines.forEach((line) => {
      const match = line.match(/\s*(.*?):\s*(.*?)\s*,?\s*$/);
      if (match) {
        parsed[match[1].trim()] = match[2].trim();
      }
    });
    return parsed;
  };

  const parsedData = parseData(data);

  console.log(parsedData);

  return (
    <div className="col-span-1 p-4 border border-[#1E1E21] rounded-lg">
      <div className="flex flex-col items-start h-full gap-3">
        <div className="flex items-center gap-2">
          <img
            src={parsedData["Author PFP URL"]}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col items-start justify-between">
            <div className="font-medium text-white">
              {parsedData["Channel Name"]}
            </div>
            <span className="overflow-hidden text-sm text-gray-500 max-w-48 text-ellipsis text-nowrap">
              {parsedData["Author Bio"]}
            </span>
          </div>
        </div>
        <div className="flex-1 mt-2 mb-6">
          <p className="mb-4 text-white">{parsedData["Text"]}</p>

          <div className="flex items-end h-full gap-6 pb-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span>{parsedData["Replies Count"]} replies</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{parsedData["Recast Count"]} recasts</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{parsedData["Reactions Count"]} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketSection = ({ marketId }: { marketId: string }) => {
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await fetch(
          // `${backendUrl}/tokenization/markets/${marketId}`
          `${backendUrl}/tokenization/markets/3`
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
    <div className="w-full p-6 mx-16 text-white rounded-lg">
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

      <div className="grid grid-cols-4 gap-6">
        <CastContent data={market.data} />
        <GraphContent />

        <TransactionPanel />
      </div>

      <div className="mt-6">
        {/* <p className="text-[#787878] text-sm">
          URL:{" "}
          <a target="_blank" href={market.url} className="hover:underline">
            {market.url}
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default MarketSection;

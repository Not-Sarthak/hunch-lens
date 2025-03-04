import React, { useEffect, useState } from "react";
import { publicClient } from "src/utils/transactions";
import { marketFactoryAbi, marketFactoryAddress } from "src/constants";
import { getContract } from "viem";
import { TransactionPanel } from "../cards/transaction-panel";
import { formatAddress } from "src/utils/format-functions";
import { formatCurrency } from "src/utils/format-functions";
import { GraphContent } from "../cards/graph-content";
import CastContent from "../cards/cast-content";

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  imageURI: string;
  text: string;
  postId: string;
}

interface Market {
  id: number;
  type: string;
  url: string;
  data: string;
  publicAddress: string;
  createdAt: string;
}

const MarketSection = ({ marketId }: { marketId: string }) => {
  const [market, setMarket] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const contract = getContract({
          address: marketFactoryAddress,
          abi: marketFactoryAbi,
          client: publicClient,
        });

        const allTokens = await contract.read.getLaunchedTokens();
        const marketData = allTokens.find(
          (token) => token.tokenAddress.toLowerCase() === marketId.toLowerCase()
        );

        if (marketData) {
          setMarket(marketData);
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

  return (
    <div className="w-full p-6 mx-16 text-white rounded-lg">
      <div className="flex items-center bg-[#16151A] rounded-lg p-4 border border-[#1E1E21] justify-between mb-6">
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#787878]">Cast trends</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-white">
              {market.name}
            </span>
            <span className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-[44px] leading-[44px]">
              / {formatCurrency(353.35)}
            </span>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-sm">Symbol</div>
            <div className="text-[#787878]">{market.symbol}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Contract</div>
            <div className="text-[#787878]">{formatAddress(market.tokenAddress)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <CastContent market={market} />
        <GraphContent />
        <TransactionPanel marketId={marketId} />
      </div>
    </div>
  );
};

export default MarketSection;

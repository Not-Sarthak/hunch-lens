"use client";

import { useState, useEffect } from "react";
import { buyPost, sellPost, getTokenPrice } from "src/utils/transactions";
import { toast } from "sonner";

interface TransactionPanelProps {
  marketId: string;
}

const formatErrorMessage = (error: any): string => {
  const message = error?.message || "Transaction failed";
  
  if (message.includes("chain") && message.includes("match")) {
    return "Please switch to Lens Testnet Network";
  }

  if (message.length > 60) {
    return message.substring(0, 60) + "...";
  }

  return message;
};

export const TransactionPanel = ({ marketId }: TransactionPanelProps) => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("0.01");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const tokenPrice = await getTokenPrice(marketId as `0x${string}`);
        setPrice(tokenPrice);
      } catch (error: any) {
        console.error("Error fetching price:", error);
        toast.error(formatErrorMessage(error));
      }
    };
    fetchPrice();
  }, [marketId]);

  const handleTabChange = (tab: "buy" | "sell") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const handleTransaction = async () => {
    if (!amount || isLoading) return;
    
    setIsLoading(true);
    try {
      if (activeTab === "buy") {
        await buyPost({
          contractAddress: marketId as `0x${string}`,
          amount,
        });
        toast.success("Successfully bought tokens!");
      } else {
        await sellPost({
          contractAddress: marketId as `0x${string}`,
          amount,
        });
        toast.success("Successfully sold tokens!");
      }
      setAmount("");
    } catch (error: any) {
      console.error("Transaction error:", error);
      toast.error(formatErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSubtotal = () => {
    const numAmount = parseFloat(amount) || 0;
    const numPrice = parseFloat(price) || 0.01;
    return (numAmount * numPrice).toFixed(2);
  };

  return (
    <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-xl">
      {/* Tab Navigation */}
      <div className="flex justify-between gap-4 mb-6 bg-zinc-800/30 rounded-xl p-1">
        {["buy", "sell"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab as "buy" | "sell")}
            className={`
              flex-1 py-3 rounded-lg text-sm font-medium uppercase tracking-wider
              transition-all duration-300 ease-in-out
              ${
                activeTab === tab
                  ? "bg-zinc-700/70 text-white shadow-md"
                  : "text-zinc-500 hover:bg-zinc-800/50"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white/90">
            {activeTab === "buy" ? "Buy Tokens" : "Sell Tokens"}
          </h3>
          <div className="text-sm text-zinc-400">
            Price: <span className="text-white font-medium">{price} $GRASS</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="
              w-full px-4 py-4 
              bg-zinc-800/50 
              border border-zinc-700/50 
              rounded-xl 
              text-white 
              focus:outline-none 
              focus:ring-2 
              focus:ring-zinc-600
              transition-all
              duration-300
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
            "
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">$GRASS</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Subtotal</span>
            <span className="text-white/90">${calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Network Fee</span>
            <span className="text-white/90">$0.11</span>
          </div>
          <div className="border-t border-zinc-800/50 pt-3 mt-3 flex justify-between font-semibold">
            <span className="text-zinc-400">Total</span>
            <span className="text-white">${(parseFloat(calculateSubtotal()) + 0.11).toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handleTransaction}
          disabled={isLoading || !amount}
          className="
            w-full py-4 
            bg-white 
            text-black 
            rounded-xl 
            font-bold 
            uppercase 
            tracking-wider
            transition-all 
            duration-300 
            hover:bg-zinc-200
            disabled:opacity-50 
            disabled:cursor-not-allowed
            group
          "
        >
          <span className="transition-all duration-300 group-hover:tracking-widest">
            {isLoading ? "Processing..." : activeTab === "buy" ? "Buy Tokens" : "Sell Tokens"}
          </span>
        </button>
      </div>
    </div>
  );
};
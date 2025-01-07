"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { buyPost } from "src/utils/transactions";
import { toast } from "sonner";

interface TokenizedPost {
  imageURI: string;
  name: string;
  postId: string;
  symbol: string;
  text: string;
  tokenAddress: string;
}

interface CastCardProps {
  post: TokenizedPost;
}

const CastCard = ({ post }: CastCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleBuyPost = async () => {
    try {
      setIsLoading(true);
      const tx = await buyPost({
        contractAddress: post.tokenAddress,
        amount: "5"
      });
      console.log("Buy transaction:", tx);
      
      toast.success("Successfully bought tokens!", {
        description: (
          <div className="flex items-center gap-2">
            <a 
              href={`https://block-explorer.testnet.lens.dev/tx/${tx}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6FDBB5] hover:text-[#5FC9A3] underline transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://block-explorer.testnet.lens.dev/tx/${tx}`, '_blank');
              }}
            >
              View Transaction
            </a>
          </div>
        ),
        duration: 5000,
      });
    } catch (error) {
      console.error("Error buying tokens:", error);
      toast.error("Failed to buy tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="relative w-full bg-[#111015] border-[1px] border-[#1E1E21] rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-neutral-50 text-sm font-medium font-helvetica leading-[18.20px]">
                {post.name.toLocaleLowerCase()}
              </div>
              <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[18.20px]">
                ${post.symbol}
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 py-2 text-base font-normal leading-tight text-neutral-50 font-helvetica">
          {post.text}
        </div>
      </div>

      {post.imageURI && (
        <div className="px-4 pb-4">
          <div className="relative w-full overflow-hidden rounded-lg h-[400px]">
            <Image
              src={post.imageURI}
              alt="Post media"
              fill
              className="object-cover object-top rounded-lg"
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 rounded-t-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <button 
                className="w-full py-2 mt-4 text-black transition-colors bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleBuyPost}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Buying...
                  </>
                ) : (
                  <>
                    Buy ${post.symbol.toLocaleLowerCase()}
                  </>
                )}
              </button>
              <button
                onClick={() => router.push(`/markets/${post.tokenAddress}`)}
                className="w-full flex items-center gap-2 justify-center mt-4 py-2 bg-gradient-to-b from-[#26262A] to-[#16151A] text-[#737373] rounded-lg transition-colors"
              >
                View Details <MoveUpRight />
              </button>
            </div>
            
            <div className="mt-2 text-sm text-center text-neutral-400">
              Contract: {post.tokenAddress.slice(0, 6)}...{post.tokenAddress.slice(-4)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CastCard;
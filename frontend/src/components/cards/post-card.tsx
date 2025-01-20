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
  const [isExpanded, setIsExpanded] = React.useState(false);
  const router = useRouter();

  const truncateAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const truncateText = (text: string, maxLength: number) => 
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const handleBuyPost = async () => {
    try {
      setIsLoading(true);
      const tx = await buyPost({
        contractAddress: post.tokenAddress,
        amount: "5"
      });
      
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neutral-50 text-sm font-medium">
              {truncateText(post.name.toLowerCase(), 20)}
            </span>
            <span className="text-neutral-500 text-sm">
              ${post.symbol}
            </span>
          </div>
          <span className="text-neutral-500 text-xs">
            {truncateAddress(post.tokenAddress)}
          </span>
        </div>

        <div 
          className={`px-1 py-2 text-base text-neutral-50 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {post.text}
        </div>
        
        {post.text.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-400 text-sm hover:text-neutral-200 transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {post.imageURI && (
        <div className="px-4 pb-4">
          <div className="relative w-full overflow-hidden rounded-lg h-64">
            <Image
              src={post.imageURI}
              alt="Post media"
              fill
              className="object-cover"
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
            className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center justify-center w-1/2 gap-2 px-4 py-2 text-black transition-colors bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleBuyPost}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Buying...</span>
                  </>
                ) : (
                  // `Buy ${truncateText(post.symbol.toLowerCase(), 4)}`
                  `Buy It`
                )}
              </button>
              <button
                onClick={() => router.push(`/markets/${post.tokenAddress}`)}
                className="flex items-center justify-center w-1/2 gap-2 px-4 py-2 text-neutral-400 transition-colors rounded-lg bg-gradient-to-b from-[#26262A] to-[#16151A] hover:text-neutral-300"
              >
                <span>Details</span>
                <MoveUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CastCard;
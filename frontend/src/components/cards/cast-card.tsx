"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CastData {
  id: number;
  hash: string;
  text: string;
  embeds: {
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  author: {
    username: string;
    displayName: string;
    pfp: {
      url: string;
      verified: boolean;
    };
    bio: {
      text: string;
    };
    connectedAddress: string;
  };
  replies: { count: number };
  reactions: { count: number };
  recasts: { count: number };
}

interface CastCardProps {
  data: CastData;
}

const CastCard = ({ data }: CastCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const router = useRouter();

  return (
    <motion.div
      className="relative w-full bg-[#111015] border-[1px] border-[#1E1E21] rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
            {data.author.pfp.url && (
              <Image
                src={data.author.pfp.url}
                alt={`${data.author.username}'s profile picture`}
                width={40}
                height={40}
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-neutral-50 text-sm font-medium font-helvetica leading-[18.20px]">
                {data.author.displayName}
              </div>
              <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[18.20px]">
                @{data.author.username}
              </div>
            </div>
            <div className="pt-1 text-xs font-medium leading-none text-neutral-500 font-helvetica">
              {data.author.bio.text.length > 80
                ? `${data.author.bio.text.slice(0, 80)}...`
                : data.author.bio.text}
            </div>
            {/* <div className="text-sm text-gray-400">
               {`${data.author.connectedAddress.slice(0, 6)}...${data.author.connectedAddress.slice(-4)}`}
             </div> */}
          </div>
        </div>
        <div className="px-1 py-2 text-base font-normal leading-tight text-neutral-50 font-helvetica">
          {data.text}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ height: "150px" }}
        >
          <div className="flex h-full gap-4">
            {data.embeds.images.map((image, index) => (
              <div key={index} className="relative flex-1 min-w-0">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111015]/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 rounded-t-xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-6 text-white">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/usdc-icon.svg"
                  alt="$"
                  width={25}
                  height={25}
                />
                <span>42.5</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/reply.svg"
                  alt="reply"
                  width={25}
                  height={25}
                />
                <span>{data.replies.count}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/recast.svg"
                  alt="recast"
                  width={25}
                  height={25}
                />
                <span>{data.recasts.count}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/heart.svg"
                  alt="heart"
                  width={25}
                  height={25}
                />
                <span>{data.reactions.count}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-full py-2 mt-4 text-black transition-colors bg-white rounded-lg hover:bg-gray-100">
                Buy this cast
              </button>
              <button
                onClick={() => {
                  router.push(`/markets/${data.id}`);
                }}
                className="w-full flex items-center gap-2 justify-center mt-4 py-2 bg-gradient-to-b from-[#26262A] to-[#16151A] text-[#737373] rounded-lg transition-colors"
              >
                View Details <MoveUpRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CastCard;

"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Platform-agnostic interfaces
interface MediaContent {
  url: string;
  alt: string;
  type: "image" | "video";
}

interface UserProfile {
  username: string;
  displayName: string;
  avatarUrl: string;
  isVerified: boolean;
  bio: string;
  walletAddress?: string;
  followerCount?: number;
  followingCount?: number;
}

interface Engagement {
  replies: number;
  likes: number;
  reposts: number;
  price?: number;
}

interface NormalizedPost {
  id: string;
  platform: "twitter" | "farcaster";
  content: {
    text: string;
    media: MediaContent[];
  };
  author: UserProfile;
  engagement: Engagement;
  timestamp?: string;
  channel?: {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    followerCount: number;
  };
}

// Parse string data into structured format
const parseTwitterString = (data: string): any => {
  const lines = data.split("\n");
  const parsed: any = {};

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();
    if (key && value) {
      parsed[key.trim()] = value;
    }
  });

  return {
    ...parsed,
    publicAddress: data.match(/publicAddress":\s*"([^"]+)/)?.[1],
  };
};

const parseFarcasterString = (data: string): any => {
  const lines = data.split(",\n");
  const parsed: any = {};

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();
    if (key && value) {
      parsed[key.trim()] = value;
    }
  });

  return parsed;
};

// Transformation functions for different platforms
const normalizeTwitterPost = (rawData: string): NormalizedPost => {
  const data = parseTwitterString(rawData);

  return {
    id: data.publicAddress || "unknown",
    platform: "twitter",
    content: {
      text: data.Text || "",
      media: [], // Twitter media handling
    },
    author: {
      username: data.Username || "",
      displayName: data.Username || "", // Using username as display name if not provided
      avatarUrl: data.Avatar || "",
      isVerified: data["Blue Verified"]?.toLowerCase() === "yes",
      bio: "", // Twitter data doesn't include bio in the string
      walletAddress: data.publicAddress,
      followerCount: 0, // Not provided in the data
      followingCount: 0, // Not provided in the data
    },
    engagement: {
      replies: parseInt(data.Replies) || 0,
      likes: parseInt(data.Likes) || 0,
      reposts: 0, // Not provided in the data
    },
    timestamp: data["Created At"],
  };
};

const normalizeFarcasterPost = (rawData: string): NormalizedPost => {
  const data = parseFarcasterString(rawData);

  return {
    id: data.Hash?.trim() || "unknown",
    platform: "farcaster",
    content: {
      text: data.Text?.trim() || "",
      media: data.Images
        ? [
            {
              url: data.Images.match(/URL: ([^,]+)/)?.[1] || "",
              alt: "Farcaster image",
              type: "image",
            },
          ]
        : [],
    },
    author: {
      username: data["Author Username"]?.trim() || "",
      displayName: data["Author Display Name"]?.trim() || "",
      avatarUrl: data["Author PFP URL"]?.trim() || "",
      isVerified: false, // Not provided in the data
      bio: data["Author Bio"]?.trim() || "",
      walletAddress: data["Author Connected Address"]?.trim(),
      followerCount: parseInt(data["Author Follower Count"]) || 0,
      followingCount: parseInt(data["Author Following Count"]) || 0,
    },
    engagement: {
      replies: parseInt(data["Replies Count"]) || 0,
      likes: parseInt(data["Reactions Count"]) || 0,
      reposts: parseInt(data["Recast Count"]) || 0,
      price: 42.5, // Keeping the hardcoded price as in original
    },
    channel: data["Channel ID"]
      ? {
          id: data["Channel ID"],
          name: data["Channel Name"],
          description: data["Channel Description"],
          logoUrl: data["Channel Logo URL"],
          followerCount: parseInt(data["Channel Follower Count"]) || 0,
        }
      : undefined,
  };
};

interface CastCardProps {
  data: string;
  platform: "twitter" | "farcaster";
  marketId: number;
}

const CastCard = ({ data, platform, marketId }: CastCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const normalizedData: NormalizedPost = React.useMemo(() => {
    return platform === "twitter"
      ? normalizeTwitterPost(data)
      : normalizeFarcasterPost(data);
  }, [data, platform]);

  return (
    <motion.div
      className="relative w-full bg-[#111015] border-[1px] border-[#1E1E21] rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
            {normalizedData.author.avatarUrl && (
              <Image
                src={normalizedData.author.avatarUrl}
                alt={`${normalizedData.author.username}'s profile picture`}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-neutral-50 text-sm font-medium font-helvetica leading-[18.20px]">
                {normalizedData.author.displayName}
              </div>
              <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[18.20px]">
                @{normalizedData.author.username}
              </div>
              {normalizedData.author.walletAddress && (
                <div className="-mx-1 text-sm text-[#787878]">
                  ·{" "}
                  {`${normalizedData.author.walletAddress.slice(0, 6)}...${normalizedData.author.walletAddress.slice(-4)}`}
                </div>
              )}
            </div>
            <div className="pt-1 text-xs font-medium leading-none text-[#787878] font-helvetica">
              {normalizedData.author.bio.length > 80
                ? `${normalizedData.author.bio.slice(0, 80)}...`
                : normalizedData.author.bio}
            </div>
          </div>
        </div>
        <div className="px-1 py-2 text-base font-normal leading-tight text-neutral-50 font-helvetica">
          {normalizedData.content.text}
        </div>
      </div>

      {normalizedData.content.media.length > 0 && (
        <div className="px-4 pb-4">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ height: "400px" }}
          >
            <div className="flex h-full gap-4">
              {normalizedData.content.media.map((media, index) => (
                <div key={index} className="relative flex-1 min-w-0">
                  <Image
                    src={media.url}
                    alt={media.alt}
                    fill
                    className="object-cover object-top rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111015]/30" />
                </div>
              ))}
            </div>
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
            <div className="flex items-center justify-center gap-6 text-white">
              {platform === "farcaster" && (
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/usdc-icon.svg"
                    alt="$"
                    width={25}
                    height={25}
                  />
                  <span>{normalizedData.engagement.price}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/reply.svg"
                  alt="reply"
                  width={25}
                  height={25}
                />
                <span>{normalizedData.engagement.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/recast.svg"
                  alt="repost"
                  width={25}
                  height={25}
                />
                <span>{normalizedData.engagement.reposts}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/heart.svg"
                  alt="heart"
                  width={25}
                  height={25}
                />
                <span>{normalizedData.engagement.likes}</span>
              </div>
            </div>

            {platform === "farcaster" && (
              <div className="flex items-center gap-4">
                <button className="w-full py-2 mt-4 text-black transition-colors bg-white rounded-lg hover:bg-gray-100">
                  Buy this post
                </button>
                <button
                  onClick={() => router.push(`/markets/${marketId}`)}
                  className="w-full flex items-center gap-2 justify-center mt-4 py-2 bg-gradient-to-b from-[#26262A] to-[#16151A] text-[#737373] rounded-lg transition-colors"
                >
                  View Details <MoveUpRight />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CastCard;

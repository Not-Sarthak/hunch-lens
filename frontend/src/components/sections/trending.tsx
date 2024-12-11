"use client";

import React, { useEffect, useState } from "react";
import CastCard from "../cards/cast-card";
import { castData } from "../../utils/cast-data";
import { toast } from "sonner";
import axios from "axios";

type PlatformType = "twitter" | "farcaster";

interface CastData {
  id: number;
  type: PlatformType;
  createdAt: string;
  url: string;
  data: string;
}

const ShimmerCard = () => (
  <div className="relative w-full max-w-2xl bg-[#16151A] rounded-xl overflow-hidden animate-pulse">
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#16151a] rounded-full" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-[#16151a] rounded" />
            <div className="w-16 h-4 bg-[#16151a] rounded" />
          </div>
          <div className="w-48 h-3 bg-[#16151a] rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 bg-[#16151a] rounded" />
        <div className="w-3/4 h-4 bg-[#16151a] rounded" />
      </div>
    </div>
    <div className="px-4 pb-4">
      <div className="relative w-full rounded-lg overflow-hidden h-[150px] bg-[#16151a]" />
    </div>
  </div>
);

const Trending = () => {
  const [casts, setCasts] = useState<CastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        const response = await axios.get(
          "https://hunch-1.onrender.com/api/tokenization/markets",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCasts(response.data.markets);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            toast.error("Authentication failed. Please login again.");
          } else if (err.response?.status === 429) {
            toast.error("Rate limit exceeded. Please try again later.");
          } else {
            toast.error("Failed to fetch trending casts");
          }
        }
        setError("Failed to fetch trending casts.");
        toast.error("Failed to fetch trending casts");
        setLoading(false);
      }
    };

    fetchCasts();
  }, []);

  return (
    <div>
      <div className="pb-4 text-base font-light leading-tight text-neutral-500 font-helvetica">
        Trending on Warpcast
      </div>
      <div className="space-y-4">
        {loading ? (
          <>
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </>
        ) : (
          casts.map((cast) => (
            <CastCard
              key={cast.url}
              platform={cast.type.toLowerCase() as PlatformType}
              data={cast.data}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;

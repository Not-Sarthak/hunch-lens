"use client";

import React, { useEffect, useState } from "react";
import CastCard from "../cards/cast-card";
import { castData } from "../../utils/cast-data";
import { toast } from "sonner";
// import axios from "axios"; // You would need this in real implementation

interface CastData {
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

const ShimmerCard = () => (
  <div className="relative w-full max-w-2xl bg-[#16151A] rounded-xl overflow-hidden animate-pulse">
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-600" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>
          <div className="h-3 w-48 bg-gray-600 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-600 rounded" />
        <div className="h-4 w-3/4 bg-gray-600 rounded" />
      </div>
    </div>
    <div className="px-4 pb-4">
      <div className="relative w-full rounded-lg overflow-hidden h-[150px] bg-gray-600" />
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
        // In a real implementation, you would use axios like this:
        // const response = await axios.get('https://api.example.com/trending-casts', {
        //   headers: {
        //     'Authorization': `Bearer ${process.env.API_KEY}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // setCasts(response.data.result.casts);

        // This is a simulation of an API call with dummy data
        const simulatedResponse = await new Promise<{
          data: { result: { casts: CastData[] } };
        }>((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                result: {
                  casts: castData.map((item) => item.result.cast),
                },
              },
            });
          }, 500)
        );

        setCasts(simulatedResponse.data.result.casts);
        setLoading(false);
      } catch (err) {
        // In a real implementation, you might want to handle specific error types:
        // if (axios.isAxiosError(err)) {
        //   if (err.response?.status === 401) {
        //     toast.error("Authentication failed. Please login again.");
        //   } else if (err.response?.status === 429) {
        //     toast.error("Rate limit exceeded. Please try again later.");
        //   } else {
        //     toast.error("Failed to fetch trending casts");
        //   }
        // }
        setError("Failed to fetch trending casts.");
        toast.error("Failed to fetch trending casts");
        setLoading(false);
      }
    };

    fetchCasts();
  }, []);

  return (
    <div>
      <div className="text-neutral-500 text-base font-light font-helvetica leading-tight pb-4">
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
          casts.map((cast) => <CastCard key={cast.hash} data={cast} />)
        )}
      </div>
    </div>
  );
};

export default Trending;

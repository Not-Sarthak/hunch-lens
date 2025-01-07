"use client";

import React, { useEffect, useState } from "react";
import CastCard from "../cards/cast-card";
import FeedCard from "../cards/feed-card";
import { toast } from "sonner";
import axios from "axios";

type PlatformType = "twitter" | "farcaster";
type TabType = "trending" | "others";

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

const TabButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-helvetica text-base transition-colors ${
      active 
        ? "text-white border-b-2 border-[#6FDBB5]" 
        : "text-neutral-500 hover:text-neutral-400"
    }`}
  >
    {children}
  </button>
);

const Trending = () => {
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  const [casts, setCasts] = useState<CastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingCasts = async () => {
    try {
      const response = await axios.get(
        "https://hunch-1.onrender.com/api/tokenization/markets",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.markets;
    } catch (err) {
      throw err;
    }
  };

  const fetchFeedCasts = async () => {
    try {
      const response = await axios.get(
        "https://hunch-1.onrender.com/api/tokenization/markets",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.markets;
    } catch (err) {
      throw err;
    }
  };

  const fetchCasts = async (tab: TabType) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = tab === "trending" 
        ? await fetchTrendingCasts()
        : await fetchFeedCasts();
      
      setCasts(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.error("Authentication failed. Please login again.");
        } else if (err.response?.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else {
          toast.error(`Failed to fetch ${tab} casts`);
        }
      }
      setError(`Failed to fetch ${tab} casts.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasts(activeTab);
  }, [activeTab]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </>
      );
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (casts.length === 0) {
      return <div className="text-neutral-500">No casts found.</div>;
    }

    if (activeTab === "trending") {
      return casts.map((cast) => (
        <CastCard
          marketId={cast.id}
          key={cast.url}
          platform={cast.type.toLowerCase() as PlatformType}
          data={cast.data}
        />
      ));
    }

    return casts.map((cast) => (
      <FeedCard
        marketId={cast.id}
        key={cast.url}
        platform={cast.type.toLowerCase() as PlatformType}
        data={cast.data}
      />
    ));
  };

  return (
    <div>
      <div className="flex border-b border-[#1C1C1F] mb-6">
        <TabButton 
          active={activeTab === "trending"} 
          onClick={() => setActiveTab("trending")}
        >
          Trending
        </TabButton>
        <TabButton 
          active={activeTab === "others"} 
          onClick={() => setActiveTab("others")}
        >
          Copy Feed
        </TabButton>
      </div>

      <div className="space-y-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Trending;
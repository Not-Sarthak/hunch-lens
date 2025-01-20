"use client";

import React, { useEffect, useState } from "react";
import CastCard from "../cards/post-card";
import { toast } from "sonner";
import { getTokenisedPosts } from "src/utils/transactions";

interface TokenizedPost {
  imageURI: string;
  name: string;
  postId: string;
  symbol: string;
  text: string;
  tokenAddress: string;
}

type TabType = "trending" | "others";

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
  const [posts, setPosts] = useState<TokenizedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getTokenisedPosts();
      console.log("Fetched tokenised posts:", result);
      //@ts-ignore
      setPosts(result);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
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

    if (posts.length === 0) {
      return <div className="text-neutral-500">No posts found.</div>;
    }

    return posts.map((post, index) => (
      <CastCard 
        key={`${post.tokenAddress}-${index}`}
        post={post}
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
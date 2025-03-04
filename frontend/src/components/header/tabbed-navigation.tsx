"use client";

import React, { useState } from "react";
import sahilLogo from "../../assets/sahil.png";
import sarthakLogo from "../../assets/sarthak.png";
import staniLogo from "../../assets/stani.png";
import fireImage from "../../assets/fire-img.png";
import Image, { StaticImageData } from "next/image";
import { ThreeDotsIcon } from "./tab-icons";

interface Tab {
  id: "onFire" | "hitAuthors" | "activeCurators";
  label: string;
}

interface TabContentProps {
  activeTab: Tab["id"];
}

interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: StaticImageData;
  };
  content: string;
  timestamp: number;
  image?: StaticImageData;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      name: "Sahil Kakwani",
      username: "@sahilkakwani9",
      avatar: sahilLogo,
    },
    content:
      "Exploring the intersection of consumer crypto reveals a future where online interactions are not just transparent but also owner...",
    timestamp: 1733511503000,
    image: fireImage,
  },
  {
    id: 2,
    author: {
      name: "Sarthak",
      username: "@sarthak13",
      avatar: sarthakLogo,
    },
    content:
      "Found this cool cat today, I psss'd at it and it meow'd back. Day made <3...",
    timestamp: 1733511503000,
  },
  {
    id: 3,
    author: {
      name: "Stani Kulechov",
      username: "@stani",
      avatar: staniLogo,
    },
    content: "Lens good",
    timestamp: 1733511503000,
  },
];

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}mins ago`;
  if (hours < 24) return `${hours}hrs ago`;
  return `${days}d ago`;
};

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <div className="text-gray-300 w-full font-helvetica rounded-xl p-4 px-6 pb-0 max-h-[11.5rem] overflow-hidden border border-[#1E1E21]">
    <div className="flex items-center gap-4 justify-between w-full">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={post.author.avatar}
          alt="icon"
          height={32}
          width={32}
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-medium">{post.author.name}</h2>
            <p className="text-[#737373] text-sm">{post.author.username}</p>
          </div>
          <p className="text-[#737373] text-sm font-medium">
            {formatTimeAgo(post.timestamp)}
          </p>
        </div>
      </div>
      <ThreeDotsIcon />
    </div>
    <p className="my-4 leading-tight text-sm sm:text-base">{post.content}</p>
    {post.image && <Image src={post.image} alt="post image" className="w-full" />}
  </div>
);

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const hitAuthorPosts = [...posts].sort((a, b) => b.id - a.id);
  const activeCuratorPosts = [posts[1], posts[0], posts[2], ...posts.slice(3)];

  switch (activeTab) {
    case "onFire":
      return <PostList posts={posts} />;
    case "hitAuthors":
      return <PostList posts={hitAuthorPosts} />;
    case "activeCurators":
      return <PostList posts={activeCuratorPosts} />;
    default:
      return null;
  }
};

const TabbedNavigation = () => {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("onFire");

  const tabs: Tab[] = [
    {
      id: "onFire",
      label: "On Fire 🔥",
    },
    {
      id: "hitAuthors",
      label: "Hit Authors 🥊",
    },
    {
      id: "activeCurators",
      label: "Active Curators 📈",
    },
  ];

  return (
    <div className="bg-[#111015] rounded-xl border border-[#1C1C1F] overflow-hidden">
      <div className="p-4 border-b border-[#1C1C1F]">
        <h2 className="text-white text-lg font-medium">Lens Feed</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex border-b border-[#1C1C1F] min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-[#6FDBB5]"
                  : "text-neutral-500 hover:text-neutral-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default TabbedNavigation;

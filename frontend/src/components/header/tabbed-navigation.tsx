"use client";

import React, { useState } from "react";
import sahilLogo from "../../assets/sahil.png";
import sarthakLogo from "../../assets/sarthak.png";
import staniLogo from "../../assets/stani.png";

import fireImage from "../../assets/fire-img.png";
import Image, { StaticImageData } from "next/image";

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

const ThreeDotsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99996 5.00001C9.53972 5.00001 9.16663 4.62691 9.16663 4.16668C9.16663 3.70644 9.53972 3.33334 9.99996 3.33334C10.4602 3.33334 10.8333 3.70644 10.8333 4.16668C10.8333 4.62691 10.4602 5.00001 9.99996 5.00001Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99996 10.8333C9.53972 10.8333 9.16663 10.4602 9.16663 10C9.16663 9.53977 9.53972 9.16668 9.99996 9.16668C10.4602 9.16668 10.8333 9.53977 10.8333 10C10.8333 10.4602 10.4602 10.8333 9.99996 10.8333Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99996 16.6667C9.53972 16.6667 9.16663 16.2936 9.16663 15.8333C9.16663 15.3731 9.53972 15 9.99996 15C10.4602 15 10.8333 15.3731 10.8333 15.8333C10.8333 16.2936 10.4602 16.6667 9.99996 16.6667Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
            <p className="text-[#737373]">{post.author.username}</p>
          </div>
          <p className="text-[#737373] text-sm font-medium">
            {formatTimeAgo(post.timestamp)}
          </p>
        </div>
      </div>
      <ThreeDotsIcon />
    </div>
    <p className="my-4 leading-tight">{post.content}</p>
    {post.image && <Image src={post.image} alt="post image" />}
  </div>
);

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);

const OnFireTabContent = () => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="text-gray-300 w-full font-helvetica rounded-xl p-4 px-6 pb-0 max-h-[11.5rem] overflow-hidden border border-[#1E1E21]"
        >
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
                  <p className="text-[#737373]">{post.author.username}</p>
                </div>
                <p className="text-[#737373] text-sm font-medium">
                  {formatTimeAgo(post.timestamp)}
                </p>
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99996 5.00001C9.53972 5.00001 9.16663 4.62691 9.16663 4.16668C9.16663 3.70644 9.53972 3.33334 9.99996 3.33334C10.4602 3.33334 10.8333 3.70644 10.8333 4.16668C10.8333 4.62691 10.4602 5.00001 9.99996 5.00001Z"
                stroke="#737373"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.99996 10.8333C9.53972 10.8333 9.16663 10.4602 9.16663 10C9.16663 9.53977 9.53972 9.16668 9.99996 9.16668C10.4602 9.16668 10.8333 9.53977 10.8333 10C10.8333 10.4602 10.4602 10.8333 9.99996 10.8333Z"
                stroke="#737373"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.99996 16.6667C9.53972 16.6667 9.16663 16.2936 9.16663 15.8333C9.16663 15.3731 9.53972 15 9.99996 15C10.4602 15 10.8333 15.3731 10.8333 15.8333C10.8333 16.2936 10.4602 16.6667 9.99996 16.6667Z"
                stroke="#737373"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="my-4 leading-tight">{post.content}</p>
          {post.image && <Image src={post.image} alt="post image" />}
        </div>
      ))}
    </div>
  );
};

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
    <div>
      <div className="flex space-x-8 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pt-4 pb-4 px-1 relative transition-colors
              ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-[#737373] hover:text-gray-300"
              }`}
          >
            <span className="flex items-center gap-2 text-sm">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute top-0 left-0 -mx-4 w-[calc(100%_+_2rem)] h-[2px] bg-white/50 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default TabbedNavigation;

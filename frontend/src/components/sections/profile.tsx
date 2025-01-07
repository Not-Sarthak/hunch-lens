import React, { useEffect, useState } from "react";
import sarthakLogo from "../../assets/sarthak.png";
import lensImage from "../../assets/lens.svg";
import Image, { StaticImageData } from "next/image";
import { useAccount, useBalance } from "wagmi";
import getProfiles from "src/utils/getLensProfile";
import RepScore from "../cards/rep-score";
import LogCard from "../cards/log-card";

interface Post {
  author: {
    name: string;
    username: string;
    avatar: StaticImageData | string;
  };
  content: string;
  timestamp: string;
}

interface Tab {
  id: "feed" | "launched" | "investment-logs";
  label: string;
}

interface TabProps {
  posts: Post[];
}

const tabs: Tab[] = [
  { id: "feed", label: "Feed" },
  { id: "launched", label: "Launched" },
  { id: "investment-logs", label: "Investment Logs" },
];

const ThreeDotsIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 5C9.54 5 9.17 4.63 9.17 4.17C9.17 3.71 9.54 3.33 10 3.33C10.46 3.33 10.83 3.71 10.83 4.17C10.83 4.63 10.46 5 10 5Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10.83C9.54 10.83 9.17 10.46 9.17 10C9.17 9.54 9.54 9.17 10 9.17C10.46 9.17 10.83 9.54 10.83 10C10.83 10.46 10.46 10.83 10 10.83Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 16.67C9.54 16.67 9.17 16.29 9.17 15.83C9.17 15.37 9.54 15 10 15C10.46 15 10.83 15.37 10.83 15.83C10.83 16.29 10.46 16.67 10 16.67Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PostCard = ({ post }: { post: Post }) => (
  <div className="bg-[#111015] rounded-lg border border-[#1C1C1F] p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={post.author.avatar}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{post.author.name}</span>
            <span className="text-[#737373]">{post.author.username}</span>
          </div>
          <span className="text-[#737373] text-sm">{post.timestamp}</span>
        </div>
      </div>
      <button className="text-[#737373] hover:text-white transition-colors">
        <ThreeDotsIcon />
      </button>
    </div>
    <p className="mt-4 text-white">{post.content}</p>
  </div>
);

const TabNavigation = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: Tab["id"]) => void;
}) => (
  <div className="flex space-x-8">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`p-4 relative ${
          activeTab === tab.id
            ? "text-white border-t border-white"
            : "text-[#737373]"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const CollectionTab = ({ posts }: TabProps) => (
  <div className="space-y-4">
    {posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </div>
);

const LaunchedTab = ({ posts }: TabProps) => (
  <div className="space-y-4">
    {posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </div>
);

interface LogItem {
  profileImage: StaticImageData;
  username: string;
  ens: string;
  timestamp: string;
  amount: number;
}

const InvestmentLogsTab = () => {
  const logsData: LogItem[] = [
    {
      profileImage: lensImage,
      username: "sarthak13",
      ens: "sarthak.eth",
      timestamp: "2mins ago",
      amount: 0.01,
    },
  ];

  return (
    <div className="space-y-2">
      {logsData.map((log, index) => (
        <LogCard key={index} log={log} />
      ))}
    </div>
  );
};

const PostFeed = () => {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("feed");

  const posts: Post[] = [
    {
      author: {
        name: "Sarthak Shah",
        username: "@sarthak13",
        avatar: sarthakLogo,
      },
      content:
        "Exploring the intersection of consumer crypto reveals a future where online interactions are not just transparent but also owner the intersection of consumer crypto reveals a future...",
      timestamp: "2mins ago",
    },
  ];

  return (
    <div className="max-w-3xl mt-8">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "feed" && <CollectionTab posts={posts} />}
      {activeTab === "launched" && <LaunchedTab posts={posts} />}
      {activeTab === "investment-logs" && <InvestmentLogsTab />}
    </div>
  );
};

interface Profile {
  localName: string;
  ownedBy: string;
}

const ProfileSection = () => {
  const { address } = useAccount();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  const formatCurrency = (num: string | number): string => {
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numValue);
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getFormattedBalance = (): string => {
    if (isBalanceLoading || !balanceData) return "$0.00";
    try {
      return formatCurrency(balanceData.formatted);
    } catch (error) {
      console.error("Error formatting balance:", error);
      return "$0.00";
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getProfiles(
          "0x61758e064B4Bc0269BD94e30Ce3c97D21213c410"
        );
        if (data && data.length > 0) {
          setProfileData(data[0]);
        } else {
          setError("No profile data found");
        }
      } catch (err) {
        setError("Failed to fetch profile data");
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div className="min-w-[50vw] flex justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-w-[50vw] flex justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-w-[50vw]">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={sarthakLogo}
          alt="Sarthak"
          width={75}
          height={75}
          className="rounded-lg"
        />
        <h1 className="mt-4 font-medium">
          {profileData?.localName || "Unknown User"}
        </h1>
        <p className="text-[#737373] text-sm">
          {formatAddress(profileData?.ownedBy)}
        </p>
      </div>
      <div className="flex items-start justify-between space-y-1">
        <div>
          <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[16.80px] mb-4">
            Your Wallet / Balance
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-white">
              {formatAddress(address)}
            </span>
            <span className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-[44px] leading-[44px]">
              / {getFormattedBalance()}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-b from-[#26262A] to-[#16151A] border border-[#1e1e21] py-[0.25rem] px-2.5 pr-3.5 rounded-xl hover:from-[#26262A] hover:to-[#26262A] transition-colors">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5964 14.5001H13.6667C14.4031 14.5001 15.0001 13.9031 15.0001 13.1667C15.0001 11.9888 14.2363 10.9892 13.1769 10.6362M10.936 2.82096C11.7683 3.27224 12.3334 4.1535 12.3334 5.16675C12.3334 6.17999 11.7683 7.06125 10.936 7.51253M9.00004 5.16667C9.00004 6.63943 7.80613 7.83333 6.33337 7.83333C4.86061 7.83333 3.66671 6.63943 3.66671 5.16667C3.66671 3.69391 4.86061 2.5 6.33337 2.5C7.80613 2.5 9.00004 3.69391 9.00004 5.16667ZM4.00004 10.5H8.66671C10.1395 10.5 11.3334 11.6939 11.3334 13.1667C11.3334 13.903 10.7364 14.5 10 14.5H2.66671C1.93033 14.5 1.33337 13.903 1.33337 13.1667C1.33337 11.6939 2.52728 10.5 4.00004 10.5Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="pt-0.5">Invite a friend</span>
        </button>
      </div>
      <RepScore />
      <PostFeed />
    </div>
  );
};

export default ProfileSection;

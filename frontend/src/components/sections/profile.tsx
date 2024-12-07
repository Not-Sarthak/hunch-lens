import React, { useEffect, useRef, useState } from "react";
import farhatAltImage from "../../assets/farhat-alt.png";
import farhatImage from "../../assets/farhat.png";
import Image, { StaticImageData } from "next/image";
import { useAccount } from "wagmi";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

const RepScore = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  const createParticles = (canvas: HTMLCanvasElement) => {
    const particlesArray: Particle[] = [];
    const numberOfParticles = 40;

    for (let i = 0; i < numberOfParticles; i++) {
      const radius = Math.random() * 1 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;

      particlesArray.push({
        x,
        y,
        dx,
        dy,
        radius,
      });
    }

    return particlesArray;
  };

  const animate = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#737373";
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(() =>
      animate(canvas, ctx)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      particles.current = createParticles(canvas);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    particles.current = createParticles(canvas);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#16151A] px-6 py-8 border border-[#1C1C1F] mt-8 flex items-center justify-between">
      <div className="absolute -top-28 -right-20 rounded-full w-[200px] h-[200px] bg-gradient-to-b from-[#6FDBB5] to-[#2A5547] blur-[50px]" />
      <div className="absolute -bottom-36 -left-4 rounded-full w-[156px] h-[156px] bg-[#2A5547] blur-[50px]" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 max-w-2xl">
        <div className="text-xl font-medium leading-normal text-white font-helvetica">
          Your Reputation Score
        </div>
        <div className="text-[#737373] text-base font-normal font-helvetica leading-tight flex flex-col pt-1">
          <span>Increase your reputation score by creating markets. </span>
        </div>
      </div>
      <p className="z-10 font-bold text-[#6FDBB5] text-5xl pt-1.5">123</p>
    </div>
  );
};

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
  id: "collection" | "launched" | "investment-logs";
  label: string;
}

const tabs: Tab[] = [
  { id: "collection", label: "Collection" },
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
  <div className="bg-[#111015] rounded-lg border border-[#1C1C1F] p-4 ">
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

const PostFeed = () => {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("collection");

  const posts: Post[] = [
    {
      author: {
        name: "Farhat Kadiwala",
        username: "@farhatkadiwala",
        avatar: farhatImage,
      },
      content:
        "Exploring the intersection of consumer crypto reveals a future where online interactions are not just transparent but also owner the intersection of consumer crypto reveals a future...",
      timestamp: "2mins ago",
    },
    {
      author: {
        name: "Farhat Kadiwala",
        username: "@farhatkadiwala",
        avatar: farhatImage,
      },
      content:
        "Exploring the intersection of consumer crypto reveals a future where online interactions are not just transparent but also owner the intersection of consumer crypto reveals a future...",
      timestamp: "2mins ago",
    },
  ];

  return (
    <div className="max-w-3xl mt-8">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="space-y-4">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const { address } = useAccount();

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const balance = 1234.56;

  return (
    <div className="min-w-[50vw]">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={farhatAltImage}
          alt="Farhat"
          width={75}
          height={75}
          className="rounded-lg"
        />
        <h1 className="mt-4 font-medium">Farhat Kadiwala</h1>
        <p className="text-[#737373] text-sm">{formatAddress(address)}</p>
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
              / {formatCurrency(balance)}
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
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
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

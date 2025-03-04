import React from 'react';
import Image from "next/image";

interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  imageURI: string;
  text: string;
  postId: string;
}

export const CastContent = ({ market }: { market: TokenInfo }) => {
  return (
    <div className="relative group overflow-hidden col-span-1 p-4 border border-zinc-800/50 rounded-2xl bg-zinc-900/70 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/80 hover:shadow-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="glare-effect absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-out"></div>
      </div>

      <div className="relative z-10 flex flex-col items-start h-full gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="font-semibold text-white/80 text-lg">{market.name}</div>
        </div>

        <div className="flex flex-col w-full space-y-4">
          <p className="text-white/90 leading-relaxed text-base tracking-tight">
            {market.text}
          </p>

          <div className="relative w-full overflow-hidden rounded-xl group/image">
            <Image
              src={market.imageURI}
              alt="Profile"
              className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover/image:scale-105"
              width={300}
              height={300}
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/image:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  .glare-effect {
    background: linear-gradient(
      135deg, 
      rgba(255,255,255,0.2) 0%, 
      rgba(255,255,255,0.05) 50%, 
      rgba(255,255,255,0) 100%
    );
    animation: glare-animation 3s infinite alternate;
  }

  @keyframes glare-animation {
    0% {
      transform: skewX(-15deg) translateX(-100%);
    }
    100% {
      transform: skewX(-15deg) translateX(200%);
    }
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default CastContent;
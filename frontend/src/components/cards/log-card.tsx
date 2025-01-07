import React from "react";
import Image, { StaticImageData } from "next/image";

interface LogItem {
  profileImage: StaticImageData;
  username: string;
  ens: string;
  timestamp: string;
  amount: number;
}

const LogCard = ({ log }: { log: LogItem }) => (
  <div className="flex items-center justify-between p-4 bg-[#111015] rounded-2xl border border-[#1C1C1F]">
    <div className="flex items-center gap-3">
      <Image
        src={log.profileImage}
        alt={log.username}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-normal text-white">{log.ens}</span>
        <span className="text-sm text-[#737373]">{log.timestamp}</span>
      </div>
    </div>
    <span className="text-xl text-white">${log.amount}</span>
  </div>
);

export default LogCard;

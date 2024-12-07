import React, { useEffect, useRef, useState } from "react";
import farhatAltImage from "../../assets/farhat-alt.png";
import farhatImage from "../../assets/farhat.png";
import farhatLogo from "../../assets/farhat.png";
import boiduLogo from "../../assets/boidu.jpeg";
import jesseLogo from "../../assets/jesse.png";
import Image from "next/image";

const leaderboardStats = [
  {
    id: 1,
    name: "Farhat Kadiwala",
    username: "@farhatkadiwala",
    amount: 2.01,
    avatar: farhatLogo,
  },
  // {
  //   id: 2,
  //   name: "Boidushya",
  //   username: "@boi",
  //   avatar: boiduLogo,
  //   amount: 12.3,
  // },
  // {
  //   name: "Jesse Pollak",
  //   username: "@jesse",
  //   avatar: jesseLogo,
  //   amount: 34.5,
  // },
];

const LeaderboardList = () => {
  return (
    <div className="w-full space-y-4 max-w-[500px]">
      {leaderboardStats
        .sort((a, b) => b.amount - a.amount)
        .map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between w-full px-3 py-2 first:bg-gradient-to-b first:from-[#26262A] first:to-[#16151A] first:border first:border-[#1E1E21] rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s profile picture`}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="pt-1 text-lg font-medium">{user.name}</h3>
              </div>
            </div>
            <h3 className="text-lg font-normal">${user.amount}</h3>
          </div>
        ))}
    </div>
  );
};

const LeaderboardSection = () => {
  return (
    <div className="min-w-[50vw] flex items-center justify-center flex-col">
      <h1 className="text-[#737373] mb-10">
        Trade more and get on the leaderboard 💪🏽
      </h1>
      <LeaderboardList />
    </div>
  );
};

export default LeaderboardSection;

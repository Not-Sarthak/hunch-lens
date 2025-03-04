import React from "react";
import sarthakLogo from "../../assets/sarthak.png";
import Image from "next/image";

const leaderboardStats = [
  {
    id: 1,
    name: "Sarthak Shah",
    username: "@sarthak13",
    amount: 0.01,
    avatar: sarthakLogo,
  },
];

const LeaderboardList = () => {
  return (
    <div className="w-full space-y-3 md:space-y-4 max-w-full sm:max-w-[500px]">
      {leaderboardStats
        .sort((a, b) => b.amount - a.amount)
        .map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between w-full px-2 sm:px-3 py-2 first:bg-gradient-to-b first:from-[#26262A] first:to-[#16151A] first:border first:border-[#1E1E21] rounded-xl"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 overflow-hidden bg-gray-600 rounded-full">
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s profile picture`}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="pt-1 text-base sm:text-lg font-medium">{user.name}</h3>
                <p className="text-xs sm:text-sm text-[#737373]">{user.username}</p>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-normal">${user.amount}</h3>
          </div>
        ))}
    </div>
  );
};

const LeaderboardSection = () => {
  return (
    <div className="w-full md:min-w-[50vw] flex items-center justify-center flex-col">
      <h1 className="text-sm sm:text-base text-[#737373] mb-6 md:mb-10 text-center">
        Trade more and get on the leaderboard 💪🏽
      </h1>
      <LeaderboardList />
    </div>
  );
};

export default LeaderboardSection;

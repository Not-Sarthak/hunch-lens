"use client";

import React, { useState } from "react";

interface Tab {
  id: "onFire" | "hitAuthors" | "activeCurators";
  label: string;
}

interface TabContentProps {
  activeTab: Tab["id"];
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "onFire":
      return <div className="p-4">🔥On Fire Content</div>;
    case "hitAuthors":
      return <div className="p-4">Hit Authors Content</div>;
    case "activeCurators":
      return <div className="p-4">Active Curators Content</div>;
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
            className={`flex items-center gap-2 pt-2 pb-4 px-1 relative transition-colors
              ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-[#737373] hover:text-gray-300"
              }`}
          >
            <span className="flex items-center gap-2">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
            )}
          </button>
        ))}
      </div>

      <div className="w-full p-[1px] bg-gradient-to-b from-[#26262A] to-[#16151A] rounded-xl">
        <div className="bg-[#16151A] text-gray-300 w-full font-inter rounded-xl">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default TabbedNavigation;

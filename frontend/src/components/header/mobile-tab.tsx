import React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const MobileTab: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-b from-[#26262A] to-[#16151A] border border-[#1E1E21]"
          : "hover:bg-[#26262A]/20 border border-transparent"
      }`}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {React.cloneElement(item.icon as React.ReactElement, {
          className: isActive
            ? "mobile-menu-icon active-gradient"
            : "text-[#737373]",
        })}
      </div>
      <span
        className={`${isActive ? "text-white" : "text-[#737373]"} font-medium`}
      >
        {item.label}
      </span>
    </li>
  );
};

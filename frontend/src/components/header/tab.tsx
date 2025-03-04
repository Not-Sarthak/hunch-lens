import { useRouter } from "next/navigation";
import { useRef } from "react";
import React from "react";

interface TabProps {
  index: number;
  path: string;
  children: React.ReactNode;
  activeTab: number | null;
}

export const Tab: React.FC<TabProps> = ({
  index,
  path,
  children,
  activeTab,
}) => {
  const router = useRouter();
  const ref = useRef<HTMLLIElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(path);
  };

  const isActive = activeTab === index;

  return (
    <li
      id={`tab-${index}`}
      ref={ref}
      onClick={handleClick}
      className={`relative grid place-items-center z-10 cursor-pointer p-3 rounded-xl transition-all duration-200 outline-none ${
        isActive
          ? "bg-gradient-to-b from-[#26262A] to-[#16151A] border border-[#1E1E21]"
          : "hover:bg-[#26262A]/20 border border-transparent"
      }`}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(path);
        }
      }}
    >
      <div className="pointer-events-none w-6 h-6 flex items-center justify-center">
        {React.cloneElement(children as React.ReactElement, {
          className: isActive ? "active-gradient" : "text-[#737373]",
        })}
      </div>
    </li>
  );
};

"use client";

import Logo from "./logo";

export const DashboardSkeleton = () => {
  return (
    <div className="grid pl-0 pt-20 place-items-center min-h-[calc(100vh_-_4rem)]">
      <h1 className="text-9xl">
        <Logo />
      </h1>
    </div>
  );
};

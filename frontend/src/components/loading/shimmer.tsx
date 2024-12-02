export const Shimmer = () => {
  return (
    <div className="relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#6366f1]/10 before:to-transparent">
      <div className="h-full w-full bg-gradient-to-r from-[#272A48]/20 via-[#1f2137]/25 to-[#0F0E26]/20 animate-pulse transition-all duration-300 ease-in-out" />
    </div>
  );
};

import { Shimmer } from "./shimmer";

export const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="mb-8">
        <div className="w-48 h-8 relative overflow-hidden rounded-lg mb-4">
          <Shimmer />
        </div>
        <div className="w-72 h-4 relative overflow-hidden rounded-lg">
          <Shimmer />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-800 backdrop-blur-xl overflow-hidden"
          >
            <div className="h-48 relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="p-4 space-y-4">
              <div className="w-3/4 h-6 relative overflow-hidden rounded-lg">
                <Shimmer />
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 relative overflow-hidden rounded-lg">
                  <Shimmer />
                </div>
                <div className="w-5/6 h-4 relative overflow-hidden rounded-lg">
                  <Shimmer />
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="w-20 h-4 relative overflow-hidden rounded-lg">
                  <Shimmer />
                </div>
                <div className="w-24 h-8 relative overflow-hidden rounded-lg">
                  <Shimmer />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

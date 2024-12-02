'use client';

import { useAccount } from "wagmi";

const Dashboard = () => {
  const isConnected = useAccount();
  console.log(isConnected.address);
  

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mt-6">
        {/* Your dashboard content */}
      </div>
    </div>
  );
};

export default Dashboard;
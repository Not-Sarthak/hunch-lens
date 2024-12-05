"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import Button from "src/components/button/button";
import CreateAIForm from "src/components/forms/create-ai-form";
import TokenizeCastForm from "src/components/forms/tokenize-cast";
import WalletDetails from "src/components/cards/wallet-details";
import MarketBanner from "src/components/cards/market-banner";
import TabbedNavigation from "src/components/header/tabbed-navigation";
import Trending from "src/components/sections/trending";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-800 rounded-lg shadow-xl">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const { address } = useAccount();
  const [currentModal, setCurrentModal] = useState<"ai" | "tokenize" | null>(
    null
  );

  const closeModal = () => setCurrentModal(null);

  return (
    <div className="min-h-screen bg-[#111015] flex justify-center">
      <div className="max-w-7xl w-full pt-20">
        <div className="pt-4 pb-6 border-[#1E1E21] border-b-[1px]">
          <WalletDetails
            balance={1234.56}
            base={789.1}
            usdc={456.78}
            investedCasts={42}
          />
        </div>
        <div className="py-6 w-full flex gap-4">
          <div className="w-3/5 flex flex-col gap-4">
            <div><MarketBanner /></div>
            <div><Trending /></div>
          </div>
          <div className="w-2/5">
            <TabbedNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
//           <Button
//             label="Create AI Agent"
//             onClick={() => setCurrentModal('ai')}
//             className="btn btn-green"
//           />
//           <Button
//             label="Tokenize Cast"
//             onClick={() => setCurrentModal('tokenize')}
//             className="btn btn-green"
//           />
//         </div>

//         <Modal isOpen={currentModal === 'ai'} onClose={closeModal}>
//           <CreateAIForm onClose={closeModal} />
//         </Modal>

//         <Modal isOpen={currentModal === 'tokenize'} onClose={closeModal}>
//           <TokenizeCastForm onClose={closeModal} />
//         </Modal>
//       </div>

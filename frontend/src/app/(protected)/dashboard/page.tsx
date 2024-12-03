"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import Button from "src/components/button/button";
import CreateAIForm from "src/components/forms/create-ai-form";
import TokenizeCastForm from "src/components/forms/tokenize-cast";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-800 rounded-lg shadow-xl">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
  const [currentModal, setCurrentModal] = useState<'ai' | 'tokenize' | null>(null);

  const closeModal = () => setCurrentModal(null);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>
      <div className="mt-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
        <Button
          label="Create AI Agent"
          onClick={() => setCurrentModal('ai')}
          className="btn btn-indigo"
        />
        <Button
          label="Tokenize Cast"
          onClick={() => setCurrentModal('tokenize')}
          className="btn btn-indigo"
        />
      </div>

      <Modal isOpen={currentModal === 'ai'} onClose={closeModal}>
        <CreateAIForm onClose={closeModal} />
      </Modal>

      <Modal isOpen={currentModal === 'tokenize'} onClose={closeModal}>
        <TokenizeCastForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;
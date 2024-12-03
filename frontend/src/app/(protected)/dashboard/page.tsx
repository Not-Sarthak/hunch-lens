"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import Button from "src/components/button/button";
import Modal from "src/components/modal/modal";
import CreateAIForm from "src/components/forms/create-ai-form";
import TokenizeCastForm from "src/components/forms/tokenize-cast";

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
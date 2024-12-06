"use client";

import CreateAIForm from "src/components/forms/create-ai-form";
import { motion } from "framer-motion";

const CreateAgentPage = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex items-center justify-center w-full py-32 pl-20"
    >
      <CreateAIForm />
    </motion.div>
  );
};

export default CreateAgentPage;

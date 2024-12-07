import React from "react";
import { motion } from "framer-motion";

const BackgroundCircle = () => {
  return (
    <div className="absolute inset-0 overflow-visible z-[-1] h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="bg-[#6FDBB5] size-[250px] blur-[100px] absolute top-0 left-72"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.25 }}
        className="bg-[#6FDBB5] size-[250px] blur-[100px] absolute -bottom-44 left-72"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="bg-[#6FDBB5] size-[250px] blur-[100px] absolute top-3/4 -translate-y-1/2 right-72"
      />
    </div>
  );
};

export default BackgroundCircle;

import { motion } from "framer-motion";

export const AnimatedContent: React.FC = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center pt-16 h-80"
      >
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] text-3xl lg:text-5xl font-light text-transparent bg-clip-text w-full lg:w-1/2 text-center"
        >
          Spot viral content before everyone else
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-[#737373] w-[228px] leading-tight mt-4 text-center text-sm lg:text-lg font-normal"
        >
          Turn social engagement into profit while you sleep.
        </motion.p>
      </motion.div>
    );
  };
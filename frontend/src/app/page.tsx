"use client";

import LandingPageSection from "src/components/sections/landing";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className=""
    >
      <LandingPageSection />
    </motion.div>
  );
}

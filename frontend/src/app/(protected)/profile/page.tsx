"use client";

import { motion } from "framer-motion";
import ProfileSection from "src/components/sections/profile";

const Profile = () => {
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
      className="flex items-center max-w-7xl mx-auto justify-center w-full py-32 px-4 md:px-6 lg:pl-20"
    >
      <ProfileSection />
    </motion.div>
  );
};

export default Profile;

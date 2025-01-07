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
      className="flex items-center justify-center w-full py-32 pl-20"
    >
      <ProfileSection />

    </motion.div>
  );
};

export default Profile;

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HowItWorksSection from "../landing/how-it-works";
import BackgroundCircle from "../landing/background-circle";
import InfiniteScroll from "../landing/infinite-scroll";
import Live from "../landing/live";
import Image from "next/image";
import landing from "../../assets/landing.svg"
import landingMobile from "../../assets/landing-mobile.svg"
import { ParticleBackground } from "../landing/particles"
import { AnimatedContent } from "../landing/animated-content";

const LandingPageSection: React.FC = () => {
  return (
    <>
      <BackgroundCircle />
      <ParticleBackground />
      <div className="md:max-w-landing w-full border-x border-b rounded-b-2xl border-[#1E1E21] bg-[#111015]/20 lg:bg-[#111015] bg-opacity-95">
        <AnimatedContent />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid place-items-center"
        >
          <Image src={landing} alt="Landing Visuals" width={1000} height={1000} className="hidden md:flex"/>
          <Image src={landingMobile} alt="Landing Visuals" width={400} height={400} className="flex md:hidden px-4"/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
        >
          <HowItWorksSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <InfiniteScroll />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.75 }}
        >
          <Live />
        </motion.div>
      </div>
    </>
  );
};

export default LandingPageSection;

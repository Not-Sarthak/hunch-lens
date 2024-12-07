import { motion } from "framer-motion";
import Image from "next/image";

import H from "../../assets/h-u-n-c-h/H.svg";
import U from "../../assets/h-u-n-c-h/U.svg";
import N from "../../assets/h-u-n-c-h/N.svg";
import C from "../../assets/h-u-n-c-h/C.svg";
import secondH from "../../assets/h-u-n-c-h/SecondH.svg";

const alphabetList = [
  <Image src={H} alt="H" />,
  <Image src={U} alt="U" />,
  <Image src={N} alt="N" />,
  <Image src={C} alt="C" />,
  <Image src={secondH} alt="h" />,
];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    scale: 1,
  },
  animate: {
    y: [-20, 0],
    scale: [1.2, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      type: "spring",
      stiffness: 800,
      damping: 15,
      mass: 1,
    },
  },
};

const Logo = () => {
  return (
    <motion.h1
      className="flex items-end justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {alphabetList.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block mx-1"
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default Logo;

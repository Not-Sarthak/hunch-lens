import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeframeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeframeDropdown: React.FC<TimeframeDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeframes = ["Yesterday", "Last Week", "Last Month", "Last Year"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-4 pr-2 py-2 text-sm text-white font-light font-helvetica capitalize leading-tight bg-gradient-to-b from-[#26262A] to-[#16151A] rounded-lg backdrop-blur-sm hover:bg-[#26262A] transition-colors"
      >
        {value}

        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7708 12.2277C11.9899 11.2464 13.0773 10.1029 14.0046 8.82725C14.1188 8.67224 14.1801 8.47715 14.1643 8.27014C14.1294 7.81123 13.7291 7.46752 13.2702 7.50244C11.0933 7.66811 8.9069 7.66811 6.72998 7.50244C6.27107 7.46752 5.87074 7.81123 5.83582 8.27014C5.82006 8.47715 5.88135 8.67223 5.99551 8.82724C6.92285 10.1029 8.01023 11.2464 9.22932 12.2277C9.68043 12.5908 10.3197 12.5908 10.7708 12.2277Z"
            fill="#737373"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 py-1 z-40 bg-[#1A1A1F] border border-gray-800 rounded-lg shadow-xl"
            >
              {timeframes.map((timeframe) => (
                <motion.button
                  key={timeframe}
                  whileHover={{ backgroundColor: "rgba(31, 31, 35, 1)" }}
                  onClick={() => {
                    onChange(timeframe);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-base
                    ${timeframe === value ? "text-gray-200" : "text-gray-400"}`}
                >
                  {timeframe}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeframeDropdown;

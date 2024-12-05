import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeframeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeframeDropdown: React.FC<TimeframeDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeframes = [
    'Yesterday',
    'Last Week',
    'Last Month',
    'Last Year'
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-base text-white font-light font-inter capitalize leading-tight bg-gradient-to-b from-[#26262A] to-[#16151A] rounded-lg backdrop-blur-sm hover:bg-[#26262A] transition-colors"
      >
        {value}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
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
                  whileHover={{ backgroundColor: 'rgba(31, 31, 35, 1)' }}
                  onClick={() => {
                    onChange(timeframe);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-base
                    ${timeframe === value ? 'text-gray-200' : 'text-gray-400'}`}
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
'use client';

import { motion } from 'framer-motion';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onSectionChange: (index: number) => void;
  sectionTitles: string[];
}

export default function Navigation({ 
  currentSection, 
  totalSections, 
  onSectionChange, 
  sectionTitles 
}: NavigationProps) {
  return (
    <motion.nav
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {/* Navigation Rail */}
      <div className="relative">
        {/* Background Rail */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />
        
        {/* Progress Indicator */}
        <motion.div
          className="absolute left-1/2 top-0 w-px bg-white transform -translate-x-1/2"
          initial={{ height: 0 }}
          animate={{ height: `${(currentSection / (totalSections - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Navigation Dots */}
        <div className="flex flex-col space-y-8 relative z-10">
          {Array.from({ length: totalSections }).map((_, index) => (
            <motion.div
              key={index}
              className="relative flex items-center"
            >
              <motion.button
                onClick={() => onSectionChange(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                  currentSection === index
                    ? 'bg-white scale-150 shadow-white shadow-lg'
                    : 'bg-white/40 hover:bg-white/70 hover:scale-125'
                }`}
                whileHover={{ scale: currentSection === index ? 1.5 : 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator pulse */}
                {currentSection === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/50"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Tooltip */}
              <motion.div
                className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <div className="glass px-4 py-2 rounded-lg whitespace-nowrap border border-white/20">
                  <span className="text-white text-sm font-light tracking-wide">
                    {index === 0 ? 'INTRODUCTION' : sectionTitles[index] || `SECTION ${index}`}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Section Counter */}
        <motion.div
          className="absolute -right-16 top-0 text-white/60 text-xs font-light tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </motion.div>
      </div>
    </motion.nav>
  );
}
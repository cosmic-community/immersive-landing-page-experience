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
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex flex-col space-y-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSectionChange(index)}
            className={`group relative w-4 h-4 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="glass px-3 py-1 rounded-md whitespace-nowrap">
                <span className="text-white text-sm font-light">
                  {sectionTitles[index] || `Section ${index + 1}`}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
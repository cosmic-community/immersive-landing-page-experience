'use client';

import { ChevronUp, ChevronDown, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onSectionChange: (section: number) => void;
  sectionTitles: string[];
}

export default function Navigation({ 
  currentSection, 
  totalSections, 
  onSectionChange, 
  sectionTitles 
}: NavigationProps) {
  return (
    <>
      {/* Side Navigation Dots */}
      <motion.nav 
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col space-y-4">
          {Array.from({ length: totalSections }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onSectionChange(index)}
              className={`group relative w-4 h-4 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-white shadow-lg shadow-white/30' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  {sectionTitles[index] || `Section ${index + 1}`}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Scroll Indicators */}
      <AnimatePresence>
        {currentSection > 0 && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => onSectionChange(currentSection - 1)}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 text-white/70 hover:text-white transition-colors duration-200"
          >
            <ChevronUp size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSection < totalSections - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => onSectionChange(currentSection + 1)}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/70 hover:text-white transition-colors duration-200 animate-bounce"
          >
            <ChevronDown size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Section Counter */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 text-white/70 text-sm font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
      </motion.div>
    </>
  );
}
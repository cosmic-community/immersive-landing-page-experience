'use client';

import { motion } from 'framer-motion';

export default function IMAXTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Aperture-style transition */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
        exit={{ clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900/20" />
      </motion.div>

      {/* Light streak effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
          style={{
            left: `${20 + i * 10}%`,
            transform: 'rotate(15deg)',
          }}
          initial={{ 
            opacity: 0, 
            scaleY: 0,
            y: '-50%'
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            scaleY: [0, 1, 0],
            y: ['50%', '-50%', '-150%']
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Central loading indicator */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-white text-lg font-extralight tracking-[0.3em]">
          TRANSITIONING
        </div>
      </motion.div>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { LandingPage } from '@/types';

interface HeroProps {
  landingPage: LandingPage;
  onScrollNext: () => void;
}

export default function Hero({ landingPage, onScrollNext }: HeroProps) {
  const title = landingPage.metadata?.title || landingPage.title || 'Welcome';
  const subtitle = landingPage.metadata?.subtitle || '';
  const main_image = landingPage.metadata?.main_image;

  return (
    <section 
      id="section-0"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {main_image?.imgix_url ? (
          <>
            <img
              src={`${main_image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={onScrollNext}
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 text-lg font-light">Explore Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
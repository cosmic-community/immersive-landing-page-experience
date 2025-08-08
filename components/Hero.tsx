'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ParallaxImage from './ParallaxImage';
import type { LandingPage } from '@/types';

interface HeroProps {
  landingPage: LandingPage;
  onScrollNext: () => void;
  hasNextSection: boolean;
  isActive: boolean;
}

export default function Hero({ landingPage, onScrollNext, hasNextSection, isActive }: HeroProps) {
  const title = landingPage.metadata?.title || landingPage.title || 'WELCOME';
  const subtitle = landingPage.metadata?.subtitle || '';
  const main_image = landingPage.metadata?.main_image;

  return (
    <section 
      id="section-0"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: isActive ? 1 : 1.1 }}
        transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {main_image?.imgix_url ? (
          <ParallaxImage
            src={`${main_image.imgix_url}?w=2400&h=1600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
            parallaxStrength={0.5}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900/20" />
        )}
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        
        {/* Film Grain Effect */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-film-grain" />
      </motion.div>

      {/* IMAX-Style Letterbox Bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-16 bg-black z-40"
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-black z-40"
        initial={{ y: 64 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Cinematic Content */}
      <div className="relative z-30 text-center px-6 max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <div className="text-white/40 text-sm md:text-base tracking-[0.3em] font-extralight mb-4">
            A CINEMATIC EXPERIENCE
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-white mb-8 leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 2.5, 
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {title.split(' ').map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        {subtitle && (
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <div className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              {subtitle}
            </div>
            
            {/* Subtitle underline animation */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8 mx-auto max-w-xs"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
            />
          </motion.div>
        )}

        {hasNextSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            <motion.button
              onClick={onScrollNext}
              className="group relative px-12 py-5 glass rounded-full text-white hover:bg-white/10 transition-all duration-700 overflow-hidden border border-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="relative z-10 text-lg font-light tracking-widest"
                initial={{ letterSpacing: '0.1em' }}
                whileHover={{ letterSpacing: '0.2em' }}
                transition={{ duration: 0.3 }}
              >
                BEGIN EXPERIENCE
              </motion.span>
              
              {/* Button glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                initial={{ x: '-100%', opacity: 0 }}
                whileHover={{ x: '100%', opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Cinematic Scroll Indicator */}
      {hasNextSection && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/50 cursor-pointer z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 3 }}
          onClick={onScrollNext}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs tracking-widest mb-2 font-light">SCROLL</div>
            <ChevronDown size={24} strokeWidth={1} />
          </motion.div>
        </motion.div>
      )}

      {/* Cinematic Light Rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
      />
    </section>
  );
}
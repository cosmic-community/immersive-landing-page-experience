'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import ParallaxImage from './ParallaxImage';
import type { Section } from '@/types';

interface CinematicSectionProps {
  section: Section;
  index: number;
  isActive: boolean;
  totalSections: number;
}

export default function CinematicSection({ section, index, isActive, totalSections }: CinematicSectionProps) {
  const { title, body, images, cta_button_label, cta_button_url } = section.metadata;
  const backgroundImage = images?.[0];

  // Determine cinematic style based on section index
  const isEvenSection = index % 2 === 0;
  const cinematicStyle = {
    textAlign: isEvenSection ? 'center' as const : 'left' as const,
    imagePosition: isEvenSection ? 'center' : 'right',
  };

  return (
    <section 
      id={`section-${index + 1}`}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ 
          scale: isActive ? 1 : 1.1, 
          opacity: isActive ? 1 : 0.3 
        }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: isActive ? 0 : 0.5
        }}
      >
        {backgroundImage && (
          <ParallaxImage
            src={`${backgroundImage.imgix_url}?w=2400&h=1600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
            parallaxStrength={0.3}
          />
        )}
        
        {/* Dynamic Gradient Overlays */}
        <div className={`absolute inset-0 ${
          isEvenSection 
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-black/90' 
            : 'bg-gradient-to-r from-black/90 via-black/30 to-black/80'
        }`} />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/60" />
      </motion.div>

      {/* IMAX-Style Aspect Ratio Bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-12 bg-black/90 z-20"
        initial={{ y: -48 }}
        animate={{ y: isActive ? 0 : -48 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-12 bg-black/90 z-20"
        initial={{ y: 48 }}
        animate={{ y: isActive ? 0 : 48 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <div className={`relative z-10 px-6 max-w-7xl mx-auto w-full ${
        cinematicStyle.textAlign === 'center' ? 'text-center' : 'text-left'
      }`}>
        
        <div className={`${isEvenSection ? '' : 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'}`}>
          {/* Text Content */}
          <div className={isEvenSection ? 'w-full' : 'order-1 lg:order-1'}>
            {/* Section Number */}
            <motion.div
              className="text-white/30 text-sm tracking-[0.3em] font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3, 
                y: isActive ? 0 : 20 
              }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {String(index + 1).padStart(2, '0')} / {String(totalSections - 1).padStart(2, '0')}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white mb-8 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ 
                opacity: isActive ? 1 : 0.5, 
                y: isActive ? 0 : 50,
                scale: isActive ? 1 : 0.9
              }}
              transition={{ 
                duration: 2, 
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {title.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 20 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + wordIndex * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            
            {/* Body Content */}
            {body && (
              <motion.div
                className="prose prose-lg md:prose-xl lg:prose-2xl prose-invert max-w-none mb-12"
                initial={{ opacity: 0, y: 60 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.7, 
                  y: isActive ? 0 : 30 
                }}
                transition={{ duration: 1.5, delay: 0.6 }}
              >
                <ReactMarkdown 
                  className="text-white/90 font-light leading-relaxed"
                  components={{
                    h3: ({ children }) => (
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8 tracking-wide">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-6 leading-relaxed font-light">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className={`space-y-4 text-white/80 ${
                        cinematicStyle.textAlign === 'center' ? 'text-left max-w-3xl mx-auto' : ''
                      }`}>
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-lg md:text-xl lg:text-2xl font-light relative pl-8">
                        <span className="absolute left-0 top-2 w-2 h-2 bg-white/60 rounded-full"></span>
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-white/40 pl-8 italic text-white/90 text-xl md:text-2xl lg:text-3xl font-light my-12">
                        {children}
                      </blockquote>
                    )
                  }}
                >
                  {body}
                </ReactMarkdown>
              </motion.div>
            )}

            {/* CTA Button */}
            {cta_button_label && cta_button_url && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.5, 
                  y: isActive ? 0 : 20 
                }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.a
                  href={cta_button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block px-12 py-5 glass rounded-full text-white hover:bg-white/15 transition-all duration-700 overflow-hidden border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="relative z-10 text-lg font-light tracking-widest"
                    initial={{ letterSpacing: '0.1em' }}
                    whileHover={{ letterSpacing: '0.2em' }}
                    transition={{ duration: 0.3 }}
                  >
                    {cta_button_label}
                  </motion.span>
                  
                  {/* Button shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </motion.a>
              </motion.div>
            )}
          </div>

          {/* Image Content for Side Layout */}
          {!isEvenSection && backgroundImage && (
            <motion.div
              className="order-2 lg:order-2 relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: isActive ? 1 : 0.5, 
                x: isActive ? 0 : 50 
              }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <div className="relative overflow-hidden rounded-lg border border-white/20">
                <img
                  src={`${backgroundImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Cinematic Light Streaks */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isActive ? 1 : 0, 
          opacity: isActive ? 1 : 0 
        }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isActive ? 1 : 0, 
          opacity: isActive ? 1 : 0 
        }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { Section } from '@/types';

interface ScrollSectionProps {
  section: Section;
  index: number;
  isActive: boolean;
}

export default function ScrollSection({ section, index, isActive }: ScrollSectionProps) {
  const { title, body, images, cta_button_label, cta_button_url } = section.metadata;
  const backgroundImage = images?.[0];

  return (
    <section 
      id={`section-${index + 1}`}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: isActive ? 1 : 1.1, 
            opacity: isActive ? 1 : 0.7 
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={`${backgroundImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 80 }}
          animate={{ 
            opacity: isActive ? 1 : 0.5, 
            y: isActive ? 0 : 40 
          }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {title}
        </motion.h2>
        
        {body && (
          <motion.div
            className="prose prose-lg md:prose-xl lg:prose-2xl prose-invert max-w-none mb-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ 
              opacity: isActive ? 1 : 0.7, 
              y: isActive ? 0 : 20 
            }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ReactMarkdown 
              className="text-white/90 font-light leading-relaxed"
              components={{
                h3: ({ children }) => (
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="text-left space-y-3 text-white/80">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-lg md:text-xl">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-white/30 pl-6 italic text-white/90 text-xl md:text-2xl">
                    {children}
                  </blockquote>
                )
              }}
            >
              {body}
            </ReactMarkdown>
          </motion.div>
        )}

        {cta_button_label && cta_button_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isActive ? 1 : 0.5, 
              scale: isActive ? 1 : 0.9 
            }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href={cta_button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 text-lg font-light">{cta_button_label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
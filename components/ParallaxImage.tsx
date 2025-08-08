'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxStrength?: number;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  parallaxStrength = 0.5 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -100 * parallaxStrength]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1 + (0.2 * parallaxStrength)]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale }}
        initial={{ scale: 1.1 }}
        animate={{ 
          scale: isInView ? 1 : 1.1,
          filter: isInView ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.8)'
        }}
        transition={{ 
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      />
    </div>
  );
}
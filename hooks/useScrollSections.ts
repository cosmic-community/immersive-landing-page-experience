'use client';

import { useState, useEffect, useCallback } from 'react';

export const useScrollSections = (totalSections: number) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setTimeout(() => setIsScrolling(false), 1000);
  }, [isScrolling, totalSections]);

  const nextSection = useCallback(() => {
    if (currentSection < totalSections - 1) {
      scrollToSection(currentSection + 1);
    }
  }, [currentSection, totalSections, scrollToSection]);

  const previousSection = useCallback(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }, [currentSection, scrollToSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        nextSection();
      } else {
        previousSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        previousSection();
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        if (deltaY > 0) {
          nextSection();
        } else {
          previousSection();
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrolling, nextSection, previousSection]);

  return {
    currentSection,
    scrollToSection,
    nextSection,
    previousSection,
    isScrolling
  };
};
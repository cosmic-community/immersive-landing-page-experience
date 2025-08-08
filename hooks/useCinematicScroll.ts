'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useCinematicScroll = (totalSections: number) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const currentSectionRef = useRef<number>(0);

  // Keep refs in sync with state
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isScrollingRef.current || sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    setIsScrolling(true);
    isScrollingRef.current = true;
    setCurrentSection(sectionIndex);
    currentSectionRef.current = sectionIndex;
    
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Extended scroll lock for cinematic timing
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      isScrollingRef.current = false;
    }, 1800);
  }, [totalSections]);

  const nextSection = useCallback(() => {
    if (currentSectionRef.current < totalSections - 1) {
      scrollToSection(currentSectionRef.current + 1);
    }
  }, [totalSections, scrollToSection]);

  const previousSection = useCallback(() => {
    if (currentSectionRef.current > 0) {
      scrollToSection(currentSectionRef.current - 1);
    }
  }, [scrollToSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Increased minimum time for more cinematic pacing
      if (isScrollingRef.current || timeSinceLastScroll < 500) return;
      
      lastScrollTimeRef.current = now;
      
      // More restrictive delta detection for smoother experience
      const delta = Math.abs(e.deltaY);
      if (delta < 20) return;
      
      if (e.deltaY > 0) {
        nextSection();
      } else {
        previousSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        previousSection();
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(totalSections - 1);
      }
    };

    // Enhanced touch handling for cinematic mobile experience
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchStartX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
      touchStartX = e.touches[0]?.clientX || 0;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0] || isScrollingRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndTime = Date.now();
      const deltaY = touchStartY - touchEndY;
      const deltaX = Math.abs(touchStartX - touchEndX);
      const deltaTime = touchEndTime - touchStartTime;
      
      // More strict gesture requirements for cinematic feel
      if (Math.abs(deltaY) > 120 && deltaX < 80 && deltaTime < 600) {
        if (deltaY > 0) {
          nextSection();
        } else {
          previousSection();
        }
      }
    };

    // Use passive: false for wheel to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Clear timeout on cleanup
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [nextSection, previousSection]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSection,
    scrollToSection,
    nextSection,
    previousSection,
    isScrolling
  };
};
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useScrollSections = (totalSections: number) => {
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
    
    // Set scroll lock for longer duration to prevent rapid scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      isScrollingRef.current = false;
    }, 1200);
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
      
      // Minimum time between scroll events (300ms)
      if (isScrollingRef.current || timeSinceLastScroll < 300) return;
      
      lastScrollTimeRef.current = now;
      
      // More precise delta detection
      const delta = Math.abs(e.deltaY);
      if (delta < 10) return; // Ignore very small scroll movements
      
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
      }
    };

    // Touch handling for mobile with better gesture detection
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0] || isScrollingRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const deltaY = touchStartY - touchEndY;
      const deltaTime = touchEndTime - touchStartTime;
      
      // Minimum swipe distance and maximum time for valid gesture
      if (Math.abs(deltaY) > 80 && deltaTime < 500) {
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
  }, [nextSection, previousSection]); // Removed isScrolling from dependencies

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
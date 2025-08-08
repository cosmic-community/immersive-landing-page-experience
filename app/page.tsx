'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cosmic } from '@/lib/cosmic';
import { useCinematicScroll } from '@/hooks/useCinematicScroll';
import Hero from '@/components/Hero';
import CinematicSection from '@/components/CinematicSection';
import Navigation from '@/components/Navigation';
import IMAXTransition from '@/components/IMAXTransition';
import type { Section, LandingPage } from '@/types';

export default function Page() {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSections = sections.length + 1; // +1 for hero section
  const { currentSection, scrollToSection, isScrolling } = useCinematicScroll(totalSections);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setLoading(true);
        
        console.log('Starting cinematic experience...');
        
        // Fetch landing page data
        const landingPageResponse = await cosmic.objects.findOne({
          type: 'landing-page'
        }).props(['id', 'title', 'slug', 'metadata']).depth(1);

        console.log('Landing page response:', landingPageResponse);

        if (!landingPageResponse || !landingPageResponse.object) {
          throw new Error('Landing page not found. Please ensure you have created a landing page object in your Cosmic CMS bucket.');
        }

        const landingPageData = landingPageResponse.object as LandingPage;
        setLandingPage(landingPageData);

        // Get sections from landing page data first, then fetch individual sections
        let sectionsData: Section[] = [];
        
        if (landingPageData.metadata?.sections && landingPageData.metadata.sections.length > 0) {
          // Use sections from landing page metadata
          sectionsData = landingPageData.metadata.sections as Section[];
          console.log('Using sections from landing page metadata:', sectionsData);
        } else {
          // Fallback: fetch sections separately
          try {
            const sectionsResponse = await cosmic.objects.find({
              type: 'sections'
            }).props(['id', 'title', 'slug', 'metadata']).depth(1);

            console.log('Sections response:', sectionsResponse);
            
            if (sectionsResponse && sectionsResponse.objects) {
              sectionsData = sectionsResponse.objects as Section[];
            }
          } catch (sectionsError: any) {
            console.log('No sections found, continuing with hero only:', sectionsError.message);
          }
        }

        setSections(sectionsData);

      } catch (error: any) {
        console.error('Error fetching cinematic experience:', error);
        
        let errorMessage = 'Failed to load cinematic experience';
        
        if (error.message?.includes('404')) {
          errorMessage = 'Content not found. Please check your Cosmic CMS bucket configuration.';
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = 'Authentication failed. Please check your Cosmic CMS API keys.';
        } else if (error.message?.includes('bucket')) {
          errorMessage = 'Bucket not found. Please verify your COSMIC_BUCKET_SLUG environment variable.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSectionChange = (newSection: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      scrollToSection(newSection);
      setTimeout(() => setIsTransitioning(false), 800);
    }, 200);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-white text-3xl md:text-5xl font-extralight mb-8 tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            EXPERIENCE LOADING
          </motion.div>
          <div className="w-64 h-1 bg-white/20 mx-auto overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <motion.div 
          className="text-center px-6 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-white text-4xl md:text-6xl font-extralight mb-8 tracking-wide">
            {error || 'EXPERIENCE UNAVAILABLE'}
          </div>
          <div className="text-white/60 text-lg mb-12 leading-relaxed">
            The cinematic experience could not be loaded. Please ensure your Cosmic CMS bucket is properly configured.
          </div>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="px-12 py-4 glass rounded-full text-white hover:bg-white/20 transition-all duration-500 text-lg font-light tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RETRY EXPERIENCE
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const sectionTitles = [
    landingPage.metadata?.title || landingPage.title,
    ...sections.map(section => section.metadata?.title || section.title)
  ];

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isTransitioning && <IMAXTransition />}
      </AnimatePresence>

      {/* Hero Section */}
      <Hero 
        landingPage={landingPage}
        onScrollNext={() => {
          if (sections.length > 0) {
            handleSectionChange(1);
          }
        }}
        hasNextSection={sections.length > 0}
        isActive={currentSection === 0}
      />

      {/* Content Sections */}
      {sections.map((section, index) => (
        <CinematicSection
          key={section.id}
          section={section}
          index={index}
          isActive={currentSection === index + 1}
          totalSections={totalSections}
        />
      ))}

      {/* Navigation - only show if there are sections */}
      {sections.length > 0 && (
        <Navigation
          currentSection={currentSection}
          totalSections={totalSections}
          onSectionChange={handleSectionChange}
          sectionTitles={sectionTitles}
        />
      )}

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-80" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </main>
  );
}
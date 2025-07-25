'use client';

import { useState, useEffect } from 'react';
import { cosmicClient } from '@/lib/cosmic';
import { useScrollSections } from '@/hooks/useScrollSections';
import Hero from '@/components/Hero';
import ScrollSection from '@/components/ScrollSection';
import Navigation from '@/components/Navigation';
import type { Section, LandingPage } from '@/types';

export default function Page() {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalSections = sections.length + 1; // +1 for hero section
  const { currentSection, scrollToSection } = useScrollSections(totalSections);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setLoading(true);
        
        console.log('Starting data fetch...');
        
        // Fetch landing page data
        const landingPageResponse = await cosmicClient.objects.findOne({
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
        } else {
          // Fallback: fetch sections separately
          try {
            const sectionsResponse = await cosmicClient.objects.find({
              type: 'sections'
            }).props(['id', 'title', 'slug', 'metadata']).depth(1);

            console.log('Sections response:', sectionsResponse);
            
            if (sectionsResponse && sectionsResponse.objects) {
              sectionsData = sectionsResponse.objects as Section[];
            }
          } catch (sectionsError: any) {
            console.log('No sections found, continuing with empty sections:', sectionsError.message);
          }
        }

        setSections(sectionsData);

      } catch (error: any) {
        console.error('Error fetching data:', error);
        
        let errorMessage = 'Failed to load experience';
        
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

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-light mb-4">Loading experience...</div>
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl">
          <div className="text-white text-2xl font-light mb-4">{error || 'Experience not found'}</div>
          <div className="text-white/60 text-sm">
            Please ensure your Cosmic CMS bucket is properly configured with the required content types.
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const sectionTitles = [
    landingPage.metadata?.title || landingPage.title,
    ...sections.map(section => section.metadata?.title || section.title)
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero 
        landingPage={landingPage}
        onScrollNext={() => {
          if (sections.length > 0) {
            scrollToSection(1);
          }
        }}
      />

      {/* Content Sections */}
      {sections.map((section, index) => (
        <ScrollSection
          key={section.id}
          section={section}
          index={index}
          isActive={currentSection === index + 1}
        />
      ))}

      {/* Navigation - only show if there are sections */}
      {sections.length > 0 && (
        <Navigation
          currentSection={currentSection}
          totalSections={totalSections}
          onSectionChange={scrollToSection}
          sectionTitles={sectionTitles}
        />
      )}
    </main>
  );
}
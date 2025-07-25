'use client';

import { useState, useEffect } from 'react';
import { cosmic } from '@/lib/cosmic';
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
        
        // Fetch landing page data
        const landingPageResponse = await cosmic.objects.findOne({
          type: 'landing-page'
        }).props(['title', 'slug', 'metadata']).depth(1);

        if (!landingPageResponse.object) {
          setError('Landing page not found');
          return;
        }

        setLandingPage(landingPageResponse.object as LandingPage);

        // Fetch sections data separately
        try {
          const sectionsResponse = await cosmic.objects.find({
            type: 'sections'
          }).props(['title', 'slug', 'metadata']).depth(1);

          setSections(sectionsResponse.objects as Section[]);
        } catch (sectionsError) {
          // If sections don't exist, continue with empty array
          console.log('No sections found, continuing with empty sections');
          setSections([]);
        }

      } catch (error) {
        console.error('Error fetching landing page:', error);
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-light">Loading experience...</div>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-light">{error || 'Experience not found'}</div>
      </div>
    );
  }

  const sectionTitles = [
    landingPage.metadata.title,
    ...sections.map(section => section.metadata.title)
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
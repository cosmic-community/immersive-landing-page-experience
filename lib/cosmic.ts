import { createBucketClient } from '@cosmicjs/sdk'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

// Server-side client with full access
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

// Client-side read-only client for browser usage
export const cosmicClient = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG || process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY || process.env.COSMIC_READ_KEY,
})

// Type definitions based on your CMS structure
export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface SectionData {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    body?: string
    images: CosmicImage[]
    cta_button_label?: string
    cta_button_url?: string
  }
}

export interface LandingPageData {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    subtitle?: string
    main_image?: CosmicImage
    sections: SectionData[]
  }
}

// Helper functions for fetching data
export async function getLandingPage(): Promise<LandingPageData | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'landing-page'
    }).depth(1)
    
    return response.object as LandingPageData
  } catch (error) {
    console.error('Error fetching landing page:', error)
    return null
  }
}

export async function getSections(): Promise<SectionData[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'sections'
    }).depth(1)
    
    return response.objects as SectionData[]
  } catch (error) {
    console.error('Error fetching sections:', error)
    return []
  }
}
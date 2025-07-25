import { createBucketClient } from '@cosmicjs/sdk'
import type { LandingPage, Section, CosmicResponse } from '@/types'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

// Client-side cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
})

// Helper functions for fetching data
export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'landing-page'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as LandingPage
  } catch (error: any) {
    console.error('Error fetching landing page:', error)
    if (error?.status === 404) {
      return null
    }
    throw error
  }
}

export async function getSections(): Promise<Section[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'sections'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Section[]
  } catch (error: any) {
    console.error('Error fetching sections:', error)
    if (error?.status === 404) {
      return []
    }
    return []
  }
}
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface SectionMetadata {
  title: string;
  body?: string;
  images?: CosmicImage[];
  cta_button_label?: string;
  cta_button_url?: string;
}

export interface Section extends CosmicObject {
  metadata: SectionMetadata;
}

export interface LandingPageMetadata {
  title: string;
  subtitle?: string;
  main_image?: CosmicImage;
  sections?: Section[];
}

export interface LandingPage extends CosmicObject {
  metadata: LandingPageMetadata;
}

export interface CosmicResponse<T> {
  object?: T;
  objects?: T[];
  total?: number;
}
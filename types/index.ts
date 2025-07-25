export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface SectionMetadata {
  title: string;
  body: string;
  images: CosmicImage[];
  cta_button_label?: string;
  cta_button_url?: string;
}

export interface Section {
  id: string;
  slug: string;
  title: string;
  metadata: SectionMetadata;
}

export interface LandingPageMetadata {
  title: string;
  subtitle: string;
  main_image: CosmicImage;
  sections: Section[];
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  metadata: LandingPageMetadata;
}
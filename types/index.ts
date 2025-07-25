export interface CosmicObject {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface LandingPage extends CosmicObject {
  metadata: {
    title: string;
    subtitle?: string;
    main_image?: CosmicImage;
    sections?: Section[];
  };
}

export interface Section extends CosmicObject {
  metadata: {
    title: string;
    body?: string;
    images?: CosmicImage[];
    cta_button_label?: string;
    cta_button_url?: string;
  };
}
export interface CosmicObject {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface LandingPage extends CosmicObject {
  metadata: {
    title: string;
    subtitle?: string;
    main_image?: {
      imgix_url: string;
      url: string;
    };
  };
}

export interface Section extends CosmicObject {
  metadata: {
    title: string;
    body?: string;
    images?: Array<{
      imgix_url: string;
      url: string;
    }>;
    cta_button_label?: string;
    cta_button_url?: string;
  };
}
export interface Product {
  id: string;
  sku: string;
  brand: string;
  model: string;
  name: string;
  slug: string;
  categorySlug: string;
  primaryCategory: string;
  subCategory?: string;
  type: string;
  doorCount: number;
  doorType: string;
  doorStyle: string;
  widthMm: number;
  depthMm: number;
  heightMm: number;
  widthRange: string;
  capacityLitres: number;
  capacityRange: string;
  price: number;
  tradePrice: number;
  msrp?: number;
  finish: string;
  tempRange: string;
  installation: string;
  use: string;
  power: string;
  plugType?: string;
  powerWatts?: number;
  refrigerant?: string;
  ambientRating?: string;
  energyRating?: string;
  weightKg?: number;
  condition: string;
  availability: string;
  shippingBadge?: string;
  stockQty: number;
  warrantyYears: number;
  warrantyText?: string;
  features: string[];
  shortDescription: string;
  fullDescription: string;
  specs: Record<string, any>;
  dimensionGuide?: {
    requiredCutout: string;
    ventilationClearance: string;
    doorSwingRadius: string;
  };
  frequentlyBoughtTogether?: string[];
  alternatives?: string[];
}

export interface CategoryType {
  name: string;
  slug: string;
  path: string;
}

export interface SubCategory {
  name: string;
  slug: string;
  path: string;
  description: string;
  types: CategoryType[];
}

export interface Category {
  name: string;
  slug: string;
  path: string;
  description: string;
  subcategories: SubCategory[];
}

export interface Brand {
  name: string;
  slug: string;
  country: string;
  warrantyYears: number;
  tag: string;
  description: string;
}

export interface VenueSetup {
  name: string;
  budget: string;
  capacity: string;
  equipment: string[];
  summary: string;
}

export interface Venue {
  name: string;
  slug: string;
  path: string;
  intro: string;
  heroStat: string;
  setups: {
    small: VenueSetup;
    medium: VenueSetup;
    large: VenueSetup;
  };
  relatedCategories: string[];
}

export interface City {
  name: string;
  slug: string;
  state: string;
  metroPostcodeRange: string;
  deliveryTime: string;
  deliveryCost: string;
  regionalNotes: string;
  authorizedServiceAgents: string;
  localDepot: string;
}

export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  warrantyUpgrade?: boolean;
}

/* ============================================================
   DATABASE TYPES
   
   Core types derived from Supabase schema.
   Run `npx supabase gen types typescript` to auto-generate
   from your live database, then merge here.
   ============================================================ */

/* --- Database wrapper for Supabase client typing --- */
export type Database = {
  public: {
    Tables: {
      areas: { Row: Area };
      neighborhoods: { Row: Neighborhood };
      blog_posts: { Row: BlogPost };
      authors: { Row: Author };
      business_listings: { Row: BusinessListing };
      business_categories: { Row: BusinessCategory };
      events: { Row: EventItem };
      event_categories: { Row: EventCategory };
      content_pillars: { Row: ContentPillar };
      tags: { Row: Tag };
      featured_slots: { Row: FeaturedSlot };
      listing_tiers: { Row: ListingTier };
      ad_placements: { Row: AdPlacement };
      scripts: { Row: Script };
    };
  };
};

/* ============================================================
   CORE TYPES
   ============================================================ */

export interface Area {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  area_id?: string;
  area_name?: string;
  description?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image_url?: string;
  author_id?: string;
  pillar_id?: string;
  category?: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  neighborhood_id?: string;
  area_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  image_url?: string;
  role?: string;
  social_links?: Record<string, string>;
  created_at: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  category_name?: string;
  neighborhood_id?: string;
  neighborhood_name?: string;
  area_id?: string;
  image_url?: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  rating?: number;
  review_count?: number;
  tier: "free" | "paid" | "featured" | "premium";
  featured: boolean;
  status: "active" | "pending" | "inactive";
  tags?: string[];
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  icon?: string;
}

export interface EventItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  category_name?: string;
  neighborhood_id?: string;
  neighborhood_name?: string;
  area_id?: string;
  image_url?: string;
  start_date: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  venue_name?: string;
  address?: string;
  ticket_url?: string;
  price?: string;
  featured: boolean;
  status: "upcoming" | "past" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ContentPillar {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface FeaturedSlot {
  id: string;
  slot_key: string; // "homepage_hero", "homepage_featured", etc.
  content_type: "blog_post" | "business" | "event";
  content_id: string;
  position: number;
  active: boolean;
  created_at: string;
}

export interface ListingTier {
  id: string;
  name: string;
  slug: string;
  price_monthly?: number;
  price_yearly?: number;
  features: string[];
  sort_order: number;
}

export interface AdPlacement {
  id: string;
  slot_key: string; // "hero_leaderboard", "sidebar_top", etc.
  page_type?: string;
  area_id?: string;
  neighborhood_id?: string;
  image_url?: string;
  link_url?: string;
  alt_text?: string;
  active: boolean;
  start_date?: string;
  end_date?: string;
}

export interface Script {
  id: string;
  title: string;
  slug: string;
  description?: string;
  video_url?: string;
  thumbnail_url?: string;
  duration?: string;
  content_type: "video" | "podcast" | "instagram";
  neighborhood_id?: string;
  area_id?: string;
  published_at?: string;
  created_at: string;
}

/* ============================================================
   HELPER TYPES — Used across components
   ============================================================ */

// Blog post with joined author info
export interface BlogPostWithAuthor extends BlogPost {
  author?: Author;
}

// Business listing with category and neighborhood
export interface BusinessListingFull extends BusinessListing {
  category?: BusinessCategory;
  neighborhood?: Neighborhood;
}

// Event with category and neighborhood
export interface EventItemFull extends EventItem {
  category?: EventCategory;
  neighborhood?: Neighborhood;
}

// For filter panels
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// Pagination
export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

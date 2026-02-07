import { createServerClient } from "./supabase";
import type {
  BlogPost,
  BlogPostWithAuthor,
  BusinessListing,
  EventItem,
  Neighborhood,
  Area,
  PaginatedResult,
} from "./types";

/* ============================================================
   DATA LAYER — Reusable Supabase queries
   
   No raw Supabase calls in page components.
   All data fetching goes through these functions.
   ============================================================ */

const supabase = createServerClient();
const DEFAULT_PAGE_SIZE = 12;

/* ============================================================
   BLOG POSTS
   ============================================================ */

export async function getFeaturedPosts(limit = 6) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*)")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

export async function getLatestPosts(limit = 10) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

export async function getPostsByPillar(pillarSlug: string, limit = 10) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*), content_pillars!inner(slug)")
    .eq("status", "published")
    .eq("content_pillars.slug", pillarSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

export async function getPostsByNeighborhood(neighborhoodId: string, limit = 10) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*)")
    .eq("status", "published")
    .eq("neighborhood_id", neighborhoodId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

export async function getPostsByArea(areaId: string, limit = 10) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*)")
    .eq("status", "published")
    .eq("area_id", areaId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, authors(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data as BlogPostWithAuthor;
}

/* ============================================================
   BUSINESS LISTINGS
   ============================================================ */

export async function getFeaturedBusinesses(options?: {
  areaId?: string;
  neighborhoodId?: string;
  categorySlug?: string;
  limit?: number;
}) {
  const { areaId, neighborhoodId, categorySlug, limit = 6 } = options ?? {};

  let query = supabase
    .from("business_listings")
    .select("*")
    .eq("status", "active")
    .eq("featured", true)
    .order("tier", { ascending: false }) // premium first
    .order("created_at", { ascending: false });

  if (areaId) query = query.eq("area_id", areaId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);

  const { data, error } = await query.limit(limit);
  if (error) throw error;
  return (data ?? []) as BusinessListing[];
}

export async function getBusinesses(options?: {
  areaId?: string;
  neighborhoodId?: string;
  categorySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const {
    areaId,
    neighborhoodId,
    search,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = options ?? {};

  let query = supabase
    .from("business_listings")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("tier", { ascending: false })
    .order("name", { ascending: true });

  if (areaId) query = query.eq("area_id", areaId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);
  if (search) query = query.ilike("name", `%${search}%`);

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data ?? []) as BusinessListing[],
    page,
    pageSize,
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  } satisfies PaginatedResult<BusinessListing>;
}

export async function getBusinessBySlug(slug: string) {
  const { data, error } = await supabase
    .from("business_listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as BusinessListing;
}

/* ============================================================
   EVENTS
   ============================================================ */

export async function getUpcomingEvents(options?: {
  areaId?: string;
  neighborhoodId?: string;
  categorySlug?: string;
  limit?: number;
}) {
  const { areaId, neighborhoodId, limit = 6 } = options ?? {};

  let query = supabase
    .from("events")
    .select("*")
    .eq("status", "upcoming")
    .order("featured", { ascending: false })
    .order("start_date", { ascending: true });

  if (areaId) query = query.eq("area_id", areaId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);

  const { data, error } = await query.limit(limit);
  if (error) throw error;
  return (data ?? []) as EventItem[];
}

export async function getEvents(options?: {
  status?: "upcoming" | "past";
  areaId?: string;
  neighborhoodId?: string;
  categorySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const {
    status = "upcoming",
    areaId,
    neighborhoodId,
    search,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = options ?? {};

  let query = supabase
    .from("events")
    .select("*", { count: "exact" })
    .eq("status", status)
    .order("featured", { ascending: false })
    .order("start_date", { ascending: status === "upcoming" });

  if (areaId) query = query.eq("area_id", areaId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);
  if (search) query = query.ilike("name", `%${search}%`);

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data ?? []) as EventItem[],
    page,
    pageSize,
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  } satisfies PaginatedResult<EventItem>;
}

/* ============================================================
   AREAS & NEIGHBORHOODS
   ============================================================ */

export async function getAreas() {
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Area[];
}

export async function getAreaBySlug(slug: string) {
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Area;
}

export async function getNeighborhoods(options?: {
  areaId?: string;
  search?: string;
  limit?: number;
}) {
  const { areaId, search, limit } = options ?? {};

  let query = supabase
    .from("neighborhoods")
    .select("*")
    .order("name", { ascending: true });

  if (areaId) query = query.eq("area_id", areaId);
  if (search) query = query.ilike("name", `%${search}%`);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Neighborhood[];
}

export async function getNeighborhoodBySlug(slug: string) {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Neighborhood;
}

export async function getNeighborhoodsByArea(areaId: string) {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("area_id", areaId)
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Neighborhood[];
}

/* ============================================================
   CATEGORIES & TAGS
   ============================================================ */

export async function getBusinessCategories() {
  const { data, error } = await supabase
    .from("business_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getEventCategories() {
  const { data, error } = await supabase
    .from("event_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/* ============================================================
   FEATURED SLOTS — Admin-managed featured content
   ============================================================ */

export async function getFeaturedSlots(slotKey: string) {
  const { data, error } = await supabase
    .from("featured_slots")
    .select("*")
    .eq("slot_key", slotKey)
    .eq("active", true)
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

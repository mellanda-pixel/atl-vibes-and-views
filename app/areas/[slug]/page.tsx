"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Calendar,
  ArrowRight,
  Heart,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   AREA DATA — Will be replaced with Supabase queries
   ============================================================ */
const AREA_DATA: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    heroImage: string;
    neighborhoods: { name: string; slug: string; postCount: number }[];
    stats: { label: string; value: string }[];
  }
> = {
  buckhead: {
    name: "Buckhead",
    tagline: "Atlanta's uptown playground — dining, shopping, and nightlife.",
    description:
      "Buckhead is the luxury heartbeat of Atlanta. Known for its high-end shopping at Phipps Plaza and Lenox Square, fine dining scene, and tree-lined residential streets, this neighborhood blends Southern charm with urban sophistication. Whether you're exploring the Atlanta History Center or sampling world-class cuisine along Peachtree Road, Buckhead delivers.",
    heroImage: "https://placehold.co/1400x500/1a1a1a/e6c46d?text=Buckhead",
    neighborhoods: [
      { name: "Peachtree Hills", slug: "peachtree-hills", postCount: 8 },
      { name: "Chastain Park", slug: "chastain-park", postCount: 12 },
      { name: "Tuxedo Park", slug: "tuxedo-park", postCount: 5 },
      { name: "Garden Hills", slug: "garden-hills", postCount: 7 },
      { name: "Lenox", slug: "lenox", postCount: 15 },
      { name: "Pharr Road", slug: "pharr-road", postCount: 9 },
    ],
    stats: [
      { label: "Businesses", value: "420+" },
      { label: "Restaurants", value: "180+" },
      { label: "Stories", value: "95" },
      { label: "Events", value: "24" },
    ],
  },
  midtown: {
    name: "Midtown",
    tagline: "Arts, culture, and the beating heart of Atlanta's creative scene.",
    description:
      "Midtown is Atlanta's cultural center, home to the High Museum of Art, Fox Theatre, Piedmont Park, and the Atlanta Botanical Garden. Its walkable streets, vibrant nightlife, and growing restaurant scene make it one of the most desirable neighborhoods in the city. The Midtown Mile along Peachtree Street is a showcase of new development and urban energy.",
    heroImage: "https://placehold.co/1400x500/c1121f/ffffff?text=Midtown",
    neighborhoods: [
      { name: "Ansley Park", slug: "ansley-park", postCount: 11 },
      { name: "Home Park", slug: "home-park", postCount: 6 },
      { name: "Atlantic Station", slug: "atlantic-station", postCount: 14 },
      { name: "Piedmont Park", slug: "piedmont-park", postCount: 18 },
      { name: "Arts Center", slug: "arts-center", postCount: 9 },
    ],
    stats: [
      { label: "Businesses", value: "350+" },
      { label: "Restaurants", value: "210+" },
      { label: "Stories", value: "120" },
      { label: "Events", value: "38" },
    ],
  },
  downtown: {
    name: "Downtown",
    tagline: "Where Atlanta's history meets its skyline.",
    description:
      "Downtown Atlanta is the civic and commercial core of the city. From Centennial Olympic Park and the Georgia Aquarium to the Mercedes-Benz Stadium, this is where Atlanta's biggest moments happen. The area is seeing a renaissance with new residential developments, restaurants, and public spaces breathing fresh energy into the historic center.",
    heroImage: "https://placehold.co/1400x500/4a4a4a/ffffff?text=Downtown",
    neighborhoods: [
      { name: "Centennial Hill", slug: "centennial-hill", postCount: 10 },
      { name: "Castleberry Hill", slug: "castleberry-hill", postCount: 8 },
      { name: "South Downtown", slug: "south-downtown", postCount: 13 },
      { name: "Five Points", slug: "five-points", postCount: 7 },
      { name: "Sweet Auburn", slug: "sweet-auburn", postCount: 15 },
    ],
    stats: [
      { label: "Businesses", value: "280+" },
      { label: "Restaurants", value: "95+" },
      { label: "Stories", value: "88" },
      { label: "Events", value: "42" },
    ],
  },
  eastside: {
    name: "Eastside",
    tagline: "Atlanta's creative edge — murals, music, and community.",
    description:
      "The Eastside is where Atlanta's independent spirit thrives. From the eclectic shops of Little Five Points to the BeltLine's Eastside Trail, the cultural energy here is unmatched. Neighborhoods like Inman Park, Old Fourth Ward, and East Atlanta Village each have their own distinct personality, united by a love of local business, street art, and community gathering.",
    heroImage: "https://placehold.co/1400x500/e6c46d/1a1a1a?text=Eastside",
    neighborhoods: [
      { name: "Inman Park", slug: "inman-park", postCount: 22 },
      { name: "Old Fourth Ward", slug: "old-fourth-ward", postCount: 18 },
      { name: "Little Five Points", slug: "little-five-points", postCount: 14 },
      { name: "East Atlanta Village", slug: "east-atlanta-village", postCount: 11 },
      { name: "Kirkwood", slug: "kirkwood", postCount: 9 },
      { name: "Reynoldstown", slug: "reynoldstown", postCount: 12 },
    ],
    stats: [
      { label: "Businesses", value: "310+" },
      { label: "Restaurants", value: "145+" },
      { label: "Stories", value: "105" },
      { label: "Events", value: "30" },
    ],
  },
  westside: {
    name: "Westside",
    tagline: "Where Atlanta reinvents itself — food, design, and development.",
    description:
      "Atlanta's Westside is in the middle of one of the most exciting transformations in the city. Anchored by the Westside Provisions District and the growing Upper Westside corridor, this area is a magnet for innovative restaurants, design studios, and mixed-use developments. The Westside BeltLine is expanding, connecting more communities to this rapidly evolving district.",
    heroImage: "https://placehold.co/1400x500/1a1a1a/fee198?text=Westside",
    neighborhoods: [
      { name: "West Midtown", slug: "west-midtown", postCount: 20 },
      { name: "Westside Provisions", slug: "westside-provisions", postCount: 16 },
      { name: "Bankhead", slug: "bankhead", postCount: 8 },
      { name: "Grove Park", slug: "grove-park", postCount: 6 },
      { name: "English Avenue", slug: "english-avenue", postCount: 10 },
    ],
    stats: [
      { label: "Businesses", value: "195+" },
      { label: "Restaurants", value: "88+" },
      { label: "Stories", value: "72" },
      { label: "Events", value: "18" },
    ],
  },
  "north-atlanta": {
    name: "North Atlanta",
    tagline: "Suburban sophistication meets Southern living.",
    description:
      "North Atlanta encompasses the thriving communities stretching from Sandy Springs to Dunwoody and beyond. Known for excellent schools, diverse dining scenes, and rapidly growing commercial corridors along GA-400, this region offers a blend of suburban comfort and urban convenience.",
    heroImage: "https://placehold.co/1400x500/333333/fee198?text=North+Atlanta",
    neighborhoods: [
      { name: "Sandy Springs", slug: "sandy-springs", postCount: 14 },
      { name: "Dunwoody", slug: "dunwoody", postCount: 11 },
      { name: "Brookhaven", slug: "brookhaven", postCount: 16 },
      { name: "Chamblee", slug: "chamblee", postCount: 9 },
      { name: "Doraville", slug: "doraville", postCount: 7 },
    ],
    stats: [
      { label: "Businesses", value: "260+" },
      { label: "Restaurants", value: "120+" },
      { label: "Stories", value: "65" },
      { label: "Events", value: "22" },
    ],
  },
  "south-atlanta": {
    name: "South Atlanta",
    tagline: "Deep roots, rising potential — Atlanta's next chapter.",
    description:
      "South Atlanta is a region rich in history and poised for growth. From the revitalization along the BeltLine's Southside Trail to the vibrant communities in neighborhoods like Pittsburgh and Summerhill, the southside is where Atlanta's legacy meets its future. New development is bringing fresh energy while respecting the deep cultural roots that define these communities.",
    heroImage: "https://placehold.co/1400x500/c1121f/fee198?text=South+Atlanta",
    neighborhoods: [
      { name: "Summerhill", slug: "summerhill", postCount: 13 },
      { name: "Pittsburgh", slug: "pittsburgh", postCount: 7 },
      { name: "Adair Park", slug: "adair-park", postCount: 8 },
      { name: "Capitol View", slug: "capitol-view", postCount: 6 },
      { name: "Lakewood Heights", slug: "lakewood-heights", postCount: 5 },
    ],
    stats: [
      { label: "Businesses", value: "140+" },
      { label: "Restaurants", value: "55+" },
      { label: "Stories", value: "48" },
      { label: "Events", value: "15" },
    ],
  },
  "southeast-atlanta": {
    name: "Southeast Atlanta",
    tagline: "Community, culture, and neighborhood charm.",
    description:
      "Southeast Atlanta offers a mix of established neighborhoods and emerging communities. Areas like East Atlanta Village, Grant Park, and Ormewood Park combine tree-lined streets with local shops, restaurants, and a strong sense of community pride. The continued expansion of the BeltLine is bringing new connections and investment to these neighborhoods.",
    heroImage: "https://placehold.co/1400x500/4a4a4a/e6c46d?text=Southeast+Atlanta",
    neighborhoods: [
      { name: "Grant Park", slug: "grant-park", postCount: 15 },
      { name: "Ormewood Park", slug: "ormewood-park", postCount: 10 },
      { name: "East Point", slug: "east-point", postCount: 8 },
      { name: "Boulevard Heights", slug: "boulevard-heights", postCount: 6 },
    ],
    stats: [
      { label: "Businesses", value: "165+" },
      { label: "Restaurants", value: "70+" },
      { label: "Stories", value: "55" },
      { label: "Events", value: "16" },
    ],
  },
  "southwest-atlanta": {
    name: "Southwest Atlanta",
    tagline: "Heritage, HBCU pride, and homegrown culture.",
    description:
      "Southwest Atlanta is home to the Atlanta University Center — the largest consortium of HBCUs in the country — and neighborhoods steeped in civil rights history. From the West End to Cascade Heights, this part of the city combines deep cultural significance with growing investment and community-led development.",
    heroImage: "https://placehold.co/1400x500/1a1a1a/c1121f?text=Southwest+Atlanta",
    neighborhoods: [
      { name: "West End", slug: "west-end", postCount: 14 },
      { name: "Cascade Heights", slug: "cascade-heights", postCount: 10 },
      { name: "Venetian Hills", slug: "venetian-hills", postCount: 5 },
      { name: "Adams Park", slug: "adams-park", postCount: 7 },
      { name: "Ben Hill", slug: "ben-hill", postCount: 4 },
    ],
    stats: [
      { label: "Businesses", value: "155+" },
      { label: "Restaurants", value: "65+" },
      { label: "Stories", value: "52" },
      { label: "Events", value: "19" },
    ],
  },
};

/* Placeholder stories for all areas */
const AREA_STORIES = [
  {
    slug: "new-development-breaking-ground",
    title: "Breaking Ground: New Mixed-Use Development Announced",
    category: "Development",
    image: "https://placehold.co/600x400/1a1a1a/e6c46d?text=Development",
    date: "Feb 5, 2026",
  },
  {
    slug: "best-weekend-brunch-spots",
    title: "The 8 Best Weekend Brunch Spots You Need to Try",
    category: "Eats & Drinks",
    image: "https://placehold.co/600x400/c1121f/ffffff?text=Brunch",
    date: "Feb 3, 2026",
  },
  {
    slug: "local-artist-mural-project",
    title: "Local Artist Transforms Walls Into Community Galleries",
    category: "Culture",
    image: "https://placehold.co/600x400/e6c46d/1a1a1a?text=Murals",
    date: "Feb 1, 2026",
  },
  {
    slug: "neighborhood-market-opening",
    title: "New Neighborhood Market Brings Fresh Groceries and Local Vendors",
    category: "Business",
    image: "https://placehold.co/600x400/4a4a4a/ffffff?text=Market",
    date: "Jan 29, 2026",
  },
];

const AREA_BUSINESSES = [
  {
    slug: "the-local-bistro",
    name: "The Local Bistro",
    category: "Restaurant",
    rating: 4.6,
    reviewCount: 87,
    image: "https://placehold.co/400x260/c1121f/fee198?text=Bistro",
    featured: true,
  },
  {
    slug: "urban-grind-coffee",
    name: "Urban Grind Coffee",
    category: "Café",
    rating: 4.8,
    reviewCount: 156,
    image: "https://placehold.co/400x260/e6c46d/1a1a1a?text=Coffee",
    featured: false,
  },
  {
    slug: "atl-fitness-studio",
    name: "ATL Fitness Studio",
    category: "Fitness",
    rating: 4.5,
    reviewCount: 63,
    image: "https://placehold.co/400x260/4a4a4a/ffffff?text=Fitness",
    featured: false,
  },
  {
    slug: "golden-hour-bar",
    name: "Golden Hour Bar",
    category: "Bar",
    rating: 4.4,
    reviewCount: 94,
    image: "https://placehold.co/400x260/1a1a1a/fee198?text=Bar",
    featured: true,
  },
];

const AREA_EVENTS = [
  {
    slug: "neighborhood-block-party",
    name: "Neighborhood Block Party",
    date: "March 8, 2026",
    month: "MAR",
    day: "8",
    neighborhood: "",
    category: "Community",
  },
  {
    slug: "local-farmers-market",
    name: "Saturday Farmers Market",
    date: "Every Saturday",
    month: "SAT",
    day: "AM",
    neighborhood: "",
    category: "Market",
  },
  {
    slug: "art-walk-gallery-hop",
    name: "Art Walk & Gallery Hop",
    date: "March 15, 2026",
    month: "MAR",
    day: "15",
    neighborhood: "",
    category: "Arts",
  },
  {
    slug: "live-music-sundays",
    name: "Live Music Sundays",
    date: "Every Sunday",
    month: "SUN",
    day: "PM",
    neighborhood: "",
    category: "Music",
  },
];

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = AREA_DATA[params.slug];

  if (!area) {
    notFound();
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full">
        <div className="relative w-full aspect-[21/7] md:aspect-[21/6] overflow-hidden">
          <Image
            src={area.heroImage}
            alt={area.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-gold-dark text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">
            Explore Atlanta
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-hero font-semibold text-white">
            {area.name}
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl">
            {area.tagline}
          </p>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="bg-[#1a1a1a]">
        <div className="site-container py-5">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {area.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-gold-light font-display text-2xl md:text-3xl font-semibold">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.1em] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BREADCRUMB ========== */}
      <div className="site-container pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-mid">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/neighborhoods" className="hover:text-black transition-colors">
            Areas
          </Link>
          <ChevronRight size={12} />
          <span className="text-black font-medium">{area.name}</span>
        </nav>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="site-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* --- Main Column --- */}
          <div>
            {/* About Section */}
            <section className="mb-14">
              <h2 className="font-display text-section-sm md:text-section font-semibold text-black mb-4">
                About {area.name}
              </h2>
              <p className="text-gray-dark leading-relaxed text-base">
                {area.description}
              </p>
            </section>

            {/* ===== STORIES FROM THIS AREA ===== */}
            <section className="mb-14">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-red-brand text-[11px] font-semibold uppercase tracking-[0.1em] block mb-1">
                    Stories
                  </span>
                  <h2 className="font-display text-section-sm font-semibold text-black">
                    Latest from {area.name}
                  </h2>
                </div>
                <Link
                  href={`/stories?area=${params.slug}`}
                  className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-eyebrow text-red-brand hover:text-black transition-colors"
                >
                  All Stories <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {AREA_STORIES.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden mb-3">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-red-brand text-[11px] font-semibold uppercase tracking-eyebrow">
                      {story.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-black leading-snug mt-1 group-hover:text-red-brand transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-mid text-xs mt-2">{story.date}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== BUSINESSES ===== */}
            <section className="mb-14">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-red-brand text-[11px] font-semibold uppercase tracking-[0.1em] block mb-1">
                    Directory
                  </span>
                  <h2 className="font-display text-section-sm font-semibold text-black">
                    {area.name} Businesses
                  </h2>
                </div>
                <Link
                  href={`/hub/businesses?area=${params.slug}`}
                  className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-eyebrow text-red-brand hover:text-black transition-colors"
                >
                  All Businesses <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {AREA_BUSINESSES.map((biz) => (
                  <Link
                    key={biz.slug}
                    href={`/hub/businesses/${biz.slug}`}
                    className="group border border-gray-100 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={biz.image}
                        alt={biz.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {biz.featured && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-brand text-white text-[10px] font-semibold uppercase tracking-eyebrow">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-red-brand text-[10px] font-semibold uppercase tracking-eyebrow">
                        {biz.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-black mt-1 group-hover:text-red-brand transition-colors">
                        {biz.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < Math.round(biz.rating)
                                  ? "fill-gold-dark text-gold-dark"
                                  : "text-gray-mid/30"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-mid">
                          {biz.rating} ({biz.reviewCount})
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== EVENTS ===== */}
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-red-brand text-[11px] font-semibold uppercase tracking-[0.1em] block mb-1">
                    Happening
                  </span>
                  <h2 className="font-display text-section-sm font-semibold text-black">
                    What's Happening in {area.name}
                  </h2>
                </div>
                <Link
                  href={`/hub/events?area=${params.slug}`}
                  className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-eyebrow text-red-brand hover:text-black transition-colors"
                >
                  All Events <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-0 divide-y divide-gray-100">
                {AREA_EVENTS.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/hub/events/${event.slug}`}
                    className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* Date block */}
                    <div className="shrink-0 w-14 h-14 bg-red-brand text-white flex flex-col items-center justify-center">
                      <span className="text-[10px] font-semibold uppercase">
                        {event.month}
                      </span>
                      <span className="text-lg font-display font-bold leading-none">
                        {event.day}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-base font-semibold text-black group-hover:text-red-brand transition-colors truncate">
                        {event.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-mid mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {event.date}
                        </span>
                        <span>{event.category}</span>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-gray-mid group-hover:text-red-brand transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* --- Sidebar --- */}
          <aside className="space-y-8">
            {/* Neighborhoods Widget */}
            <div className="border border-gray-100 p-5">
              <h4 className="font-display text-lg font-semibold mb-4">
                {area.name} Neighborhoods
              </h4>
              <ul className="space-y-1.5">
                {area.neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/neighborhoods/${n.slug}`}
                      className="flex items-center justify-between text-sm text-gray-dark hover:text-black transition-colors py-1.5"
                    >
                      <span>{n.name}</span>
                      <span className="text-xs text-gray-mid">
                        {n.postCount} stories
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-gold-light p-5">
              <h4 className="font-display text-lg font-semibold mb-2">
                {area.name} Updates
              </h4>
              <p className="text-sm text-gray-dark mb-4">
                Get the latest stories, events, and business openings from{" "}
                {area.name} delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2.5 text-sm border border-black/10 bg-white outline-none focus:border-black transition-colors mb-3"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-eyebrow hover:bg-gray-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Submit CTA */}
            <div className="bg-[#1a1a1a] p-5 text-white">
              <h4 className="font-display text-lg font-semibold mb-2">
                Own a Business in {area.name}?
              </h4>
              <p className="text-sm text-white/60 mb-4">
                Get your business in front of thousands of Atlantans.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center px-4 py-2 bg-gold-light text-black text-xs font-semibold uppercase tracking-eyebrow hover:bg-gold-dark transition-colors"
              >
                Get Listed
              </Link>
            </div>

            {/* Ad Placeholder */}
            <div className="bg-gray-light flex items-center justify-center">
              <div className="w-[300px] h-[250px] flex items-center justify-center border border-dashed border-gray-mid/30">
                <span className="text-xs text-gray-mid uppercase tracking-eyebrow">
                  Ad — Sidebar
                </span>
              </div>
            </div>

            {/* Other Areas Widget */}
            <div className="border border-gray-100 p-5">
              <h4 className="font-display text-lg font-semibold mb-4">
                Explore Other Areas
              </h4>
              <ul className="space-y-1.5">
                {Object.entries(AREA_DATA)
                  .filter(([slug]) => slug !== params.slug)
                  .slice(0, 6)
                  .map(([slug, data]) => (
                    <li key={slug}>
                      <Link
                        href={`/areas/${slug}`}
                        className="flex items-center justify-between text-sm text-gray-dark hover:text-black transition-colors py-1.5"
                      >
                        <span>{data.name}</span>
                        <ArrowRight size={14} className="text-gray-mid" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href="/neighborhoods"
                className="inline-block mt-4 text-xs font-semibold uppercase tracking-eyebrow text-red-brand hover:text-black transition-colors"
              >
                See All Areas →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

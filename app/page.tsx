"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  MapPin,
  Star,
  ArrowRight,
  Send,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

/* ============================================================
   PLACEHOLDER DATA — Will be replaced with Supabase queries
   ============================================================ */

const FEATURED_STORY = {
  slug: "westside-rise-atlanta-neighborhood",
  title:
    "The Rise of Westside: How Atlanta's Most Dynamic Neighborhood Is Rewriting the Rules",
  category: "Development",
  image: "https://placehold.co/1920x900/1a1a1a/e6c46d?text=Featured+Story",
  author: "ATL Vibes & Views",
  date: "Feb 5, 2026",
};

const LATEST_STORIES = [
  {
    slug: "best-new-restaurants-atlanta-2026",
    title: "The 12 Best New Restaurants in Atlanta Right Now",
    category: "Eats & Drinks",
    tag: "Dining",
    image: "https://placehold.co/600x400/c1121f/ffffff?text=Restaurants",
    date: "Feb 4, 2026",
  },
  {
    slug: "beltline-eastside-trail-update",
    title: "BeltLine Eastside Trail Gets a Major Upgrade This Spring",
    category: "Development",
    tag: "BeltLine",
    image: "https://placehold.co/600x400/1a1a1a/e6c46d?text=BeltLine",
    date: "Feb 3, 2026",
  },
  {
    slug: "atlanta-art-scene-2026",
    title: "Inside Atlanta's Booming Art Scene: Galleries You Need to Visit",
    category: "Culture",
    tag: "Arts",
    image: "https://placehold.co/600x400/4a4a4a/ffffff?text=Art+Scene",
    date: "Feb 2, 2026",
  },
];

const FEATURED_BUSINESSES = [
  {
    slug: "the-optimist",
    name: "The Optimist",
    category: "Restaurant",
    neighborhood: "Westside",
    rating: 4.7,
    reviewCount: 128,
    image: "https://placehold.co/400x280/c1121f/fee198?text=Restaurant",
    featured: true,
  },
  {
    slug: "ponce-city-market",
    name: "Ponce City Market",
    category: "Food Hall",
    neighborhood: "Midtown",
    rating: 4.5,
    reviewCount: 342,
    image: "https://placehold.co/400x280/4a4a4a/ffffff?text=Market",
    featured: true,
  },
  {
    slug: "sweet-auburn-curb-market",
    name: "Sweet Auburn Curb Market",
    category: "Market",
    neighborhood: "Downtown",
    rating: 4.3,
    reviewCount: 89,
    image: "https://placehold.co/400x280/e6c46d/1a1a1a?text=Market",
    featured: false,
  },
];

const FEATURED_EVENTS = [
  {
    slug: "atlanta-food-wine-festival-2026",
    name: "Atlanta Food & Wine Festival",
    category: "Festival",
    neighborhood: "Midtown",
    image: "https://placehold.co/400x280/c1121f/ffffff?text=Festival",
    month: "MAR",
    day: "15",
    featured: true,
  },
  {
    slug: "beltline-lantern-parade",
    name: "BeltLine Lantern Parade",
    category: "Community",
    neighborhood: "Eastside",
    image: "https://placehold.co/400x280/e6c46d/1a1a1a?text=Parade",
    month: "MAR",
    day: "22",
    featured: false,
  },
  {
    slug: "westside-comedy-night",
    name: "Westside Comedy Night",
    category: "Nightlife",
    neighborhood: "Westside",
    image: "https://placehold.co/400x280/4a4a4a/ffffff?text=Comedy",
    month: "FEB",
    day: "28",
    featured: false,
  },
];

const AREAS = [
  { name: "Buckhead", slug: "buckhead" },
  { name: "Midtown", slug: "midtown" },
  { name: "Downtown", slug: "downtown" },
  { name: "Eastside", slug: "eastside" },
  { name: "Westside", slug: "westside" },
  { name: "North Atlanta", slug: "north-atlanta" },
  { name: "South Atlanta", slug: "south-atlanta" },
  { name: "Southeast Atlanta", slug: "southeast-atlanta" },
  { name: "Southwest Atlanta", slug: "southwest-atlanta" },
];

/* Video section — placeholder data only (no Supabase table yet) */
const MAIN_VIDEO = {
  title: "Living in Atlanta: Why Everyone Is Moving Here",
  category: "News",
  thumbnail: "https://placehold.co/800x450/1a1a1a/ffffff?text=YouTube+Video",
};

const SOCIAL_VIDEOS = [
  {
    id: "1",
    title: "Atlanta's Best Kept Secret Neighborhoods",
    category: "News",
    thumbnail: "https://placehold.co/160x100/c1121f/ffffff?text=Video+1",
  },
  {
    id: "2",
    title: "The History of Iconic Atlanta Food Scenes",
    category: "Culture",
    thumbnail: "https://placehold.co/160x100/1a1a1a/e6c46d?text=Video+2",
  },
  {
    id: "3",
    title: "Where Locals Actually Eat in Midtown",
    category: "Eats",
    thumbnail: "https://placehold.co/160x100/4a4a4a/ffffff?text=Video+3",
  },
  {
    id: "4",
    title: "BeltLine Walking Tour You Need to Try",
    category: "Things to Do",
    thumbnail: "https://placehold.co/160x100/e6c46d/1a1a1a?text=Video+4",
  },
  {
    id: "5",
    title: "Atlanta's New Season Style Guide",
    category: "Style",
    thumbnail: "https://placehold.co/160x100/c1121f/ffffff?text=Video+5",
  },
];

/* ============================================================
   HOMEPAGE
   ============================================================ */
export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollVideos = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ========== HERO — Full-width with overlay ========== */}
      <section className="relative w-full">
        <Link
          href={`/stories/${FEATURED_STORY.slug}`}
          className="block relative group"
        >
          <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <Image
              src={FEATURED_STORY.image}
              alt={FEATURED_STORY.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
            <span className="inline-block px-5 py-1.5 bg-gold-light text-black text-[10px] font-semibold uppercase tracking-eyebrow rounded-full mb-5">
              {FEATURED_STORY.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-white max-w-5xl leading-tight italic">
              {FEATURED_STORY.title}
            </h1>
            <p className="text-white/50 text-sm mt-5 uppercase tracking-wide">
              By {FEATURED_STORY.author} &middot; {FEATURED_STORY.date}
            </p>
          </div>
        </Link>
      </section>

      {/* ========== MAIN CONTENT + SIDEBAR ========== */}
      <div className="site-container py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          <div className="space-y-20">
            {/* ===== EDITOR'S PICKS ===== */}
            <section>
              <SectionHeader
                eyebrow="Latest"
                title="Editor&rsquo;s Picks"
                href="/stories"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {LATEST_STORIES.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden mb-5">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gold-light text-black text-[10px] font-semibold uppercase tracking-eyebrow rounded-full">
                        {story.category}
                      </span>
                      {story.tag && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-mid text-[10px] font-semibold uppercase tracking-eyebrow rounded-full">
                          {story.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-black leading-snug group-hover:text-red-brand transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-mid text-xs mt-3 uppercase tracking-wide">
                      {story.date}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== EXPLORE ATLANTA ===== */}
            <section>
              <SectionHeader
                eyebrow="Neighborhoods"
                title="Explore Atlanta"
              />
              <div className="relative overflow-hidden bg-[#f5f0eb] aspect-[16/7]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-gold-light/50 flex items-center justify-center mb-4">
                    <MapPin size={28} className="text-black" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-black mb-2">
                    Interactive Map Coming Soon
                  </h3>
                  <p className="text-gray-mid text-sm max-w-md">
                    Explore 9 areas and 243 neighborhoods across Atlanta
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {AREAS.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="px-4 py-2 bg-gold-light text-black text-xs font-semibold uppercase tracking-eyebrow rounded-full hover:bg-gold-dark transition-colors"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== VIDEO SECTION — placeholder only ===== */}
            <section>
              <SectionHeader
                eyebrow="Watch"
                title="Recent Video"
                subtitle="Stay up-to-date"
                href="/media"
              />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
                {/* Main YouTube Video */}
                <div className="relative aspect-video bg-black overflow-hidden group cursor-pointer">
                  <Image
                    src={MAIN_VIDEO.thumbnail}
                    alt={MAIN_VIDEO.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Play
                        size={28}
                        className="text-black ml-1 fill-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Sidebar — vertical scroll with gold accent */}
                <div className="relative">
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <button
                      onClick={() => scrollVideos("left")}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => scrollVideos("right")}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div
                    ref={scrollRef}
                    className="space-y-4 max-h-[360px] overflow-y-auto pr-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#fee198 transparent",
                    }}
                  >
                    {SOCIAL_VIDEOS.map((video) => (
                      <div
                        key={video.id}
                        className="flex gap-4 group/vid cursor-pointer"
                      >
                        <div className="relative w-[120px] h-[75px] shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                              <Play
                                size={12}
                                className="text-black ml-0.5 fill-black"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-gray-mid">
                            {video.category}
                          </span>
                          <h4 className="text-sm font-semibold text-black leading-snug mt-0.5 group-hover/vid:text-red-brand transition-colors line-clamp-2">
                            {video.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ===== EATS & DRINKS ===== */}
            <section>
              <SectionHeader
                eyebrow="Eats & Drinks"
                title="Where to Eat in Atlanta"
                href="/hub/eats-and-drinks"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {FEATURED_BUSINESSES.map((biz) => (
                  <Link
                    key={biz.slug}
                    href={`/hub/businesses/${biz.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={biz.image}
                          alt={biz.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart size={16} className="text-gray-mid" />
                        </button>
                        {biz.featured && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-gold-light text-black text-[10px] font-semibold uppercase tracking-eyebrow rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="pt-4">
                        <h3 className="font-display text-lg font-semibold text-black group-hover:text-red-brand transition-colors">
                          {biz.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="flex items-center gap-1 text-sm text-gray-mid">
                            <MapPin size={13} />
                            {biz.neighborhood}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="fill-amber-400 text-amber-400"
                            />
                            <span className="text-sm font-semibold text-black">
                              {biz.rating}
                            </span>
                            <span className="text-xs text-gray-mid">
                              ({biz.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== EVENTS ===== */}
            <section>
              <SectionHeader
                eyebrow="Events"
                title="What&rsquo;s Happening"
                href="/hub/events"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {FEATURED_EVENTS.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/hub/events/${event.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Date badge — ON IMAGE ONLY */}
                        <div className="absolute bottom-3 right-3 bg-white text-center px-3 py-2 shadow-md z-10">
                          <div className="text-[10px] font-semibold uppercase tracking-wide text-red-brand leading-none">
                            {event.month}
                          </div>
                          <div className="text-xl font-bold text-black leading-tight">
                            {event.day}
                          </div>
                        </div>
                        {event.featured && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-gold-light text-black text-[10px] font-semibold uppercase tracking-eyebrow rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="pt-4">
                        <span className="px-3 py-1 bg-gold-light text-black text-[10px] font-semibold uppercase tracking-eyebrow rounded-full">
                          {event.category}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-black mt-3 group-hover:text-red-brand transition-colors">
                          {event.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-mid">
                          <MapPin size={13} />
                          {event.neighborhood}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ===== NEWSLETTER — Chronicle style ===== */}
            <section className="bg-[#f8f5f0] py-14 px-8 md:px-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-2 italic">
                The ATL Newsletter
              </h2>
              <p className="text-gray-mid text-sm mb-8">
                Get the latest on Atlanta&rsquo;s culture, neighborhoods, and
                events.
              </p>
              <form
                className="flex items-center max-w-lg mx-auto bg-white rounded-full overflow-hidden shadow-sm border border-gray-200"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 px-6 py-4 text-sm outline-none bg-transparent placeholder:text-gray-mid"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-eyebrow rounded-full mr-1 hover:bg-gray-dark transition-colors"
                >
                  <Send size={14} />
                  Subscribe
                </button>
              </form>
              <p className="text-gray-mid/60 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </section>
          </div>

          {/* --- Sidebar --- */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   SECTION HEADER
   ============================================================ */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
      <div className="flex items-baseline gap-4">
        <div>
          <span className="text-red-brand text-[11px] font-semibold uppercase tracking-eyebrow">
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-black leading-tight mt-1">
            {title}
          </h2>
        </div>
        {subtitle && (
          <>
            <span className="hidden md:block w-px h-6 bg-gray-200" />
            <span className="hidden md:block text-gray-mid text-sm">
              {subtitle}
            </span>
          </>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-eyebrow text-black hover:text-red-brand transition-colors shrink-0 pb-1"
        >
          See All <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  Sidebar,
  NewsletterWidget,
  AdPlacement,
  SubmitCTA,
  SubmitEventCTA,
} from "@/components/Sidebar";

/* ============================================================
   TYPES
   ============================================================ */

export interface LandingCardItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  hero_image_url?: string | null;
}

export type LandingFeedItem =
  | { kind: "blog"; id: string; title: string; slug: string; image?: string; category?: string; date?: string }
  | { kind: "video"; id: string; title: string; slug: string; embed_url?: string; date?: string };

export interface AreaLandingContentProps {
  /* Hero */
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  heroVideoUrl?: string | null;
  heroImageUrl: string;

  /* Search */
  search?: string;
  searchResultsLabel: string;
  filteredCards?: LandingCardItem[];

  /* Cards grid */
  cards: LandingCardItem[];
  cardLinkPrefix: string;
  cardsEmptyText: string;

  /* Map CTA */
  mapCtaText: string;
  mapCtaHref: string;

  /* Masonry feed */
  feedEyebrow: string;
  feedTitle: string;
  feedSeeAllHref: string;
  feed: LandingFeedItem[];
}

/* ============================================================
   HELPERS
   ============================================================ */

const PH_POST = "https://placehold.co/600x400/1a1a1a/e6c46d?text=Story";

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? "";
}

/* ============================================================
   FEED BUILDER — shared between areas + beyond-atl pages
   ============================================================ */

export function buildFeed(
  blogPosts: readonly { id: string; title: string; slug: string; featured_image_url?: string | null; categories?: { name: string } | null; published_at?: string | null }[],
  mediaItems: readonly { id: string; title: string; slug: string; embed_url?: string | null; published_at?: string | null }[],
): LandingFeedItem[] {
  const usedIds = new Set<string>();

  const blogCards: LandingFeedItem[] = blogPosts.map((p) => ({
    kind: "blog" as const,
    id: p.id,
    title: p.title,
    slug: p.slug,
    image: p.featured_image_url || undefined,
    category: p.categories?.name || undefined,
    date: p.published_at || undefined,
  }));

  const videoCards: LandingFeedItem[] = mediaItems.map((m) => ({
    kind: "video" as const,
    id: m.id,
    title: m.title,
    slug: m.slug,
    embed_url: m.embed_url || undefined,
    date: m.published_at || undefined,
  }));

  /* Interleave: insert 1 video after every 4 blogs, max 2 videos in first 8 */
  const feed: LandingFeedItem[] = [];
  let blogIdx = 0;
  let videoIdx = 0;
  let videosPlaced = 0;

  while (blogIdx < blogCards.length || videoIdx < videoCards.length) {
    const prevBlogIdx = blogIdx;
    const prevVideoIdx = videoIdx;

    for (let i = 0; i < 4 && blogIdx < blogCards.length; i++) {
      const card = blogCards[blogIdx++];
      if (!usedIds.has(card.id)) {
        usedIds.add(card.id);
        feed.push(card);
      }
    }
    if (videoIdx < videoCards.length && videosPlaced < 2) {
      const card = videoCards[videoIdx++];
      if (!usedIds.has(card.id)) {
        usedIds.add(card.id);
        feed.push(card);
        videosPlaced++;
      }
    }

    /* Safety: break if neither index advanced (prevents infinite loop
       when remaining videos exceed the videosPlaced cap) */
    if (blogIdx === prevBlogIdx && videoIdx === prevVideoIdx) break;
  }

  return feed;
}

/* ============================================================
   SHARED AREA / CITY LANDING CONTENT
   ============================================================ */

export function AreaLandingContent({
  heroEyebrow,
  heroTitle,
  heroIntro,
  heroVideoUrl,
  heroImageUrl,
  search,
  searchResultsLabel,
  filteredCards,
  cards,
  cardLinkPrefix,
  cardsEmptyText,
  mapCtaText,
  mapCtaHref,
  feedEyebrow,
  feedTitle,
  feedSeeAllHref,
  feed,
}: AreaLandingContentProps) {
  const hasSearchResults = !search || (filteredCards && filteredCards.length > 0);

  return (
    <>
      {/* ========== 1. HERO ========== */}
      <section className="relative w-full">
        <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          {heroVideoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={heroImageUrl}
              alt={heroTitle}
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
          <span className="text-[#e6c46d] text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">
            {heroEyebrow}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-4xl leading-tight">
            {heroTitle}
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-xl">
            {heroIntro}
          </p>
        </div>
      </section>

      {/* ========== 2. SEARCH BAR ========== */}
      <div className="site-container pt-10 pb-4">
        <SearchBar
          placeholder="Search ATL Vibes & Views..."
          className="mx-auto"
        />
        {search && (
          <p className="text-sm text-gray-mid mt-3 text-center">
            Showing results for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* ── Search Results (only when searching) ── */}
      {search && (
        <div className="site-container pb-8">
          {hasSearchResults ? (
            <div className="space-y-6">
              {filteredCards && filteredCards.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-[#c1121f] mb-3">
                    {searchResultsLabel}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {filteredCards.map((c) => (
                      <Link
                        key={c.id}
                        href={`${cardLinkPrefix}${c.slug}`}
                        className="px-5 py-2 bg-black text-white text-xs font-semibold uppercase tracking-eyebrow rounded-full hover:bg-[#fee198] hover:text-black transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-mid text-sm text-center">
              No matches &mdash; try a different search.
            </p>
          )}
        </div>
      )}

      {/* ========== 3–6: MAIN + SIDEBAR GRID ========== */}
      <div className="site-container pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* ---------- MAIN COLUMN ---------- */}
          <div className="space-y-28">
            {/* ===== 3. CARDS GRID ===== */}
            <section>
              {cards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards.map((card) => (
                    <Link
                      key={card.id}
                      href={`${cardLinkPrefix}${card.slug}`}
                      className="group block relative overflow-hidden aspect-[4/3]"
                    >
                      {card.hero_image_url ? (
                        <Image
                          src={card.hero_image_url}
                          alt={card.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#1a1a1a]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-white group-hover:text-[#fee198] transition-colors">
                          {card.name}
                        </h3>
                        {card.tagline && (
                          <p className="text-white/60 text-xs mt-1 line-clamp-2">
                            {card.tagline}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={18} className="text-white" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-mid text-sm text-center py-12">
                  {cardsEmptyText}
                </p>
              )}
              {/* Mapbox Map Placeholder — Developer will replace with interactive map */}
              <div className="mt-10 bg-[#f5f5f5] border border-dashed border-gray-300 aspect-[16/7] flex items-center justify-center text-center">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Interactive Map</p>
                  <p className="text-xs text-gray-300">Mapbox integration — developer task</p>
                </div>
              </div>

              {/* CTA below map */}
              <div className="mt-6 text-center">
                <Link
                  href={mapCtaHref}
                  className="inline-block px-6 py-3 bg-[#fee198] text-[#1a1a1a] font-semibold text-sm rounded-full hover:opacity-90 transition-opacity"
                >
                  {mapCtaText}
                </Link>
              </div>
            </section>

            {/* ===== 4. HORIZONTAL AD SPACE ===== */}
            <section>
              <Link
                href="/hub/businesses"
                className="block bg-gray-100 flex items-center justify-center py-12 border border-dashed border-gray-300 hover:border-[#e6c46d] hover:bg-gray-50 transition-colors group"
              >
                <div className="text-center">
                  <span className="text-xs text-gray-mid uppercase tracking-eyebrow group-hover:text-black transition-colors">
                    Advertise Here
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    Reach thousands of Atlanta locals
                  </p>
                </div>
              </Link>
            </section>

            {/* ===== 5. EVERGREEN MASONRY FEED ===== */}
            <section>
              <SectionHeader
                eyebrow={feedEyebrow}
                title={feedTitle}
                href={feedSeeAllHref}
              />
              {feed.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {feed.map((item) =>
                    item.kind === "blog" ? (
                      <Link
                        key={item.id}
                        href={`/stories/${item.slug}`}
                        className="group block break-inside-avoid mb-6"
                      >
                        <div className="relative aspect-[3/2] overflow-hidden mb-3">
                          <Image
                            src={item.image || PH_POST}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {item.category && (
                          <span className="inline-block px-2.5 py-0.5 bg-gold-light text-black text-[9px] font-semibold uppercase tracking-eyebrow rounded-full mb-1.5">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-display text-base font-semibold text-black leading-snug group-hover:text-red-brand transition-colors">
                          {item.title}
                        </h3>
                        {item.date && (
                          <p className="text-gray-mid text-[11px] mt-1.5">
                            {formatDate(item.date)}
                          </p>
                        )}
                      </Link>
                    ) : (
                      <Link
                        key={item.id}
                        href={`/media`}
                        className="group block break-inside-avoid mb-6"
                      >
                        <div className="relative aspect-video overflow-hidden mb-3 bg-black">
                          {item.embed_url ? (
                            <Image
                              src={`https://img.youtube.com/vi/${extractYouTubeId(item.embed_url)}/hqdefault.jpg`}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-[#fee198] transition-colors">
                              <Play size={14} className="text-black ml-0.5 fill-black" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-eyebrow text-[#c1121f]">
                          Video
                        </span>
                        <h3 className="font-display text-base font-semibold text-black leading-snug mt-1 group-hover:text-red-brand transition-colors">
                          {item.title}
                        </h3>
                        {item.date && (
                          <p className="text-gray-mid text-[11px] mt-1.5">
                            {formatDate(item.date)}
                          </p>
                        )}
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#f8f5f0]">
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    More Guides Coming Soon
                  </h3>
                  <p className="text-gray-mid text-sm">
                    We&rsquo;re building out area guides, stories, and videos. Check back soon.
                  </p>
                </div>
              )}
            </section>

            {/* ===== 6. NEWSLETTER CTA (full-width at bottom) ===== */}
            <section className="bg-[#f8f5f0] py-16 px-8 md:px-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-2 italic">
                Join The A-List Newsletter
              </h2>
              <p className="text-gray-mid text-sm mb-8">
                Get the latest on Atlanta&rsquo;s culture, neighborhoods, and events.
              </p>
              <NewsletterForm />
              <p className="text-gray-mid/60 text-xs mt-4">No spam. Unsubscribe anytime.</p>
            </section>
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="hidden lg:block">
            <Sidebar>
              <NewsletterWidget />
              <AdPlacement slot="sidebar_top" />
              <SubmitCTA />
              <SubmitEventCTA />
            </Sidebar>
          </aside>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   LOCAL COMPONENTS
   ============================================================ */

function SectionHeader({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-10 border-b border-gray-200 pb-4">
      <div>
        <span className="text-[#c1121f] text-[11px] font-semibold uppercase tracking-eyebrow">
          {eyebrow}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-black leading-tight mt-1">
          {title}
        </h2>
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

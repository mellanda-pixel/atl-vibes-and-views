import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Mail, Users } from "lucide-react";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
import {
  Sidebar,
  NewsletterWidget,
  AdPlacement,
  NeighborhoodsWidget,
  SubmitCTA,
} from "@/components/Sidebar";
import {
  getNewsletterBySlug,
  getAdjacentNewsletters,
  getNewslettersByType,
  getNeighborhoodsByPopularity,
} from "@/lib/queries";

/* ============================================================
   NEWSLETTER DETAIL — /newsletters/[slug]
   Renders a single newsletter issue with HTML body, sidebar,
   prev/next navigation, and related editions.
   ============================================================ */

/* --- Helpers --- */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* --- Type color mapping --- */
const TYPE_COLORS: Record<string, string> = {
  "weekly-roundup": "#e6c46d",
  "neighborhood-spotlight": "#c1121f",
  "business-features": "#2d6a4f",
  "events-guide": "#7b2cbf",
  "city-watch": "#1a1a1a",
  "special-edition": "#b89a5a",
};

function getAccentColor(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return TYPE_COLORS[slug] ?? "#999";
}

/* --- Metadata --- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);
  if (!newsletter) return { title: "Not Found" };

  return {
    title: `${newsletter.subject_line || newsletter.name} — ATL Vibes & Views`,
    description:
      newsletter.preview_text ||
      `Read this edition of ${newsletter.name} from ATL Vibes & Views.`,
    openGraph: {
      title: newsletter.subject_line || newsletter.name,
      description:
        newsletter.preview_text ||
        `Read this edition of ${newsletter.name}.`,
      type: "article",
      publishedTime: newsletter.issue_date,
    },
    alternates: {
      canonical: `https://atlvibesandviews.com/newsletters/${newsletter.issue_slug}`,
    },
  };
}

/* --- Page Component --- */

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);
  if (!newsletter) return notFound();

  const typeSlug = newsletter.name.toLowerCase().replace(/\s+/g, "-");
  const accent = getAccentColor(newsletter.name);

  /* ── Adjacent newsletters for prev/next nav ── */
  const { prev, next } = await getAdjacentNewsletters(
    newsletter.issue_date,
    newsletter.id
  );

  /* ── Related issues (same type, exclude current) ── */
  const relatedRaw = await getNewslettersByType({
    typeName: newsletter.name,
    limit: 5,
  });
  const relatedIssues = relatedRaw
    .filter((nl) => nl.id !== newsletter.id)
    .slice(0, 3);

  /* ── Sidebar data ── */
  const popularNeighborhoods = await getNeighborhoodsByPopularity({
    limit: 6,
  });

  /* ── Breadcrumbs ── */
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Newsletters", href: "/newsletters" },
    { label: newsletter.subject_line || newsletter.name },
  ];

  /* ── JSON-LD ── */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: newsletter.subject_line || newsletter.name,
    datePublished: newsletter.issue_date,
    publisher: {
      "@type": "Organization",
      name: "ATL Vibes & Views",
      url: "https://atlvibesandviews.com",
    },
    description:
      newsletter.preview_text ||
      `Edition of ${newsletter.name} newsletter.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ========== HEADER BAR ========== */}
      <div className="bg-[#1a1a1a]">
        <div className="site-container py-4 flex items-center justify-between">
          <Link
            href="/newsletters"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            All Newsletters
          </Link>
          <div className="flex items-center gap-2">
            <Mail size={14} style={{ color: accent }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: accent }}
            >
              {newsletter.name}
            </span>
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="site-container py-8 md:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* ========== TWO-COLUMN LAYOUT ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* ---------- CONTENT COLUMN ---------- */}
          <article className="min-w-0">
            {/* Type badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-eyebrow"
                style={{
                  backgroundColor: accent + "15",
                  color: accent,
                }}
              >
                <Mail size={10} />
                {newsletter.name}
              </span>
            </div>

            {/* Subject line / Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight text-black mb-5">
              {newsletter.subject_line || newsletter.name}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-mid mb-8">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(newsletter.issue_date)}
              </span>
              {newsletter.send_count != null && newsletter.send_count > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} />
                  Sent to {newsletter.send_count.toLocaleString()} subscribers
                </span>
              )}
            </div>

            {/* Editor intro */}
            {newsletter.editor_intro && (
              <div className="border-l-4 border-[#e6c46d] bg-[#f8f5f0] px-6 py-5 mb-8">
                <p className="text-[17px] text-gray-dark leading-[1.7] italic">
                  {newsletter.editor_intro}
                </p>
              </div>
            )}

            {/* HTML Body */}
            {newsletter.html_body ? (
              <div
                className="article-body max-w-none"
                dangerouslySetInnerHTML={{ __html: newsletter.html_body }}
              />
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-mid text-lg">
                  This newsletter edition does not have web content available.
                </p>
                <p className="text-sm text-gray-mid mt-2">
                  Subscribe below to receive future editions directly in your inbox.
                </p>
              </div>
            )}

            {/* ── Prev / Next Navigation ── */}
            <nav className="flex items-stretch gap-4 mt-16 pt-8 border-t border-gray-200">
              {prev ? (
                <Link
                  href={`/newsletters/${prev.issue_slug}`}
                  className="group flex-1 p-5 border border-gray-200 hover:border-[#e6c46d] transition-colors"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-gray-mid flex items-center gap-1">
                    <ArrowLeft size={10} /> Previous
                  </span>
                  <p className="font-display text-sm font-semibold text-black mt-2 group-hover:text-[#c1121f] transition-colors line-clamp-2">
                    {prev.subject_line || prev.name}
                  </p>
                  <p className="text-xs text-gray-mid mt-1">
                    {formatShortDate(prev.issue_date)}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link
                  href={`/newsletters/${next.issue_slug}`}
                  className="group flex-1 p-5 border border-gray-200 hover:border-[#e6c46d] transition-colors text-right"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-gray-mid flex items-center gap-1 justify-end">
                    Next <ArrowRight size={10} />
                  </span>
                  <p className="font-display text-sm font-semibold text-black mt-2 group-hover:text-[#c1121f] transition-colors line-clamp-2">
                    {next.subject_line || next.name}
                  </p>
                  <p className="text-xs text-gray-mid mt-1">
                    {formatShortDate(next.issue_date)}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>

            {/* ── Related Issues ── */}
            {relatedIssues.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-xl font-semibold text-black mb-6">
                  More from {newsletter.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedIssues.map((nl) => (
                    <Link
                      key={nl.id}
                      href={`/newsletters/${nl.issue_slug}`}
                      className="group block p-4 border border-gray-200 hover:border-[#e6c46d] transition-colors"
                    >
                      <span
                        className="text-[10px] font-semibold uppercase tracking-eyebrow"
                        style={{ color: accent }}
                      >
                        {nl.name}
                      </span>
                      <h3 className="font-display text-sm font-semibold text-black mt-1 group-hover:text-[#c1121f] transition-colors line-clamp-2">
                        {nl.subject_line || nl.name}
                      </h3>
                      <p className="text-xs text-gray-mid mt-1">
                        {formatShortDate(nl.issue_date)}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/newsletters?type=${typeSlug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-[#c1121f] hover:text-black transition-colors"
                  >
                    View all {newsletter.name} editions
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </section>
            )}
          </article>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="hidden lg:block">
            <Sidebar>
              <NewsletterWidget
                title="Get the Newsletter"
                description={`Subscribe to ${newsletter.name} and get Atlanta updates in your inbox.`}
              />
              <AdPlacement slot="sidebar_top" />
              <NeighborhoodsWidget
                title="Popular Neighborhoods"
                neighborhoods={popularNeighborhoods.map((n) => ({
                  name: n.name,
                  slug: n.slug,
                }))}
              />
              <SubmitCTA />
            </Sidebar>
          </aside>
        </div>
      </div>

      {/* ========== SUBSCRIBE CTA ========== */}
      <NewsletterBlock
        heading="Atlanta in Your Inbox"
        description="Get the latest on Atlanta's neighborhoods, events, and culture delivered to your inbox. No spam. Unsubscribe anytime."
      />

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://atlvibesandviews.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Newsletters",
                item: "https://atlvibesandviews.com/newsletters",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: newsletter.subject_line || newsletter.name,
              },
            ],
          }),
        }}
      />
    </>
  );
}

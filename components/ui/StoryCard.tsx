import Link from "next/link";

/* ============================================================
   STORY CARD
   
   Used on: Blog archives, editorial landings, homepage,
   sidebar related content, Editor's Choice sections.
   
   Variants:
   - "featured" — large hero-style card (image top, full width)
   - "standard" — image left or top based on layout context
   - "compact" — small thumbnail + title (sidebar, related)
   ============================================================ */

interface StoryCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  categorySlug?: string;
  imageUrl?: string;
  author?: string;
  date?: string;
  featured?: boolean;
  variant?: "featured" | "standard" | "compact";
  className?: string;
}

export function StoryCard({
  title,
  slug,
  excerpt,
  category,
  categorySlug,
  imageUrl,
  author,
  date,
  featured = false,
  variant = "standard",
  className = "",
}: StoryCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/blog/${slug}`} className={`group flex gap-3 ${className}`}>
        {imageUrl && (
          <div className="w-20 h-20 shrink-0 overflow-hidden bg-gray-light">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="min-w-0 flex flex-col justify-center">
          {category && (
            <span className="eyebrow eyebrow-red text-[10px] mb-1">
              {category}
            </span>
          )}
          <h4 className="font-display text-sm font-semibold leading-tight line-clamp-2 group-hover:text-red-brand transition-colors">
            {title}
          </h4>
          {date && <span className="text-meta-sm text-gray-mid mt-1">{date}</span>}
        </div>
      </Link>
    );
  }

  return (
    <article className={`group ${className}`}>
      <Link href={`/blog/${slug}`} className="block">
        {/* Image */}
        {imageUrl && (
          <div
            className={`overflow-hidden bg-gray-light mb-4 ${
              variant === "featured" ? "aspect-[16/9]" : "aspect-[3/2]"
            }`}
          >
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div>
          {/* Category Tag */}
          {category && (
            <span
              className={`inline-block mb-2 ${
                featured ? "category-tag category-tag--featured" : "eyebrow eyebrow-red"
              }`}
            >
              {category}
            </span>
          )}

          {/* Headline */}
          <h3
            className={`font-display font-semibold leading-tight group-hover:text-red-brand transition-colors ${
              variant === "featured" ? "text-card md:text-section-sm" : "text-card-sm"
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-gray-dark mt-2 line-clamp-2">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          {(author || date) && (
            <div className="flex items-center gap-2 mt-3 text-meta-sm text-gray-mid">
              {author && <span>{author}</span>}
              {author && date && <span>·</span>}
              {date && <span>{date}</span>}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

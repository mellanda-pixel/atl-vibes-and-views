import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

/* ============================================================
   EVENT CARD
   
   Used on: Hub events landing, events archive, neighborhood
   pages, area pages, homepage featured events.
   
   Variants:
   - "featured" — larger with image and featured badge
   - "standard" — image + date overlay
   - "list" — horizontal row (thumbnail, date, name, location)
   ============================================================ */

interface EventCardProps {
  name: string;
  slug: string;
  date?: string;
  dateShort?: string; // "Feb 14" for overlay
  time?: string;
  category?: string;
  neighborhood?: string;
  neighborhoodSlug?: string;
  imageUrl?: string;
  description?: string;
  featured?: boolean;
  variant?: "featured" | "standard" | "list";
  className?: string;
}

export function EventCard({
  name,
  slug,
  date,
  dateShort,
  time,
  category,
  neighborhood,
  imageUrl,
  description,
  featured = false,
  variant = "standard",
  className = "",
}: EventCardProps) {
  /* --- List Variant --- */
  if (variant === "list") {
    return (
      <Link
        href={`/hub/events/${slug}`}
        className={`group flex gap-4 py-3 border-b border-gray-100 last:border-0 ${className}`}
      >
        {/* Date Block */}
        {dateShort && (
          <div className="shrink-0 w-14 h-14 bg-red-brand text-white flex flex-col items-center justify-center">
            <span className="text-[10px] font-semibold uppercase">
              {dateShort.split(" ")[0]}
            </span>
            <span className="text-lg font-display font-bold leading-none">
              {dateShort.split(" ")[1]}
            </span>
          </div>
        )}

        {/* Thumbnail */}
        {imageUrl && !dateShort && (
          <div className="w-14 h-14 shrink-0 overflow-hidden bg-gray-light">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="min-w-0 flex flex-col justify-center">
          <h4 className="font-display text-sm font-semibold leading-tight group-hover:text-red-brand transition-colors line-clamp-1">
            {name}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-meta-sm text-gray-mid">
            {neighborhood && (
              <span className="flex items-center gap-0.5">
                <MapPin size={10} />
                {neighborhood}
              </span>
            )}
            {category && (
              <>
                <span>·</span>
                <span>{category}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  /* --- Featured / Standard Variant --- */
  return (
    <article className={`group ${className}`}>
      <Link href={`/hub/events/${slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden bg-gray-light">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-light" />
          )}

          {/* Featured Badge */}
          {featured && (
            <span className="absolute top-3 left-3 category-tag category-tag--featured text-[10px]">
              Featured
            </span>
          )}

          {/* Date Overlay */}
          {dateShort && (
            <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 text-center shadow-sm">
              <span className="block text-[10px] font-semibold uppercase text-red-brand">
                {dateShort.split(" ")[0]}
              </span>
              <span className="block text-lg font-display font-bold leading-none">
                {dateShort.split(" ")[1]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-3">
          {category && (
            <span className="eyebrow eyebrow-red text-[10px] mb-1 block">
              {category}
            </span>
          )}

          <h3
            className={`font-display font-semibold leading-tight group-hover:text-red-brand transition-colors ${
              variant === "featured" ? "text-card" : "text-card-sm"
            }`}
          >
            {name}
          </h3>

          {description && variant === "featured" && (
            <p className="text-sm text-gray-dark mt-2 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2 text-meta-sm text-gray-mid">
            {date && (
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {date}
              </span>
            )}
            {neighborhood && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {neighborhood}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

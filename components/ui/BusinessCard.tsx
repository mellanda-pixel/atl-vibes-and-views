import Link from "next/link";
import { MapPin, Star } from "lucide-react";

/* ============================================================
   BUSINESS CARD
   
   Used on: Hub landings, business archive, neighborhood pages,
   area pages, search results, nearby listings.
   ============================================================ */

interface BusinessCardProps {
  name: string;
  slug: string;
  category?: string;
  neighborhood?: string;
  neighborhoodSlug?: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  featured?: boolean;
  tier?: "free" | "paid" | "featured" | "premium";
  className?: string;
}

export function BusinessCard({
  name,
  slug,
  category,
  neighborhood,
  neighborhoodSlug,
  description,
  imageUrl,
  rating,
  reviewCount,
  tags,
  featured = false,
  tier = "free",
  className = "",
}: BusinessCardProps) {
  const showBadge = featured || tier === "featured" || tier === "premium";

  return (
    <article className={`group border border-gray-100 bg-white hover:shadow-md transition-shadow ${className}`}>
      <Link href={`/hub/businesses/${slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden bg-gray-light">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-2xl text-gray-mid">
                {name[0]}
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {showBadge && (
            <span className="absolute top-3 left-3 category-tag category-tag--featured text-[10px]">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {category && (
            <span className="eyebrow eyebrow-red text-[10px] mb-1.5 block">
              {category}
            </span>
          )}

          {/* Name */}
          <h3 className="font-display text-card-sm font-semibold leading-tight group-hover:text-red-brand transition-colors">
            {name}
          </h3>

          {/* Location */}
          {neighborhood && (
            <div className="flex items-center gap-1 mt-1.5 text-meta-sm text-gray-mid">
              <MapPin size={12} />
              <span>{neighborhood}</span>
            </div>
          )}

          {/* Description */}
          {description && tier !== "free" && (
            <p className="text-sm text-gray-dark mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Rating */}
          {rating !== undefined && rating > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.round(rating)
                        ? "fill-gold-dark text-gold-dark"
                        : "text-gray-mid/30"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-mid">
                {rating.toFixed(1)}
                {reviewCount !== undefined && ` (${reviewCount})`}
              </span>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && tier !== "free" && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-light text-[10px] text-gray-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

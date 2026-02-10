import Link from "next/link";
import Image from "next/image";

const PH_POST = "https://placehold.co/600x400/1a1a1a/e6c46d?text=Story";

export interface RelatedPost {
  slug: string;
  title: string;
  featured_image_url: string | null;
  category_name: string | null;
  published_at: string | null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RelatedStoryCard({ post }: { post: RelatedPost }) {
  return (
    <Link href={`/stories/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-gray-100">
        <Image
          src={post.featured_image_url || PH_POST}
          alt={post.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {post.category_name && (
        <span className="text-[#c1121f] text-[10px] font-semibold uppercase tracking-eyebrow">
          {post.category_name}
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-black leading-snug mt-1 group-hover:text-[#c1121f] transition-colors line-clamp-2">
        {post.title}
      </h3>
      {post.published_at && (
        <p className="text-gray-mid text-xs mt-2">
          {formatDate(post.published_at)}
        </p>
      )}
    </Link>
  );
}

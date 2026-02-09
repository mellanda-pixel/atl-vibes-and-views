import Link from "next/link";

/* ============================================================
   AD BLOCK — shared ad placement for sidebar + horizontal slots

   variant="sidebar"    → 250px tall sidebar ad (hub page sidebars)
   variant="horizontal"  → 120px tall full-width ad (below hub grids)
   variant="inline"      → Clickable CTA link ad (area/neighborhood pages)
   ============================================================ */

interface AdBlockProps {
  variant?: "sidebar" | "horizontal" | "inline";
  href?: string;
  className?: string;
}

export function AdBlock({
  variant = "sidebar",
  href,
  className = "",
}: AdBlockProps) {
  if (variant === "inline") {
    return (
      <Link
        href={href || "/hub/businesses"}
        className={`block bg-gray-100 flex items-center justify-center py-12 border border-dashed border-gray-300 hover:border-[#e6c46d] hover:bg-gray-50 transition-colors group ${className}`}
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
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={`max-w-[1280px] mx-auto px-6 ${className}`}>
        <div className="w-full h-[120px] bg-gray-light border border-dashed border-gray-mid flex items-center justify-center">
          <span className="text-[11px] text-gray-mid uppercase tracking-widest">
            Ad — Horizontal
          </span>
        </div>
      </div>
    );
  }

  /* variant="sidebar" */
  return (
    <div
      className={`w-full h-[250px] bg-gray-light border border-dashed border-gray-mid flex items-center justify-center mb-6 ${className}`}
    >
      <span className="text-[11px] text-gray-mid uppercase tracking-widest">
        Ad — Sidebar
      </span>
    </div>
  );
}

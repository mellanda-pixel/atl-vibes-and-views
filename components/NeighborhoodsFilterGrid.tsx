"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NeighborhoodItem {
  id: string;
  name: string;
  slug: string;
  area_id: string;
}

interface AreaItem {
  id: string;
  name: string;
  slug: string;
}

interface NeighborhoodsFilterGridProps {
  neighborhoods: NeighborhoodItem[];
  areas: AreaItem[];
  bizCounts: Record<string, number>;
  storyCounts: Record<string, number>;
  areaNameMap: Record<string, string>;
}

const PAGE_SIZE = 12;

export function NeighborhoodsFilterGrid({
  neighborhoods,
  areas,
  bizCounts,
  storyCounts,
  areaNameMap,
}: NeighborhoodsFilterGridProps) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (!activeArea) return neighborhoods;
    return neighborhoods.filter((n) => n.area_id === activeArea);
  }, [neighborhoods, activeArea]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleAreaClick(areaId: string | null) {
    setActiveArea(areaId);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="site-container pt-8 pb-16 md:pt-10 md:pb-20">
      {/* Area filter tabs */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 mb-8">
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={() => handleAreaClick(null)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              activeArea === null
                ? "bg-[#fee198] text-[#1a1a1a]"
                : "bg-[#f8f5f0] text-gray-600 hover:bg-[#fee198]"
            }`}
          >
            All
          </button>
          {areas.map((a) => (
            <button
              key={a.id}
              onClick={() => handleAreaClick(a.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                activeArea === a.id
                  ? "bg-[#fee198] text-[#1a1a1a]"
                  : "bg-[#f8f5f0] text-gray-600 hover:bg-[#fee198]"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-mid mb-6">
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}{" "}
        neighborhood{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((n) => {
          const bizCount = bizCounts[n.id] ?? 0;
          const storyCount = storyCounts[n.id] ?? 0;
          return (
            <Link
              key={n.id}
              href={`/neighborhoods/${n.slug}`}
              className="group block border border-gray-200 hover:border-[#e6c46d] transition-colors"
            >
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-[#c1121f]">
                  {areaNameMap[n.area_id] ?? "Atlanta"}
                </span>
                <h3 className="font-display text-lg font-semibold text-black mt-1 group-hover:text-red-brand transition-colors">
                  {n.name}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-mid">
                  <span>
                    {bizCount > 0
                      ? `${bizCount} business${bizCount !== 1 ? "es" : ""}`
                      : "No businesses yet"}
                  </span>
                  {storyCount > 0 && (
                    <span>
                      {storyCount} {storyCount === 1 ? "story" : "stories"}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-black text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-all"
          >
            Load More <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

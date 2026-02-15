"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { FilterBar } from "@/components/portal/FilterBar";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Pagination } from "@/components/portal/Pagination";

/* ============================================================
   AD CREATIVES LIBRARY — Visual grid of all creatives
   ============================================================ */

interface CreativeRow {
  id: string;
  campaign_id: string;
  creative_type: string;
  headline: string | null;
  body: string | null;
  cta_text: string | null;
  target_url: string;
  image_url: string | null;
  alt_text: string | null;
  utm_campaign: string | null;
  is_active: boolean;
  created_at: string;
}

interface CreativesClientProps {
  creatives: CreativeRow[];
  campaigns: { id: string; name: string; sponsor_id: string }[];
  sponsors: { id: string; sponsor_name: string }[];
}

const ITEMS_PER_PAGE = 12;

export function CreativesClient({ creatives, campaigns, sponsors }: CreativesClientProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Build lookup maps
  const campaignMap = useMemo(() => {
    const map: Record<string, { name: string; sponsor_id: string }> = {};
    campaigns.forEach((c) => { map[c.id] = { name: c.name, sponsor_id: c.sponsor_id }; });
    return map;
  }, [campaigns]);

  const sponsorMap = useMemo(() => {
    const map: Record<string, string> = {};
    sponsors.forEach((s) => { map[s.id] = s.sponsor_name; });
    return map;
  }, [sponsors]);

  const filtered = useMemo(() => {
    let items = creatives;
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.headline?.toLowerCase().includes(q) ||
          c.utm_campaign?.toLowerCase().includes(q) ||
          c.target_url.toLowerCase().includes(q)
      );
    }
    if (typeFilter) items = items.filter((c) => c.creative_type === typeFilter);
    if (statusFilter === "active") items = items.filter((c) => c.is_active);
    if (statusFilter === "inactive") items = items.filter((c) => !c.is_active);
    return items;
  }, [creatives, search, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <PortalTopbar
        title="Ad Creatives Library"
        actions={
          <div className="flex items-center gap-3">
            <Link
              href="/admin/sponsors"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
            >
              <ArrowLeft size={14} /> Sponsors
            </Link>
            <button
              onClick={() => console.log("Create creative")}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
            >
              + New Creative
            </button>
          </div>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-4">
        <FilterBar
          filters={[
            {
              key: "type",
              label: "All Types",
              value: typeFilter,
              options: [
                { value: "image", label: "Image" },
                { value: "html", label: "HTML" },
                { value: "text", label: "Text" },
              ],
            },
            {
              key: "status",
              label: "All Status",
              value: statusFilter,
              options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ],
            },
          ]}
          onFilterChange={(key, value) => {
            if (key === "type") setTypeFilter(value);
            if (key === "status") setStatusFilter(value);
            setPage(1);
          }}
          searchPlaceholder="Search creatives..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
        />

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.length === 0 ? (
            <p className="col-span-full text-center text-[13px] text-[#6b7280] py-10 bg-white border border-[#e5e5e5]">
              No creatives found.
            </p>
          ) : (
            paginated.map((c) => {
              const campaign = campaignMap[c.campaign_id];
              const sponsorName = campaign ? sponsorMap[campaign.sponsor_id] : null;
              return (
                <div key={c.id} className="bg-white border border-[#e5e5e5] overflow-hidden">
                  {c.image_url ? (
                    <img src={c.image_url} alt={c.alt_text ?? c.headline ?? "Creative"} className="w-full h-[160px] object-cover" />
                  ) : (
                    <div className="w-full h-[160px] bg-[#f5f5f5] flex items-center justify-center">
                      <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider">{c.creative_type}</span>
                    </div>
                  )}
                  <div className="p-3 space-y-1">
                    <p className="text-[13px] font-semibold text-black truncate">{c.headline ?? "Untitled"}</p>
                    {sponsorName && (
                      <p className="text-[11px] text-[#6b7280]">{sponsorName}</p>
                    )}
                    {c.cta_text && (
                      <p className="text-[11px] text-[#374151]">CTA: {c.cta_text}</p>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <StatusBadge variant={c.is_active ? "green" : "gray"}>
                        {c.is_active ? "Active" : "Inactive"}
                      </StatusBadge>
                      <span className="text-[10px] text-[#9ca3af]">{c.creative_type}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

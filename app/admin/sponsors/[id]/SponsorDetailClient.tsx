"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { TabNav } from "@/components/portal/TabNav";
import { StatCard } from "@/components/portal/StatCard";
import { StatGrid } from "@/components/portal/StatGrid";
import { AdminDataTable } from "@/components/portal/AdminDataTable";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { FormGroup } from "@/components/portal/FormGroup";
import { FormInput } from "@/components/portal/FormInput";
import { FormTextarea } from "@/components/portal/FormTextarea";
import { FormSelect } from "@/components/portal/FormSelect";
import { FormRow } from "@/components/portal/FormRow";

/* ============================================================
   SPONSOR DETAIL — 5 tabs: Overview, Campaign, Content, Creatives, Notes
   ============================================================ */

interface SponsorData {
  id: string;
  sponsor_name: string;
  business_id: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  campaign_name: string | null;
  campaign_start: string | null;
  campaign_end: string | null;
  campaign_value: number | null;
  placement: unknown;
  talking_points: string | null;
  status: string;
  notes: string | null;
  package_type: string | null;
  placements_total: number | null;
  placements_used: number | null;
  category_focus: string | null;
  neighborhood_focus: string | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
}

interface CampaignRow {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  budget: number | null;
  status: string;
}

interface CreativeRow {
  id: string;
  campaign_id: string;
  creative_type: string;
  headline: string | null;
  target_url: string;
  image_url: string | null;
  is_active: boolean;
}

interface SponsorDetailClientProps {
  sponsor: SponsorData;
  posts: PostRow[];
  campaigns: CampaignRow[];
  creatives: CreativeRow[];
}

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Campaign", key: "campaign" },
  { label: "Content", key: "content" },
  { label: "Creatives", key: "creatives" },
  { label: "Notes", key: "notes" },
];

const statusBadgeMap: Record<string, "green" | "gold" | "gray" | "blue" | "red" | "purple"> = {
  active: "green",
  pending: "gold",
  completed: "gray",
  paused: "blue",
  cancelled: "red",
  draft: "gray",
  published: "green",
  scheduled: "purple",
};

export function SponsorDetailClient({
  sponsor,
  posts,
  campaigns,
  creatives,
}: SponsorDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <PortalTopbar
        title={sponsor.sponsor_name}
        actions={
          <div className="flex items-center gap-3">
            <Link
              href="/admin/sponsors"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <button
              onClick={() => console.log("Save sponsor:", sponsor.id)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
            >
              Save Changes
            </button>
          </div>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-6">
        {/* Status bar */}
        <div className="flex items-center gap-3">
          <StatusBadge variant={statusBadgeMap[sponsor.status] ?? "gray"}>
            {sponsor.status}
          </StatusBadge>
          {sponsor.package_type && (
            <span className="text-[12px] text-[#6b7280]">
              Package: {sponsor.package_type}
            </span>
          )}
          <span className="text-[12px] text-[#6b7280]">
            Created {new Date(sponsor.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <StatGrid columns={4}>
              <StatCard label="Campaign Value" value={sponsor.campaign_value ? `$${sponsor.campaign_value.toLocaleString()}` : "—"} />
              <StatCard label="Placements Used" value={`${sponsor.placements_used ?? 0} / ${sponsor.placements_total ?? 0}`} />
              <StatCard label="Content Pieces" value={posts.length} />
              <StatCard label="Ad Campaigns" value={campaigns.length} />
            </StatGrid>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e5e5e5] p-5 space-y-4">
                <h3 className="font-display text-[16px] font-semibold text-black">Contact</h3>
                <FormGroup label="Sponsor Name">
                  <FormInput value={sponsor.sponsor_name} readOnly />
                </FormGroup>
                <FormRow>
                  <FormGroup label="Contact Name">
                    <FormInput value={sponsor.contact_name ?? ""} readOnly />
                  </FormGroup>
                  <FormGroup label="Email">
                    <FormInput value={sponsor.contact_email ?? ""} readOnly />
                  </FormGroup>
                </FormRow>
                <FormGroup label="Phone">
                  <FormInput value={sponsor.contact_phone ?? ""} readOnly />
                </FormGroup>
              </div>

              <div className="bg-white border border-[#e5e5e5] p-5 space-y-4">
                <h3 className="font-display text-[16px] font-semibold text-black">Package</h3>
                <FormRow>
                  <FormGroup label="Package Type">
                    <FormInput value={sponsor.package_type ?? ""} readOnly />
                  </FormGroup>
                  <FormGroup label="Status">
                    <FormInput value={sponsor.status} readOnly />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup label="Category Focus">
                    <FormInput value={sponsor.category_focus ?? ""} readOnly />
                  </FormGroup>
                  <FormGroup label="Neighborhood Focus">
                    <FormInput value={sponsor.neighborhood_focus ?? ""} readOnly />
                  </FormGroup>
                </FormRow>
              </div>
            </div>
          </div>
        )}

        {/* ── Campaign Tab ── */}
        {activeTab === "campaign" && (
          <div className="space-y-4">
            <div className="bg-white border border-[#e5e5e5] p-5 space-y-4">
              <h3 className="font-display text-[16px] font-semibold text-black">Campaign Details</h3>
              <FormGroup label="Campaign Name">
                <FormInput value={sponsor.campaign_name ?? ""} readOnly />
              </FormGroup>
              <FormRow>
                <FormGroup label="Start Date">
                  <FormInput type="date" value={sponsor.campaign_start ?? ""} readOnly />
                </FormGroup>
                <FormGroup label="End Date">
                  <FormInput type="date" value={sponsor.campaign_end ?? ""} readOnly />
                </FormGroup>
              </FormRow>
              <FormGroup label="Talking Points">
                <FormTextarea value={sponsor.talking_points ?? ""} readOnly rows={4} />
              </FormGroup>
            </div>

            <h3 className="font-display text-[16px] font-semibold text-black">Ad Campaigns</h3>
            <AdminDataTable
              columns={[
                { key: "name", header: "Campaign", width: "30%" },
                {
                  key: "status",
                  header: "Status",
                  render: (item: CampaignRow) => (
                    <StatusBadge variant={statusBadgeMap[item.status] ?? "gray"}>
                      {item.status}
                    </StatusBadge>
                  ),
                },
                {
                  key: "budget",
                  header: "Budget",
                  render: (item: CampaignRow) => (
                    <span className="text-[13px]">{item.budget ? `$${item.budget.toLocaleString()}` : "—"}</span>
                  ),
                },
                {
                  key: "start_date",
                  header: "Start",
                  render: (item: CampaignRow) => (
                    <span className="text-[12px] text-[#6b7280]">
                      {new Date(item.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  ),
                },
                {
                  key: "end_date",
                  header: "End",
                  render: (item: CampaignRow) => (
                    <span className="text-[12px] text-[#6b7280]">
                      {new Date(item.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  ),
                },
              ]}
              data={campaigns}
              emptyMessage="No ad campaigns for this sponsor."
            />
          </div>
        )}

        {/* ── Content Tab ── */}
        {activeTab === "content" && (
          <div className="space-y-4">
            <h3 className="font-display text-[16px] font-semibold text-black">Sponsored Content</h3>
            <AdminDataTable
              columns={[
                {
                  key: "title",
                  header: "Post Title",
                  width: "50%",
                  render: (item: PostRow) => (
                    <Link
                      href={`/admin/posts`}
                      className="font-display text-[14px] font-semibold text-black hover:text-[#c1121f] transition-colors"
                    >
                      {item.title}
                    </Link>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item: PostRow) => (
                    <StatusBadge variant={statusBadgeMap[item.status] ?? "gray"}>
                      {item.status}
                    </StatusBadge>
                  ),
                },
                {
                  key: "published_at",
                  header: "Published",
                  render: (item: PostRow) => (
                    <span className="text-[12px] text-[#6b7280]">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "—"}
                    </span>
                  ),
                },
              ]}
              data={posts}
              emptyMessage="No sponsored content yet."
            />
          </div>
        )}

        {/* ── Creatives Tab ── */}
        {activeTab === "creatives" && (
          <div className="space-y-4">
            <h3 className="font-display text-[16px] font-semibold text-black">Ad Creatives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creatives.length === 0 ? (
                <p className="col-span-full text-center text-[13px] text-[#6b7280] py-10 bg-white border border-[#e5e5e5]">
                  No creatives for this sponsor.
                </p>
              ) : (
                creatives.map((c) => (
                  <div key={c.id} className="bg-white border border-[#e5e5e5] overflow-hidden">
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.headline ?? "Creative"} className="w-full h-[140px] object-cover" />
                    ) : (
                      <div className="w-full h-[140px] bg-[#f5f5f5] flex items-center justify-center">
                        <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider">{c.creative_type}</span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-[13px] font-semibold text-black truncate">{c.headline ?? "Untitled"}</p>
                      <p className="text-[11px] text-[#6b7280] truncate mt-1">{c.target_url}</p>
                      <div className="mt-2">
                        <StatusBadge variant={c.is_active ? "green" : "gray"}>
                          {c.is_active ? "Active" : "Inactive"}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── Notes Tab ── */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className="bg-white border border-[#e5e5e5] p-5 space-y-4">
              <h3 className="font-display text-[16px] font-semibold text-black">Internal Notes</h3>
              <FormGroup label="Notes">
                <FormTextarea
                  value={sponsor.notes ?? ""}
                  readOnly
                  rows={8}
                  placeholder="No notes yet..."
                />
              </FormGroup>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

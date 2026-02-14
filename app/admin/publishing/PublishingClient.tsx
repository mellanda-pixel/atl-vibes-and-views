"use client";

import { useState, useMemo } from "react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { WorkflowBanner } from "@/components/portal/WorkflowBanner";
import { StatCard } from "@/components/portal/StatCard";
import { StatGrid } from "@/components/portal/StatGrid";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { FilterBar } from "@/components/portal/FilterBar";
import { UploadZone } from "@/components/portal/UploadZone";
import { Modal } from "@/components/portal/Modal";
import { Pagination } from "@/components/portal/Pagination";
import { AlertTriangle } from "lucide-react";

interface PostRow {
  id: string;
  title: string;
  status: string;
  type: string | null;
  content_source: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
  categories: { name: string } | null;
}

interface ScriptRow {
  id: string;
  title: string;
  status: string;
  platform: string | null;
  format: string | null;
  caption: string | null;
  created_at: string;
  script_batches: { batch_name: string | null } | null;
}

interface PublishingClientProps {
  posts: PostRow[];
  scripts: ScriptRow[];
  today: string;
}

type QueueItem = { kind: "post"; data: PostRow } | { kind: "script"; data: ScriptRow };

const ITEMS_PER_PAGE = 10;
const PUBLISH_PLATFORMS = ["Instagram Reel", "TikTok", "YT Shorts", "Facebook", "Blog"];

export function PublishingClient({ posts, scripts, today }: PublishingClientProps) {
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [publishModal, setPublishModal] = useState<QueueItem | null>(null);

  // Stats
  const needsMedia = posts.filter((p) => p.status === "approved" && !p.featured_image_url).length;
  const readyToPublish = posts.filter((p) => p.status === "scheduled").length +
    scripts.filter((s) => s.status === "approved" || s.status === "scheduled").length;
  const publishedToday = posts.filter((p) =>
    p.status === "published" && p.published_at?.startsWith(today)
  ).length;

  // Combine items
  const allItems: QueueItem[] = useMemo(() => {
    const items: QueueItem[] = [];
    posts.forEach((p) => items.push({ kind: "post", data: p }));
    scripts.forEach((s) => items.push({ kind: "script", data: s }));
    return items;
  }, [posts, scripts]);

  const filtered = useMemo(() => {
    let items = allItems;
    if (statusFilter === "needs_media") {
      items = items.filter(
        (i) => i.kind === "post" && i.data.status === "approved" && !(i.data as PostRow).featured_image_url
      );
    } else if (statusFilter === "ready") {
      items = items.filter((i) =>
        i.data.status === "scheduled" || (i.kind === "script" && i.data.status === "approved")
      );
    } else if (statusFilter === "published") {
      items = items.filter((i) => i.data.status === "published");
    }
    if (typeFilter === "script") items = items.filter((i) => i.kind === "script");
    if (typeFilter === "post") items = items.filter((i) => i.kind === "post");
    return items;
  }, [allItems, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setStatusFilter(value);
    if (key === "type") setTypeFilter(value);
    setPage(1);
  };

  const isNeedsMedia = (item: QueueItem) =>
    item.kind === "post" && item.data.status === "approved" && !(item.data as PostRow).featured_image_url;

  const isReady = (item: QueueItem) =>
    item.data.status === "scheduled" || (item.kind === "script" && item.data.status === "approved");

  const workflowSteps = [
    { label: "Pipeline", status: "done" as const },
    { label: "Content Inbox", status: "done" as const },
    { label: "Publishing Queue", status: "current" as const },
    { label: "Published", status: "future" as const },
  ];

  return (
    <>
      <PortalTopbar
        title="Publishing Queue"
        actions={
          <span className="text-[12px] text-[#6b7280]">
            Approved content — attach media, preview, and publish
          </span>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-4">
        <WorkflowBanner steps={workflowSteps} />

        <StatGrid columns={3}>
          <StatCard label="Needs Media" value={needsMedia} badge={needsMedia > 0 ? { text: "Action", variant: "red" } : undefined} />
          <StatCard label="Ready to Publish" value={readyToPublish} badge={readyToPublish > 0 ? { text: "Ready", variant: "green" } : undefined} />
          <StatCard label="Published Today" value={publishedToday} />
        </StatGrid>

        <FilterBar
          filters={[
            {
              key: "status",
              label: "All Status",
              value: statusFilter,
              options: [
                { value: "needs_media", label: "Needs Media" },
                { value: "ready", label: "Ready to Publish" },
                { value: "published", label: "Published" },
              ],
            },
            {
              key: "type",
              label: "All Types",
              value: typeFilter,
              options: [
                { value: "script", label: "Script / Video" },
                { value: "post", label: "Blog Post" },
              ],
            },
          ]}
          onFilterChange={handleFilterChange}
        />

        {/* Cards */}
        <div className="space-y-3">
          {paginated.length === 0 && (
            <div className="bg-white border border-[#e5e5e5] p-8 text-center">
              <p className="text-[13px] text-[#6b7280]">No items in the publishing queue.</p>
            </div>
          )}
          {paginated.map((item) => {
            const needMedia = isNeedsMedia(item);
            const ready = isReady(item);
            const borderColor = needMedia
              ? "border-l-[#c1121f]"
              : ready
                ? "border-l-[#16a34a]"
                : "border-l-[#e5e5e5]";

            return (
              <div key={item.data.id} className={`bg-white border border-[#e5e5e5] border-l-4 ${borderColor}`}>
                <div className="px-5 py-4">
                  <h3 className="font-display text-[16px] font-semibold text-black">
                    {item.data.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <StatusBadge variant={item.kind === "script" ? "orange" : "blue"}>
                      {item.kind === "script" ? "Script" : "Blog Post"}
                    </StatusBadge>
                    {item.kind === "script" && (item.data as ScriptRow).script_batches?.batch_name && (
                      <span className="text-[11px] text-[#6b7280]">
                        {(item.data as ScriptRow).script_batches!.batch_name}
                      </span>
                    )}
                    {item.kind === "post" && (item.data as PostRow).content_source && (
                      <span className="text-[11px] text-[#6b7280]">
                        {(item.data as PostRow).content_source}
                      </span>
                    )}
                    {needMedia && <StatusBadge variant="red">Media Required</StatusBadge>}
                    {ready && <StatusBadge variant="green">Ready</StatusBadge>}
                  </div>

                  {/* Upload zone for items needing media */}
                  {needMedia && (
                    <div className="mt-3">
                      <UploadZone
                        onUpload={(files) => console.log("Upload for", item.data.id, files)}
                        accept="image/*,video/*"
                        label="Drop video or image here"
                        hint="MP4, MOV, PNG, JPG up to 100MB"
                      />
                    </div>
                  )}

                  {/* Media preview for ready items */}
                  {ready && item.kind === "post" && (item.data as PostRow).featured_image_url && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-[120px] h-[68px] bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[10px] text-[#6b7280]">
                        Preview
                      </div>
                      <span className="text-[11px] text-[#6b7280]">Image attached</span>
                    </div>
                  )}

                  {/* Platform pills for scripts */}
                  {item.kind === "script" && ready && (
                    <div className="mt-3">
                      <span className="text-[11px] text-[#6b7280]">Publishing to:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {PUBLISH_PLATFORMS.map((p) => (
                          <span
                            key={p}
                            className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-[#f5f5f5] border border-[#e5e5e5] text-[#374151]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => console.log("Edit captions:", item.data.id)}
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
                    >
                      Edit Captions
                    </button>
                    {ready && (
                      <button
                        onClick={() => console.log("Preview:", item.data.id)}
                        className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
                      >
                        Preview
                      </button>
                    )}
                    <button
                      onClick={() => ready ? setPublishModal(item) : console.log("Publish disabled")}
                      disabled={!ready}
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        ready
                          ? "bg-[#16a34a] text-white hover:bg-[#15803d]"
                          : "bg-[#e5e5e5] text-[#9ca3af] cursor-not-allowed"
                      }`}
                    >
                      Publish Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>

      {/* Publish Confirmation Modal */}
      <Modal
        isOpen={!!publishModal}
        onClose={() => setPublishModal(null)}
        title="Confirm Publish"
        footer={
          <>
            <button
              onClick={() => setPublishModal(null)}
              className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Publish confirmed:", publishModal?.data.id);
                setPublishModal(null);
              }}
              className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors"
            >
              Yes, Publish Now
            </button>
          </>
        }
      >
        {publishModal && (
          <div className="space-y-4">
            <h3 className="font-display text-[18px] font-semibold text-black">
              {publishModal.data.title}
            </h3>
            <div className="flex items-center gap-2">
              <StatusBadge variant={publishModal.kind === "script" ? "orange" : "blue"}>
                {publishModal.kind === "script" ? "Script / Video" : "Blog Post"}
              </StatusBadge>
            </div>

            {/* Platform list */}
            <div>
              <span className="text-[12px] font-semibold text-[#374151]">Platforms:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {PUBLISH_PLATFORMS.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-[#f5f5f5] border border-[#e5e5e5] text-[#374151]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Caption preview */}
            {publishModal.kind === "script" && (publishModal.data as ScriptRow).caption && (
              <div className="bg-[#f5f5f5] border border-[#e5e5e5] p-3">
                <span className="text-[11px] font-semibold text-[#6b7280]">Caption:</span>
                <p className="text-[12px] text-[#374151] mt-1">{(publishModal.data as ScriptRow).caption}</p>
              </div>
            )}

            {/* Warning banner */}
            <div className="bg-[#fef3c7] border border-[#f59e0b] p-3 flex items-start gap-2">
              <AlertTriangle size={16} className="text-[#b45309] flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#92400e]">
                This will fire the Make.com publishing automation (S9). Content will be posted to the selected platforms immediately. This action cannot be undone.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

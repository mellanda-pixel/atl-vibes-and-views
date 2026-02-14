"use client";

import { useState, useMemo } from "react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { WorkflowBanner } from "@/components/portal/WorkflowBanner";
import { TabNav } from "@/components/portal/TabNav";
import { FilterBar } from "@/components/portal/FilterBar";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Pagination } from "@/components/portal/Pagination";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ScriptRow {
  id: string;
  title: string;
  script_text: string | null;
  platform: string | null;
  format: string | null;
  status: string;
  pillar_id: string | null;
  neighborhood_id: string | null;
  caption: string | null;
  description: string | null;
  created_at: string;
  script_batches: { batch_name: string | null; week_of: string } | null;
  stories: { score: number | null; headline: string } | null;
}

interface BlogRow {
  id: string;
  title: string;
  status: string;
  type: string | null;
  category_id: string | null;
  word_count: number | null;
  content_source: string | null;
  created_at: string;
  categories: { name: string } | null;
}

interface InboxClientProps {
  scripts: ScriptRow[];
  blogDrafts: BlogRow[];
  categories: { id: string; name: string }[];
  batches: { id: string; batch_name: string | null }[];
}

const ITEMS_PER_PAGE = 10;
const PLATFORMS = ["YouTube", "Instagram", "TikTok", "LinkedIn", "Facebook", "X"];

export function InboxClient({ scripts, blogDrafts, categories, batches }: InboxClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const tabs = [
    { label: `All (${scripts.length + blogDrafts.length})`, key: "all" },
    { label: `Scripts (${scripts.length})`, key: "scripts" },
    { label: `Blog Drafts (${blogDrafts.length})`, key: "blog" },
  ];

  // Combine into a unified list for filtering/pagination
  type InboxItem = { type: "script"; data: ScriptRow } | { type: "blog"; data: BlogRow };

  const allItems: InboxItem[] = useMemo(() => {
    const items: InboxItem[] = [];
    if (activeTab !== "blog") {
      scripts.forEach((s) => items.push({ type: "script", data: s }));
    }
    if (activeTab !== "scripts") {
      blogDrafts.forEach((b) => items.push({ type: "blog", data: b }));
    }
    return items;
  }, [scripts, blogDrafts, activeTab]);

  const filtered = useMemo(() => {
    let items = allItems;
    if (statusFilter) {
      items = items.filter((i) => i.data.status === statusFilter);
    }
    if (batchFilter && activeTab !== "blog") {
      items = items.filter(
        (i) => i.type === "script" && (i.data as ScriptRow).script_batches?.batch_name === batchFilter
      );
    }
    if (categoryFilter) {
      items = items.filter((i) => {
        if (i.type === "blog") return (i.data as BlogRow).category_id === categoryFilter;
        if (i.type === "script") return (i.data as ScriptRow).pillar_id === categoryFilter;
        return true;
      });
    }
    return items;
  }, [allItems, statusFilter, batchFilter, categoryFilter, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setStatusFilter(value);
    if (key === "batch") setBatchFilter(value);
    if (key === "category") setCategoryFilter(value);
    setPage(1);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const workflowSteps = [
    { label: "Pipeline", status: "done" as const },
    { label: "Content Inbox", status: "current" as const },
    { label: "Publishing Queue", status: "future" as const },
    { label: "Published", status: "future" as const },
  ];

  return (
    <>
      <PortalTopbar
        title="Content Inbox"
        actions={
          <span className="text-[12px] text-[#6b7280]">
            Raw content from automation — review, approve, or reject before publishing
          </span>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-4">
        <WorkflowBanner steps={workflowSteps} />

        <TabNav tabs={tabs} activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setPage(1); }} />

        <FilterBar
          filters={[
            {
              key: "status",
              label: "All Status",
              value: statusFilter,
              options: [
                { value: "pending", label: "New" },
                { value: "draft", label: "Reviewed" },
              ],
            },
            ...(activeTab !== "blog"
              ? [
                  {
                    key: "batch",
                    label: "All Batches",
                    value: batchFilter,
                    options: batches
                      .filter((b) => b.batch_name)
                      .map((b) => ({ value: b.batch_name!, label: b.batch_name! })),
                  },
                ]
              : []),
            {
              key: "category",
              label: "All Categories",
              value: categoryFilter,
              options: categories.map((c) => ({ value: c.id, label: c.name })),
            },
          ]}
          onFilterChange={handleFilterChange}
        />

        {/* Inbox Cards */}
        <div className="space-y-3">
          {paginated.length === 0 && (
            <div className="bg-white border border-[#e5e5e5] p-8 text-center">
              <p className="text-[13px] text-[#6b7280]">No items found.</p>
            </div>
          )}
          {paginated.map((item) =>
            item.type === "script" ? (
              <ScriptCard
                key={item.data.id}
                script={item.data as ScriptRow}
                expanded={expandedIds.has(item.data.id)}
                onToggle={() => toggleExpand(item.data.id)}
              />
            ) : (
              <BlogCard key={item.data.id} post={item.data as BlogRow} />
            )
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

/* ---------- Script Card ---------- */
function ScriptCard({
  script,
  expanded,
  onToggle,
}: {
  script: ScriptRow;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white border border-[#e5e5e5] border-l-4 border-l-[#f59e0b]">
      <div className="px-5 py-4">
        {/* Title */}
        <h3 className="font-display text-[16px] font-semibold text-black">{script.title}</h3>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <StatusBadge variant="orange">Script</StatusBadge>
          {script.stories?.score != null && (
            <span className="text-[11px] text-[#6b7280]">Score: {script.stories.score}</span>
          )}
          {script.platform && (
            <span className="text-[11px] text-[#6b7280]">{script.platform}</span>
          )}
          {script.script_batches?.batch_name && (
            <StatusBadge variant="yellow">{script.script_batches.batch_name}</StatusBadge>
          )}
        </div>

        {/* Expandable body */}
        {script.script_text && (
          <div className="mt-3">
            <button
              onClick={onToggle}
              className="flex items-center gap-1 text-[12px] font-semibold text-[#6b7280] hover:text-black transition-colors"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? "Hide Script" : "Show Script"}
            </button>
            {expanded && (
              <pre className="mt-2 bg-[#f5f5f5] border border-[#e5e5e5] p-3 text-[12px] font-body text-[#374151] whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                {script.script_text}
              </pre>
            )}
          </div>
        )}

        {/* Platform captions */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {PLATFORMS.map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 text-[10px] font-semibold bg-[#f5f5f5] border border-[#e5e5e5] text-[#6b7280]"
            >
              {p}
            </span>
          ))}
        </div>
        {script.caption && (
          <p className="mt-1.5 text-[11px] text-[#6b7280] italic">{script.caption}</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => console.log("Approve script:", script.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => console.log("Rewrite script:", script.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
          >
            Rewrite
          </button>
          <button
            onClick={() => console.log("Reject script:", script.id)}
            className="text-[#c1121f] text-xs font-semibold hover:underline"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Blog Card ---------- */
function BlogCard({ post }: { post: BlogRow }) {
  return (
    <div className="bg-white border border-[#e5e5e5] border-l-4 border-l-[#2563eb]">
      <div className="px-5 py-4">
        <h3 className="font-display text-[16px] font-semibold text-black">{post.title}</h3>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <StatusBadge variant="blue">Blog Draft</StatusBadge>
          {post.categories?.name && (
            <span className="text-[11px] text-[#6b7280]">{post.categories.name}</span>
          )}
          {post.word_count != null && (
            <span className="text-[11px] text-[#6b7280]">{post.word_count.toLocaleString()} words</span>
          )}
          {post.content_source && (
            <StatusBadge variant="gray">{post.content_source}</StatusBadge>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => console.log("Approve post:", post.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => console.log("Rewrite post:", post.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
          >
            Rewrite
          </button>
          <button
            onClick={() => console.log("Preview post:", post.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
          >
            Preview
          </button>
          <button
            onClick={() => console.log("Reject post:", post.id)}
            className="text-[#c1121f] text-xs font-semibold hover:underline"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

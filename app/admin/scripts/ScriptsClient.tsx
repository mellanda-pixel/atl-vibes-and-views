"use client";

import { useState, useMemo } from "react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { StatCard } from "@/components/portal/StatCard";
import { StatGrid } from "@/components/portal/StatGrid";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { FilterBar } from "@/components/portal/FilterBar";
import { AdminDataTable } from "@/components/portal/AdminDataTable";
import { Pagination } from "@/components/portal/Pagination";

interface ScriptRow {
  id: string;
  title: string;
  script_batch_id: string | null;
  platform: string | null;
  format: string | null;
  status: string;
  caption: string | null;
  scheduled_date: string | null;
  created_at: string;
  script_batches: { batch_name: string | null } | null;
}

interface ScriptsClientProps {
  scripts: ScriptRow[];
  batches: { id: string; batch_name: string }[];
}

const ITEMS_PER_PAGE = 25;

const statusBadgeMap: Record<string, "yellow" | "green" | "red" | "blue" | "gray"> = {
  pending: "yellow",
  approved: "green",
  rejected: "red",
  published: "blue",
  draft: "gray",
};

export function ScriptsClient({ scripts, batches }: ScriptsClientProps) {
  const [statusFilter, setStatusFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [page, setPage] = useState(1);

  // Stats
  const pendingCount = scripts.filter((s) => s.status === "pending").length;
  const approvedCount = scripts.filter((s) => s.status === "approved").length;
  const publishedCount = scripts.filter((s) => s.status === "published").length;

  const filtered = useMemo(() => {
    let items = scripts;
    if (statusFilter) items = items.filter((s) => s.status === statusFilter);
    if (batchFilter) items = items.filter((s) => s.script_batch_id === batchFilter);
    if (platformFilter) items = items.filter((s) => s.platform === platformFilter);
    return items;
  }, [scripts, statusFilter, batchFilter, platformFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setStatusFilter(value);
    if (key === "batch") setBatchFilter(value);
    if (key === "platform") setPlatformFilter(value);
    setPage(1);
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      width: "30%",
      render: (item: ScriptRow) => (
        <span className="font-display text-[14px] font-semibold text-black">
          {item.title}
        </span>
      ),
    },
    {
      key: "batch",
      header: "Batch",
      render: (item: ScriptRow) => (
        <span className="text-[13px]">{item.script_batches?.batch_name ?? "—"}</span>
      ),
    },
    {
      key: "platform",
      header: "Platform",
      render: (item: ScriptRow) => (
        <span className="text-[13px]">{item.platform ?? "—"}</span>
      ),
    },
    {
      key: "format",
      header: "Format",
      render: (item: ScriptRow) => (
        <span className="text-[13px]">{item.format ?? "—"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ScriptRow) => (
        <StatusBadge variant={statusBadgeMap[item.status] ?? "gray"}>
          {item.status}
        </StatusBadge>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      render: (item: ScriptRow) => (
        <span className="text-[12px] text-[#6b7280]">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const renderActions = (script: ScriptRow) => {
    if (script.status === "pending") {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Approve script:", script.id)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => console.log("Reject script:", script.id)}
            className="text-xs font-semibold text-[#c1121f] hover:text-[#a10e1a] transition-colors"
          >
            Reject
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => console.log("View script:", script.id)}
        className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
      >
        View
      </button>
    );
  };

  return (
    <>
      <PortalTopbar
        title="Scripts"
        actions={
          <span className="text-[12px] text-[#6b7280]">
            Video scripts from S5 automation — delivered every Friday
          </span>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-4">
        <StatGrid columns={3}>
          <StatCard
            label="Pending"
            value={pendingCount}
            badge={pendingCount > 0 ? { text: "Review", variant: "yellow" } : undefined}
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            badge={approvedCount > 0 ? { text: "Ready", variant: "green" } : undefined}
          />
          <StatCard label="Published" value={publishedCount} />
        </StatGrid>

        <FilterBar
          filters={[
            {
              key: "batch",
              label: "All Batches",
              value: batchFilter,
              options: batches.map((b) => ({ value: b.id, label: b.batch_name })),
            },
            {
              key: "status",
              label: "All Status",
              value: statusFilter,
              options: [
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
                { value: "published", label: "Published" },
              ],
            },
            {
              key: "platform",
              label: "All Platforms",
              value: platformFilter,
              options: [
                { value: "YouTube", label: "YouTube" },
                { value: "Instagram", label: "Instagram" },
                { value: "TikTok", label: "TikTok" },
              ],
            },
          ]}
          onFilterChange={handleFilterChange}
        />

        <AdminDataTable
          columns={columns}
          data={paginated}
          actions={(item) => renderActions(item)}
          emptyMessage="No scripts found."
        />

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

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { AdminDataTable } from "@/components/portal/AdminDataTable";
import { StatusBadge } from "@/components/portal/StatusBadge";

/* ============================================================
   PACKAGE TEMPLATES — Sponsor package management
   ============================================================ */

interface PackageTemplate {
  id: string;
  name: string;
  price: number | null;
  placements_included: number | null;
  description: string | null;
  features: string | null;
  is_active: boolean;
  created_at: string;
}

interface PackagesClientProps {
  packages: PackageTemplate[];
  sponsors: { id: string; package_type: string | null; status: string }[];
}

export function PackagesClient({ packages, sponsors }: PackagesClientProps) {
  // Count sponsors by package type
  const usageMap = useMemo(() => {
    const map: Record<string, number> = {};
    sponsors.forEach((s) => {
      if (s.package_type) {
        map[s.package_type] = (map[s.package_type] ?? 0) + 1;
      }
    });
    return map;
  }, [sponsors]);

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Package Name",
        width: "25%",
        render: (item: PackageTemplate) => (
          <span className="font-display text-[14px] font-semibold text-black">
            {item.name}
          </span>
        ),
      },
      {
        key: "price",
        header: "Price",
        render: (item: PackageTemplate) => (
          <span className="text-[13px] font-semibold text-[#374151]">
            {item.price ? `$${item.price.toLocaleString()}` : "—"}
          </span>
        ),
      },
      {
        key: "placements_included",
        header: "Placements",
        render: (item: PackageTemplate) => (
          <span className="text-[13px] text-[#374151]">
            {item.placements_included ?? "—"}
          </span>
        ),
      },
      {
        key: "usage",
        header: "Active Sponsors",
        render: (item: PackageTemplate) => (
          <span className="text-[13px] text-[#374151]">
            {usageMap[item.name] ?? 0}
          </span>
        ),
      },
      {
        key: "is_active",
        header: "Status",
        render: (item: PackageTemplate) => (
          <StatusBadge variant={item.is_active ? "green" : "gray"}>
            {item.is_active ? "Active" : "Inactive"}
          </StatusBadge>
        ),
      },
      {
        key: "description",
        header: "Description",
        render: (item: PackageTemplate) => (
          <span className="text-[12px] text-[#6b7280] line-clamp-2">
            {item.description ?? "—"}
          </span>
        ),
      },
    ],
    [usageMap]
  );

  return (
    <>
      <PortalTopbar
        title="Package Templates"
        actions={
          <div className="flex items-center gap-3">
            <Link
              href="/admin/sponsors"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-[#e5e5e5] text-[#374151] hover:border-[#d1d5db] transition-colors"
            >
              <ArrowLeft size={14} /> Sponsors
            </Link>
            <button
              onClick={() => console.log("Create package")}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[#fee198] text-[#1a1a1a] hover:bg-[#e6c46d] transition-colors"
            >
              + New Package
            </button>
          </div>
        }
      />
      <div className="p-8 max-[899px]:pt-16 space-y-4">
        <AdminDataTable
          columns={columns}
          data={packages}
          emptyMessage="No package templates yet. Create one to get started."
        />
      </div>
    </>
  );
}

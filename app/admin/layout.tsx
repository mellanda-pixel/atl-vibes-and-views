import { Metadata } from "next";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Video,
  Image,
  Mail,
  Globe,
  CalendarDays,
  Search,
  Building2,
  Calendar,
  Inbox,
  Star,
  Eye,
  FolderTree,
  Hash,
  Handshake,
  Megaphone,
  CreditCard,
  Users,
  MessageSquare,
  Bookmark,
  Award,
  ArrowRightLeft,
  Landmark,
  Settings,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { createServerClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin | ATL Vibes & Views",
  description: "Admin CMS for ATL Vibes & Views.",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  // Fetch count badges in parallel
  const counts = (await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("stories").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("scripts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("newsletters").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])) as unknown as { count: number | null }[];

  const draftPosts = counts[0].count ?? 0;
  const newStories = counts[1].count ?? 0;
  const draftScripts = counts[2].count ?? 0;
  const draftNewsletters = counts[3].count ?? 0;
  const pendingSubmissions = counts[4].count ?? 0;
  const pendingReviews = counts[5].count ?? 0;

  const navGroups = [
    {
      label: "Content",
      items: [
        { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={16} /> },
        { label: "Blog Posts", path: "/admin/blog", icon: <FileText size={16} />, ...(draftPosts > 0 ? { count: draftPosts } : {}) },
        { label: "Stories", path: "/admin/stories", icon: <BookOpen size={16} />, ...(newStories > 0 ? { count: newStories } : {}) },
        { label: "Scripts", path: "/admin/scripts", icon: <Video size={16} />, ...(draftScripts > 0 ? { count: draftScripts } : {}) },
        { label: "Media", path: "/admin/media", icon: <Image size={16} /> },
        { label: "Newsletters", path: "/admin/newsletters", icon: <Mail size={16} />, ...(draftNewsletters > 0 ? { count: draftNewsletters } : {}) },
        { label: "Published", path: "/admin/published", icon: <Globe size={16} /> },
        { label: "Calendar", path: "/admin/calendar", icon: <CalendarDays size={16} /> },
        { label: "SEO Ideas", path: "/admin/seo", icon: <Search size={16} /> },
      ],
    },
    {
      label: "Directory",
      items: [
        { label: "Businesses", path: "/admin/businesses", icon: <Building2 size={16} /> },
        { label: "Events", path: "/admin/events", icon: <Calendar size={16} /> },
        { label: "Submissions", path: "/admin/submissions", icon: <Inbox size={16} />, ...(pendingSubmissions > 0 ? { count: pendingSubmissions } : {}) },
        { label: "Reviews", path: "/admin/reviews", icon: <Star size={16} />, ...(pendingReviews > 0 ? { count: pendingReviews } : {}) },
        { label: "Watchlist", path: "/admin/watchlist", icon: <Eye size={16} /> },
      ],
    },
    {
      label: "Taxonomy",
      items: [
        { label: "Categories", path: "/admin/categories", icon: <FolderTree size={16} /> },
        { label: "Tags", path: "/admin/tags", icon: <Hash size={16} /> },
      ],
    },
    {
      label: "Revenue",
      items: [
        { label: "Sponsors", path: "/admin/sponsors", icon: <Handshake size={16} /> },
        { label: "Ad Campaigns", path: "/admin/ads", icon: <Megaphone size={16} /> },
        { label: "Subscriptions", path: "/admin/subscriptions", icon: <CreditCard size={16} /> },
      ],
    },
    {
      label: "Community",
      items: [
        { label: "Users", path: "/admin/users", icon: <Users size={16} /> },
        { label: "Comments", path: "/admin/comments", icon: <MessageSquare size={16} /> },
        { label: "Saved Items", path: "/admin/saved", icon: <Bookmark size={16} /> },
      ],
    },
    {
      label: "System",
      items: [
        { label: "Featured Slots", path: "/admin/featured", icon: <Award size={16} /> },
        { label: "Redirects", path: "/admin/redirects", icon: <ArrowRightLeft size={16} /> },
        { label: "Organizations", path: "/admin/organizations", icon: <Landmark size={16} /> },
        { label: "Settings", path: "/admin/settings", icon: <Settings size={16} /> },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <PortalSidebar
        theme="dark"
        brandLabel="ATL Vibes & Views"
        subLabel="Admin CMS"
        navGroups={navGroups}
        activePath="/admin"
      />
      <main className="flex-1 min-[900px]:ml-[240px] max-[899px]:ml-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

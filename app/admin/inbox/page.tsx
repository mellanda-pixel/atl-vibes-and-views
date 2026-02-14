import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import { InboxClient } from "./InboxClient";

export const metadata: Metadata = {
  title: "Content Inbox | Admin CMS | ATL Vibes & Views",
  description: "Review, approve, or reject content before publishing.",
  robots: { index: false, follow: false },
};

export default async function InboxPage() {
  const supabase = createServerClient();

  // Scripts with batch and linked story score
  const { data: scripts, error: scriptsErr } = (await supabase
    .from("scripts")
    .select("*, script_batches(batch_name, week_of), stories(score, headline)")
    .in("status", ["pending", "draft"])
    .order("created_at", { ascending: false })) as {
    data: {
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
    }[] | null;
    error: unknown;
  };
  if (scriptsErr) console.error("Failed to fetch scripts:", scriptsErr);

  // Blog drafts with category
  const { data: blogDrafts, error: blogErr } = (await supabase
    .from("blog_posts")
    .select("*, categories(name)")
    .eq("status", "draft")
    .order("created_at", { ascending: false })) as {
    data: {
      id: string;
      title: string;
      status: string;
      type: string | null;
      category_id: string | null;
      word_count: number | null;
      content_source: string | null;
      created_at: string;
      categories: { name: string } | null;
    }[] | null;
    error: unknown;
  };
  if (blogErr) console.error("Failed to fetch blog drafts:", blogErr);

  // Categories for filter
  const { data: categories } = (await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order")) as { data: { id: string; name: string }[] | null };

  // Script batches for filter
  const { data: batches } = (await supabase
    .from("script_batches")
    .select("id, batch_name")
    .order("week_of", { ascending: false })) as {
    data: { id: string; batch_name: string | null }[] | null;
  };

  return (
    <InboxClient
      scripts={scripts ?? []}
      blogDrafts={blogDrafts ?? []}
      categories={categories ?? []}
      batches={batches ?? []}
    />
  );
}

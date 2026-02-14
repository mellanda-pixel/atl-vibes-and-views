import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import { PublishingClient } from "./PublishingClient";

export const metadata: Metadata = {
  title: "Publishing Queue | Admin CMS | ATL Vibes & Views",
  description: "Approved content — attach media, preview, and publish.",
  robots: { index: false, follow: false },
};

export default async function PublishingPage() {
  const supabase = createServerClient();
  const today = new Date().toISOString().split("T")[0];

  // Blog posts in publishing pipeline
  const { data: posts, error: postsErr } = (await supabase
    .from("blog_posts")
    .select("*, categories(name)")
    .in("status", ["approved", "scheduled", "published"])
    .order("created_at", { ascending: false })) as {
    data: {
      id: string;
      title: string;
      status: string;
      type: string | null;
      content_source: string | null;
      featured_image_url: string | null;
      published_at: string | null;
      created_at: string;
      categories: { name: string } | null;
    }[] | null;
    error: unknown;
  };
  if (postsErr) console.error("Failed to fetch publishing posts:", postsErr);

  // Scripts that are approved
  const { data: scripts, error: scriptsErr } = (await supabase
    .from("scripts")
    .select("*, script_batches(batch_name)")
    .in("status", ["approved", "scheduled", "published"])
    .order("created_at", { ascending: false })) as {
    data: {
      id: string;
      title: string;
      status: string;
      platform: string | null;
      format: string | null;
      caption: string | null;
      created_at: string;
      script_batches: { batch_name: string | null } | null;
    }[] | null;
    error: unknown;
  };
  if (scriptsErr) console.error("Failed to fetch publishing scripts:", scriptsErr);

  return (
    <PublishingClient
      posts={posts ?? []}
      scripts={scripts ?? []}
      today={today}
    />
  );
}

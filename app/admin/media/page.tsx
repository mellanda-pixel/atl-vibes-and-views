import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import { MediaClient } from "./MediaClient";

export const metadata: Metadata = {
  title: "Media | Admin CMS | ATL Vibes & Views",
  description: "Manage media items for ATL Vibes & Views.",
  robots: { index: false, follow: false },
};

export default async function MediaPage() {
  const supabase = createServerClient();

  const { data: media, error: mediaErr } = (await supabase
    .from("media_items")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: {
      id: string;
      title: string;
      slug: string;
      media_type: string;
      source_type: string;
      embed_url: string | null;
      thumbnail_url: string | null;
      status: string;
      published_at: string | null;
      is_featured: boolean;
      created_at: string;
    }[] | null;
    error: unknown;
  };
  if (mediaErr) console.error("Failed to fetch media items:", mediaErr);

  return <MediaClient media={media ?? []} />;
}

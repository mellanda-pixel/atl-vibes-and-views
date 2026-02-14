import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase";
import { ScriptsClient } from "./ScriptsClient";

export const metadata: Metadata = {
  title: "Scripts | Admin CMS | ATL Vibes & Views",
  description: "Video scripts from S5 automation — delivered every Friday.",
  robots: { index: false, follow: false },
};

export default async function ScriptsPage() {
  const supabase = createServerClient();

  const { data: scripts, error: scriptsErr } = (await supabase
    .from("scripts")
    .select("*, script_batches(batch_name)")
    .order("created_at", { ascending: false })) as {
    data: {
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
    }[] | null;
    error: unknown;
  };
  if (scriptsErr) console.error("Failed to fetch scripts:", scriptsErr);

  const { data: batches } = (await supabase
    .from("script_batches")
    .select("id, batch_name")
    .order("week_of", { ascending: false })) as {
    data: { id: string; batch_name: string | null }[] | null;
  };

  return (
    <ScriptsClient
      scripts={scripts ?? []}
      batches={(batches ?? []).filter((b) => b.batch_name !== null) as { id: string; batch_name: string }[]}
    />
  );
}

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/* ============================================================
   SUPABASE CLIENT
   
   Server Components: Use createServerClient()
   Client Components: Use createBrowserClient()
   
   Environment variables required:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   ============================================================ */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* --- Server-side client (for Server Components & API routes) --- */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

/* --- Browser client (for Client Components) --- */
let browserClient: ReturnType<typeof createClient<Database>> | null = null;

export function createBrowserClient() {
  if (!browserClient) {
    browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

/* --- Default export for quick imports --- */
export const supabase = createServerClient();

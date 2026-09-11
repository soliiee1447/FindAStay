import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project (Settings > API) and live in
// .env.local (see .env.example). The NEXT_PUBLIC_ prefix tells Next.js
// it's safe to send these values to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Copy .env.example to .env.local and fill in your project's URL and anon key."
  );
}

// The "anon" key is safe to expose publicly — it can only do what your
// Row Level Security (RLS) policies in Supabase allow it to do.
// Import `supabase` from this file anywhere you need to talk to the database.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

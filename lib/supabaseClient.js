import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project (Settings > API) and live in
// .env.local (see .env.example). The NEXT_PUBLIC_ prefix tells Next.js
// it's safe to send these values to the browser.
let client = null;

function getSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.example to .env.local and fill in your project's URL and anon key."
    );
  }

  // The "anon" key is safe to expose publicly — it can only do what your
  // Row Level Security (RLS) policies in Supabase allow it to do.
  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

// Import `supabase` from this file anywhere you need to talk to the
// database. It's a proxy, not the real client — nothing runs, and no env
// vars are read, until the first time a feature actually calls something
// on it (e.g. `supabase.from(...)`). That way a missing env var only
// breaks whichever feature tries to use Supabase (wrap the call in
// try/catch and show a fallback in that part of the UI), instead of
// throwing at import time and failing the entire build.
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = getSupabaseClient()[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

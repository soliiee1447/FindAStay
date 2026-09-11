# FindAStay

A student housing marketplace, built with Next.js (App Router, JavaScript) and Supabase.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up Supabase**

   - Create a project at [supabase.com](https://supabase.com).
   - In the Supabase dashboard, open **SQL Editor**, paste the contents of [supabase/schema.sql](supabase/schema.sql), and run it. This creates the `listings` table.
   - In **Settings > API**, copy your Project URL and anon public key.

3. **Add your environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `lib/supabaseClient.js` — the shared Supabase client, used by both pages below.
- `app/page.js` — homepage: fetches listings (with location/price filters) and shows them in a card grid.
- `app/listings/[id]/page.js` — a single listing's detail page, including a map placeholder for its pin location.
- `app/components/` — `ListingCard`, `ListingFilters`, and `MapPlaceholder`.
- `supabase/schema.sql` — SQL to create the `listings` table and its Row Level Security policies.

## Adding test listings

Until there's a form for landlords to create listings, you can insert rows directly in the Supabase **Table Editor** (or SQL Editor) to see the homepage and detail pages in action.

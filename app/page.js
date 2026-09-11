import { supabase } from "@/lib/supabaseClient";
import ListingCard from "@/app/components/ListingCard";
import ListingFilters from "@/app/components/ListingFilters";

// This is a Server Component (no "use client"), so it runs on the server
// and can talk to Supabase directly — the query happens before the page
// is ever sent to the browser.
//
// `searchParams` holds whatever is in the URL's query string, e.g.
// "/?location=berkeley&maxPrice=1200". In this version of Next.js it's a
// Promise, so we `await` it.
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const location = params.location ?? "";
  const maxPrice = params.maxPrice ?? "";

  // Start building the query: all listings, newest first.
  let query = supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  // Only add filters if the user actually typed something.
  if (location) {
    // ilike = case-insensitive "contains" match, e.g. "berk" matches "Berkeley".
    query = query.ilike("location", `%${location}%`);
  }
  if (maxPrice) {
    query = query.lte("price", Number(maxPrice));
  }

  const { data: listings, error } = await query;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">FindAStay</h1>
      <p className="mt-1 text-zinc-600">
        Student housing near your campus.
      </p>

      <div className="mt-6">
        <ListingFilters location={location} maxPrice={maxPrice} />
      </div>

      {error && (
        <p className="mt-8 text-red-600">
          Couldn&apos;t load listings: {error.message}
        </p>
      )}

      {!error && listings.length === 0 && (
        <p className="mt-8 text-zinc-500">
          No listings match your filters yet.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </main>
  );
}

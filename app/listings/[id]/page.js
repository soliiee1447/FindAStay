import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import MapPlaceholder from "@/app/components/MapPlaceholder";

// `[id]` in the folder name makes this a dynamic route: visiting
// "/listings/abc-123" renders this page with params.id === "abc-123".
export default async function ListingDetailPage({ params }) {
  const { id } = await params;

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  // If the id doesn't match any row, show Next.js's built-in 404 page.
  if (error || !listing) {
    notFound();
  }

  const photos = listing.photos?.length ? listing.photos : [null];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link href="/" className="text-sm text-zinc-500 hover:underline">
        &larr; Back to listings
      </Link>

      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        {listing.title}
      </h1>
      <p className="text-zinc-500">{listing.location}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-900">
        ${listing.price} / month
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-video overflow-hidden rounded-lg bg-zinc-100"
          >
            {photo ? (
              <img
                src={photo}
                alt={`${listing.title} photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                No photo yet
              </div>
            )}
          </div>
        ))}
      </div>

      {listing.description && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">
            About this place
          </h2>
          <p className="mt-2 whitespace-pre-line text-zinc-700">
            {listing.description}
          </p>
        </section>
      )}

      {listing.amenities?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">Amenities</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <li
                key={amenity}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-zinc-900">Location</h2>
        <MapPlaceholder
          lat={listing.lat}
          lng={listing.lng}
          location={listing.location}
        />
      </section>
    </main>
  );
}

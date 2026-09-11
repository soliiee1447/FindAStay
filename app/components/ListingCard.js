import Link from "next/link";

// One card in the homepage grid. Clicking it goes to the listing's detail page.
export default function ListingCard({ listing }) {
  const firstPhoto = listing.photos?.[0];

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="aspect-video bg-zinc-100">
        {firstPhoto ? (
          // Plain <img> instead of next/image keeps this beginner-friendly —
          // next/image requires listing every allowed photo domain in
          // next.config, which is more setup than we need right now.
          <img
            src={firstPhoto}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No photo yet
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-zinc-900">{listing.title}</h2>
        <p className="text-sm text-zinc-500">{listing.location}</p>
        <p className="mt-2 font-medium text-zinc-900">
          ${listing.price} / month
        </p>
      </div>
    </Link>
  );
}

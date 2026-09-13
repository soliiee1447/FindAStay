import Link from "next/link";
import PhotoPlaceholder from "@/app/components/PhotoPlaceholder";
import VerifiedBadge from "@/app/components/VerifiedBadge";
import AmenityBadge from "@/app/components/AmenityBadge";
import { BedIcon, MapPinIcon } from "@/app/components/icons";
import { formatPrice } from "@/lib/mockListings";

const MAX_VISIBLE_AMENITIES = 3;

export default function ListingCard({
  listing,
  selected = false,
  onToggleCompare,
  compareDisabled = false,
}) {
  const visibleAmenities = listing.amenities.slice(0, MAX_VISIBLE_AMENITIES);
  const extraCount = listing.amenities.length - visibleAmenities.length;

  return (
    <div
      className={`group relative flex flex-col border bg-white transition-colors ${
        selected ? "border-brand-ink" : "border-brand-line hover:border-brand-ink-soft"
      }`}
    >
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] w-full">
          <PhotoPlaceholder seed={listing.gradient} className="h-full w-full" />
          {listing.verified && (
            <div className="absolute left-0 top-0">
              <VerifiedBadge size="sm" />
            </div>
          )}
          <div className="absolute bottom-2.5 left-2.5 bg-brand-ink px-2 py-1 text-xs font-medium text-white">
            {listing.walkMinutes} min walk to {listing.shortSchool}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleCompare?.(listing.id)}
        disabled={compareDisabled}
        aria-pressed={selected}
        className={`absolute right-2.5 top-2.5 flex items-center gap-1.5 border bg-white px-2.5 py-1 text-xs font-medium transition-colors ${
          selected
            ? "border-brand-green text-brand-green"
            : compareDisabled
              ? "cursor-not-allowed border-brand-line text-brand-muted"
              : "border-brand-line text-brand-ink-soft hover:border-brand-ink hover:text-brand-ink"
        }`}
      >
        <span
          className={`flex h-3.5 w-3.5 items-center justify-center border ${
            selected ? "border-brand-green bg-brand-green-tint" : "border-brand-ink-soft"
          }`}
        >
          {selected && (
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        Compare
      </button>

      <Link href={`/listings/${listing.id}`} className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold tracking-tight text-brand-ink">{listing.title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-brand-ink-soft">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
          {listing.location}
        </p>

        <p className="mt-2.5 text-lg font-bold text-brand-ink">
          {formatPrice(listing.price)}
          <span className="text-sm font-normal text-brand-ink-soft"> / month</span>
        </p>

        <p className="mt-1 flex items-center gap-1 text-sm text-brand-ink-soft">
          <BedIcon className="h-3.5 w-3.5 shrink-0" />
          {listing.bedrooms} bd · {listing.bathrooms} ba · {listing.sqm} sqm
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleAmenities.map((amenity) => (
            <AmenityBadge key={amenity} name={amenity} />
          ))}
          {extraCount > 0 && (
            <span className="inline-flex items-center border border-brand-line px-2 py-1 text-xs text-brand-muted">
              +{extraCount} more
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

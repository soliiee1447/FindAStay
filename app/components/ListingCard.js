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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-sm transition-all ${
        selected
          ? "border-brand-orange shadow-[0_0_0_1px_rgba(232,118,60,0.6)]"
          : "border-white/10 hover:-translate-y-0.5 hover:border-white/20"
      }`}
    >
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] w-full">
          <PhotoPlaceholder seed={listing.gradient} className="h-full w-full" />
          {listing.verified && (
            <div className="absolute left-2.5 top-2.5">
              <VerifiedBadge size="sm" />
            </div>
          )}
          <div className="absolute bottom-2.5 left-2.5 rounded-full bg-brand-teal-950/70 px-2.5 py-1 text-xs font-medium text-brand-cream backdrop-blur-sm">
            {listing.walkMinutes} min walk to {listing.shortSchool}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleCompare?.(listing.id)}
        disabled={compareDisabled}
        aria-pressed={selected}
        className={`absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ring-1 backdrop-blur-sm transition-colors ${
          selected
            ? "bg-brand-orange text-brand-teal-950 ring-brand-orange"
            : compareDisabled
              ? "cursor-not-allowed bg-brand-teal-950/50 text-brand-sage-dim ring-white/10"
              : "bg-brand-teal-950/60 text-brand-cream ring-white/15 hover:bg-brand-teal-950/80"
        }`}
      >
        <span
          className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border ${
            selected ? "border-brand-teal-950 bg-brand-teal-950/20" : "border-brand-sage"
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
        <h3 className="font-semibold tracking-tight text-brand-cream">{listing.title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-brand-sage">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
          {listing.location}
        </p>

        <p className="mt-2.5 text-lg font-bold text-brand-cream">
          {formatPrice(listing.price)}
          <span className="text-sm font-normal text-brand-sage"> / month</span>
        </p>

        <p className="mt-1 flex items-center gap-1 text-sm text-brand-sage">
          <BedIcon className="h-3.5 w-3.5 shrink-0" />
          {listing.bedrooms} bd · {listing.bathrooms} ba · {listing.sqm} sqm
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleAmenities.map((amenity) => (
            <AmenityBadge key={amenity} name={amenity} />
          ))}
          {extraCount > 0 && (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-brand-sage-dim">
              +{extraCount} more
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

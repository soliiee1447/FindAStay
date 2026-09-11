import Link from "next/link";
import PhotoPlaceholder from "@/app/components/PhotoPlaceholder";
import AmenityBadge from "@/app/components/AmenityBadge";
import StatusTag from "@/app/components/StatusTag";
import { BedIcon, MapPinIcon } from "@/app/components/icons";
import { formatPrice } from "@/lib/mockListings";

const MAX_VISIBLE_AMENITIES = 3;

function CardLink({ href, className, children }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Same visual language as the public ListingCard, but swaps the compare
// checkbox for the actions a landlord actually needs: an Edit button and a
// dashboard-only status tag.
export default function LandlordListingCard({ listing, status }) {
  const visibleAmenities = listing.amenities.slice(0, MAX_VISIBLE_AMENITIES);
  const extraCount = listing.amenities.length - visibleAmenities.length;
  // Freshly added via the demo form — not a real listing page to link to yet.
  const href = String(listing.id).startsWith("new-") ? null : `/listings/${listing.id}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <CardLink href={href} className="block">
        <div className="relative aspect-[4/3] w-full">
          <PhotoPlaceholder seed={listing.gradient} className="h-full w-full" />
          <div className="absolute left-2.5 top-2.5">
            <StatusTag status={status} />
          </div>
          <div className="absolute bottom-2.5 left-2.5 rounded-full bg-brand-teal-950/70 px-2.5 py-1 text-xs font-medium text-brand-cream backdrop-blur-sm">
            {listing.walkMinutes} min walk to {listing.shortSchool}
          </div>
        </div>
      </CardLink>

      <div className="flex flex-1 flex-col p-4">
        <CardLink href={href}>
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
        </CardLink>

        <button
          type="button"
          className="mt-4 w-full rounded-full border border-white/15 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-mint hover:text-brand-mint"
        >
          Edit listing
        </button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { mockListings, formatPrice } from "@/lib/mockListings";
import { compareTwoListings } from "@/lib/compareListings";
import PhotoPlaceholder from "@/app/components/PhotoPlaceholder";
import VerifiedBadge from "@/app/components/VerifiedBadge";
import {
  ChevronLeftIcon,
  XIcon,
  ArrowUpIcon,
  EqualsIcon,
  CheckBadgeIcon,
} from "@/app/components/icons";

// Reads "?ids=1,2" from the URL and looks each one up in the mock data —
// no client state needed, so removing a listing is just a link to a
// narrower query string. Only ever compares exactly two: the verdict UI
// (winner per row, diff callouts) is inherently head-to-head.
export default async function ComparePage({ searchParams }) {
  const params = await searchParams;
  const ids = (params.ids ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 2);

  const listings = ids
    .map((id) => mockListings.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-brand-ink-soft hover:text-brand-ink"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to listings
      </Link>

      <h1 className="mt-3 font-serif text-3xl text-brand-ink sm:text-4xl">
        Compare listings
      </h1>

      {listings.length < 2 ? (
        <div className="mt-8 border border-dashed border-brand-line py-16 text-center">
          <p className="font-medium text-brand-ink">
            Select 2 listings to compare.
          </p>
          <p className="mt-1 text-sm text-brand-muted">
            Head back to the listings page and tap &ldquo;Compare&rdquo; on
            the two you&apos;re deciding between.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
          >
            Browse listings
          </Link>
        </div>
      ) : (
        <ComparisonBody listings={listings} ids={ids} />
      )}
    </main>
  );
}

function ComparisonBody({ listings, ids }) {
  const [a, b] = listings;
  const verdict = compareTwoListings(a, b);

  return (
    <>
      <p className="mt-1 text-sm text-brand-ink-soft">
        Here&apos;s how these two actually stack up, category by category.
      </p>

      {/* Header cards */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {listings.map((listing) => {
          const other = ids.find((id) => id !== listing.id);
          return (
            <div key={listing.id} className="relative">
              <Link
                href={other ? `/compare?ids=${other}` : "/"}
                aria-label={`Remove ${listing.title} from comparison`}
                className="absolute right-2 top-2 z-10 bg-white p-1.5 text-brand-ink-soft shadow-sm hover:text-brand-ink"
              >
                <XIcon className="h-3.5 w-3.5" />
              </Link>
              <Link href={`/listings/${listing.id}`} className="block">
                <div className="aspect-video border border-brand-line">
                  <PhotoPlaceholder seed={listing.gradient} className="h-full w-full" />
                </div>
                <h2 className="mt-2 text-sm font-semibold text-brand-ink sm:text-base">
                  {listing.title}
                </h2>
              </Link>
              <p className="text-xs text-brand-muted">{listing.location}</p>
            </div>
          );
        })}
      </div>

      {/* Verdict rows */}
      <div className="mt-8 space-y-4">
        <VerdictRow
          label="Price"
          a={{
            headline: `${formatPrice(a.price)}/mo`,
            winner: verdict.price.winnerId === a.id,
            caption:
              verdict.price.winnerId === a.id
                ? `${formatPrice(verdict.price.diff)}/mo cheaper`
                : verdict.price.winnerId
                  ? `${formatPrice(verdict.price.diff)}/mo more`
                  : null,
          }}
          b={{
            headline: `${formatPrice(b.price)}/mo`,
            winner: verdict.price.winnerId === b.id,
            caption:
              verdict.price.winnerId === b.id
                ? `${formatPrice(verdict.price.diff)}/mo cheaper`
                : verdict.price.winnerId
                  ? `${formatPrice(verdict.price.diff)}/mo more`
                  : null,
          }}
          tie={!verdict.price.winnerId}
          tieCaption="Same price"
          direction="down"
        />

        <VerdictRow
          label="Distance to campus"
          a={{
            headline: `${a.walkMinutes} min walk`,
            winner: verdict.distance.winnerId === a.id,
            caption:
              verdict.distance.winnerId === a.id
                ? `${verdict.distance.diff} min closer`
                : verdict.distance.winnerId
                  ? `${verdict.distance.diff} min farther`
                  : null,
          }}
          b={{
            headline: `${b.walkMinutes} min walk`,
            winner: verdict.distance.winnerId === b.id,
            caption:
              verdict.distance.winnerId === b.id
                ? `${verdict.distance.diff} min closer`
                : verdict.distance.winnerId
                  ? `${verdict.distance.diff} min farther`
                  : null,
          }}
          tie={!verdict.distance.winnerId}
          tieCaption="Same distance"
          direction="down"
        />

        <VerdictRow
          label="Amenities"
          a={{
            headline: `${a.amenities.length} amenities`,
            winner: verdict.amenities.winnerId === a.id,
            caption:
              verdict.amenities.winnerId === a.id
                ? `${a.amenities.length - b.amenities.length} more than the other`
                : null,
            extra: verdict.amenities.aOnly.length > 0 && (
              <UniqueAmenities label="Only here" items={verdict.amenities.aOnly} />
            ),
          }}
          b={{
            headline: `${b.amenities.length} amenities`,
            winner: verdict.amenities.winnerId === b.id,
            caption:
              verdict.amenities.winnerId === b.id
                ? `${b.amenities.length - a.amenities.length} more than the other`
                : null,
            extra: verdict.amenities.bOnly.length > 0 && (
              <UniqueAmenities label="Only here" items={verdict.amenities.bOnly} />
            ),
          }}
          tie={!verdict.amenities.winnerId}
          tieCaption="Same amenity count"
          direction="up"
        />

        <VerdictRow
          label="Verification"
          a={{
            headline: a.verified ? "Verified" : "Not verified",
            winner: verdict.verification.winnerId === a.id,
            caption: verdict.verification.winnerId === a.id ? "The other landlord isn't verified" : null,
            icon: a.verified,
          }}
          b={{
            headline: b.verified ? "Verified" : "Not verified",
            winner: verdict.verification.winnerId === b.id,
            caption: verdict.verification.winnerId === b.id ? "The other landlord isn't verified" : null,
            icon: b.verified,
          }}
          tie={!verdict.verification.winnerId}
          tieCaption={a.verified ? "Both verified" : "Neither is verified yet"}
        />
      </div>

      {/* Best-for callouts */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {listings.map((listing) => (
          <div key={listing.id} className="border border-brand-line bg-white p-5">
            <span className="inline-flex items-center bg-brand-orange-tint px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-orange">
              {verdict.bestFor[listing.id]}
            </span>
            <Link
              href={`/listings/${listing.id}`}
              className="mt-2 block font-semibold text-brand-ink hover:underline"
            >
              {listing.title}
            </Link>
            <p className="mt-1 text-sm text-brand-ink-soft">
              {formatPrice(listing.price)}/mo · {listing.walkMinutes} min to{" "}
              {listing.shortSchool}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function VerdictRow({ label, a, b, tie, tieCaption, direction }) {
  const DirectionIcon =
    direction === "up" ? ArrowUpIcon : direction === "down" ? ArrowUpIcon : null;
  const directionClass = direction === "down" ? "rotate-180" : "";

  return (
    <div className="border border-brand-line bg-white p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
        {label}
      </p>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <VerdictCell side={a} tie={tie} DirectionIcon={DirectionIcon} directionClass={directionClass} />
        <VerdictCell side={b} tie={tie} DirectionIcon={DirectionIcon} directionClass={directionClass} />
      </div>
      {tie && <p className="mt-2 text-center text-xs text-brand-muted">{tieCaption}</p>}
    </div>
  );
}

function VerdictCell({ side, tie, DirectionIcon, directionClass }) {
  const highlight = side.winner && !tie;

  return (
    <div
      className={`border p-3 ${
        highlight ? "border-brand-green/40 bg-brand-green-tint" : "border-brand-line bg-brand-bg"
      }`}
    >
      <div className="flex items-center gap-1.5">
        {side.icon !== undefined ? (
          <CheckBadgeIcon
            className={`h-4 w-4 ${side.icon ? "text-brand-green" : "text-brand-muted"}`}
          />
        ) : highlight && DirectionIcon ? (
          <DirectionIcon className={`h-4 w-4 text-brand-green ${directionClass}`} />
        ) : tie ? (
          <EqualsIcon className="h-4 w-4 text-brand-muted" />
        ) : null}
        <p className={`font-semibold ${highlight ? "text-brand-green" : "text-brand-ink"}`}>
          {side.headline}
        </p>
      </div>
      {side.caption && (
        <p className={`mt-1 text-xs ${highlight ? "text-brand-green/80" : "text-brand-muted"}`}>
          {side.caption}
        </p>
      )}
      {side.extra}
    </div>
  );
}

function UniqueAmenities({ label, items }) {
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-wide text-brand-muted">{label}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {items.map((item) => (
          <span
            key={item}
            className="border border-brand-line bg-white px-2 py-0.5 text-[11px] text-brand-ink-soft"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

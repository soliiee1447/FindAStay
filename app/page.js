"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ListingCard from "@/app/components/ListingCard";
import ListingFilters from "@/app/components/ListingFilters";
import CompareBar from "@/app/components/CompareBar";
import VerifiedBadge from "@/app/components/VerifiedBadge";
import PhotoPlaceholder from "@/app/components/PhotoPlaceholder";
import { mockListings, formatPrice } from "@/lib/mockListings";

const MAX_COMPARE = 2;
const EMPTY_FILTERS = { location: "", minPrice: "", maxPrice: "", amenities: [] };
const FEATURED = mockListings[0];

export default function HomePage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [compareIds, setCompareIds] = useState([]);

  const hasActiveFilters =
    filters.location !== "" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.amenities.length > 0;

  const filteredListings = useMemo(() => {
    const location = filters.location.trim().toLowerCase();
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;

    return mockListings.filter((listing) => {
      if (
        location &&
        !`${listing.location} ${listing.school}`.toLowerCase().includes(location)
      ) {
        return false;
      }
      if (min !== null && listing.price < min) return false;
      if (max !== null && listing.price > max) return false;
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => listing.amenities.includes(a))
      ) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const compareListings = compareIds
    .map((id) => mockListings.find((l) => l.id === id))
    .filter(Boolean);

  function handleFilterChange(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleToggleCompare(id) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev
    );
  }

  return (
    <main className={compareIds.length > 0 ? "pb-28" : "pb-16"}>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center border border-brand-line px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-ink-soft">
              Now live near 5 Davao City campuses
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-brand-ink sm:text-6xl">
              Housing near campus, minus the horror stories.
            </h1>
            <p className="mt-5 max-w-md text-lg text-brand-ink-soft">
              FindAStay connects Davao students with verified landlords near
              Ateneo, UM, USeP, San Pedro, and Holy Cross — real prices, real
              walk times, zero shady group chats.
            </p>

            <div className="mt-8">
              <a
                href="#listings"
                className="inline-block bg-brand-orange px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-orange-dark"
              >
                Browse Listings
              </a>
            </div>

            <div className="mt-12 flex divide-x divide-brand-line border-t border-brand-line pt-6">
              <Stat value={mockListings.length} label="Active listings" />
              <Stat
                value={mockListings.filter((l) => l.verified).length}
                label="Verified landlords"
                className="pl-8"
              />
              <Stat value="5" label="Campuses covered" className="pl-8" />
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full">
              <PhotoPlaceholder seed={2} className="h-full w-full" />
            </div>
            <Link
              href={`/listings/${FEATURED.id}`}
              className="absolute -bottom-6 -left-6 hidden w-56 border border-brand-line bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:block"
            >
              <div className="aspect-video w-full">
                <PhotoPlaceholder seed={FEATURED.gradient} className="h-full w-full" />
              </div>
              <div className="mt-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brand-ink">
                    {FEATURED.title}
                  </p>
                  <p className="text-sm text-brand-ink-soft">{formatPrice(FEATURED.price)}/mo</p>
                </div>
                {FEATURED.verified && <VerifiedBadge size="sm" />}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div id="listings" className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-2xl text-brand-ink">Browse listings</h2>
          <VerifiedBadge size="sm" label="Verified landlords" />
        </div>
        <p className="mt-1 text-sm text-brand-ink-soft">
          Filter by campus, budget, and amenities. Pick {MAX_COMPARE} listings
          to see a head-to-head comparison.
        </p>

        <div className="mt-5">
          <ListingFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={() => setFilters(EMPTY_FILTERS)}
            resultCount={filteredListings.length}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {filteredListings.length === 0 ? (
          <div className="mt-10 border border-dashed border-brand-line py-16 text-center">
            <p className="font-medium text-brand-ink">No listings match your filters yet.</p>
            <p className="mt-1 text-sm text-brand-muted">
              Try widening your price range or clearing a filter.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                selected={compareIds.includes(listing.id)}
                onToggleCompare={handleToggleCompare}
                compareDisabled={
                  !compareIds.includes(listing.id) && compareIds.length >= MAX_COMPARE
                }
              />
            ))}
          </div>
        )}
      </div>

      <CompareBar
        selected={compareListings}
        onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        onClear={() => setCompareIds([])}
      />
    </main>
  );
}

function Stat({ value, label, className = "" }) {
  return (
    <div className={className}>
      <p className="text-2xl font-bold text-brand-ink">{value}</p>
      <p className="text-xs text-brand-muted">{label}</p>
    </div>
  );
}

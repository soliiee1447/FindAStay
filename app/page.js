"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/app/components/ListingCard";
import ListingFilters from "@/app/components/ListingFilters";
import CompareBar from "@/app/components/CompareBar";
import VerifiedBadge from "@/app/components/VerifiedBadge";
import { mockListings } from "@/lib/mockListings";

const MAX_COMPARE = 2;
const EMPTY_FILTERS = { location: "", minPrice: "", maxPrice: "", amenities: [] };

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
      <section className="px-4 py-20 text-center sm:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-sage">
            Now live near 5 Davao City campuses
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-balance text-brand-cream sm:text-6xl">
            Housing near campus, minus the horror stories.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-brand-sage">
            FindAStay connects Davao students with verified landlords near
            Ateneo, UM, USeP, San Pedro, and Holy Cross — real prices, real
            walk times, zero shady group chats.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#listings"
              className="rounded-full bg-brand-cream px-7 py-3 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-105"
            >
              Browse listings
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="px-3 py-4">
              <p className="text-2xl font-bold text-brand-cream">
                {mockListings.length}
              </p>
              <p className="text-xs text-brand-sage-dim">Active listings</p>
            </div>
            <div className="px-3 py-4">
              <p className="text-2xl font-bold text-brand-cream">
                {mockListings.filter((l) => l.verified).length}
              </p>
              <p className="text-xs text-brand-sage-dim">Verified landlords</p>
            </div>
            <div className="px-3 py-4">
              <p className="text-2xl font-bold text-brand-cream">5</p>
              <p className="text-xs text-brand-sage-dim">Campuses covered</p>
            </div>
          </div>
        </div>
      </section>

      <div id="listings" className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-brand-cream">
            Browse listings
          </h2>
          <VerifiedBadge size="sm" label="Verified landlords" />
        </div>
        <p className="mt-1 text-sm text-brand-sage">
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
          <div className="mt-10 rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <p className="font-medium text-brand-cream">No listings match your filters yet.</p>
            <p className="mt-1 text-sm text-brand-sage-dim">
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

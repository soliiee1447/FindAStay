import { allAmenities } from "@/lib/mockListings";
import { XIcon } from "@/app/components/icons";

// Fully controlled by the parent (app/page.js) — filtering happens
// client-side against the mock data, no navigation/query strings involved.
export default function ListingFilters({ filters, onChange, onClear, resultCount, hasActiveFilters }) {
  function toggleAmenity(amenity) {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ amenities: next });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-[180px] flex-1 flex-col">
          <label htmlFor="location" className="text-sm font-medium text-brand-cream">
            Location or campus
          </label>
          <input
            id="location"
            type="text"
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Ateneo, USeP, Matina"
            className="mt-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium text-brand-cream">
            Min price
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="₱0"
            className="mt-1.5 w-24 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium text-brand-cream">
            Max price
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="₱8,000"
            className="mt-1.5 w-24 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-brand-sage hover:bg-white/5 hover:text-brand-cream"
          >
            <XIcon className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {allAmenities.map((amenity) => {
          const active = filters.amenities.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-orange bg-brand-orange text-brand-teal-950"
                  : "border-white/15 bg-white/5 text-brand-sage hover:border-white/30 hover:text-brand-cream"
              }`}
            >
              {amenity}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-brand-sage-dim">
        {resultCount} {resultCount === 1 ? "listing" : "listings"} found
      </p>
    </div>
  );
}

import { allAmenities } from "@/lib/mockListings";
import { XIcon } from "@/app/components/icons";

const INPUT_CLASS =
  "mt-1.5 border border-brand-line bg-white px-4 py-2 text-sm text-brand-ink placeholder:text-brand-muted outline-none focus:border-brand-ink";

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
    <div className="border border-brand-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-[180px] flex-1 flex-col">
          <label htmlFor="location" className="text-sm font-medium text-brand-ink">
            Location or campus
          </label>
          <input
            id="location"
            type="text"
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Ateneo, USeP, Matina"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium text-brand-ink">
            Min price
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="₱0"
            className={`${INPUT_CLASS} w-24`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium text-brand-ink">
            Max price
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="₱8,000"
            className={`${INPUT_CLASS} w-24`}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-ink-soft hover:text-brand-ink"
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
              className={`border px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-orange bg-brand-orange-tint text-brand-orange"
                  : "border-brand-line bg-white text-brand-ink-soft hover:border-brand-ink-soft hover:text-brand-ink"
              }`}
            >
              {amenity}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-brand-muted">
        {resultCount} {resultCount === 1 ? "listing" : "listings"} found
      </p>
    </div>
  );
}

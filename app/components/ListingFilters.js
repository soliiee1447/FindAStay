import Link from "next/link";

// A plain HTML form with method="GET" — submitting it just navigates to
// "/?location=...&maxPrice=..." which the homepage reads via `searchParams`.
// No client-side JavaScript (useState, onChange, etc.) needed for this.
export default function ListingFilters({ location, maxPrice }) {
  return (
    <form
      method="GET"
      className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4"
    >
      <div className="flex flex-col">
        <label htmlFor="location" className="text-sm font-medium text-zinc-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={location}
          placeholder="e.g. Berkeley"
          className="mt-1 rounded border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="text-sm font-medium text-zinc-700">
          Max price / month
        </label>
        <input
          id="maxPrice"
          name="maxPrice"
          type="number"
          min="0"
          defaultValue={maxPrice}
          placeholder="e.g. 1200"
          className="mt-1 rounded border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Filter
      </button>

      {(location || maxPrice) && (
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          Clear filters
        </Link>
      )}
    </form>
  );
}

import Link from "next/link";
import { XIcon } from "@/app/components/icons";

const MAX_COMPARE = 2;

// Floating bar that appears once at least one listing is selected for
// comparison. Lets you review the picks, remove one, or jump to /compare.
export default function CompareBar({ selected, onRemove, onClear }) {
  if (selected.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-line bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-brand-ink">
          {selected.length}/{MAX_COMPARE} selected
        </span>

        <div className="flex flex-1 flex-wrap gap-2">
          {selected.map((listing) => (
            <span
              key={listing.id}
              className="flex items-center gap-1.5 border border-brand-line py-1 pl-3 pr-1.5 text-xs font-medium text-brand-ink"
            >
              {listing.title}
              <button
                type="button"
                onClick={() => onRemove(listing.id)}
                aria-label={`Remove ${listing.title} from comparison`}
                className="p-0.5 text-brand-muted hover:text-brand-ink"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-brand-ink-soft hover:text-brand-ink"
          >
            Clear
          </button>
          {selected.length >= 2 ? (
            <Link
              href={`/compare?ids=${selected.map((l) => l.id).join(",")}`}
              className="bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
            >
              Compare
            </Link>
          ) : (
            <span className="bg-brand-surface px-4 py-2 text-sm font-medium text-brand-muted">
              Pick 1 more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

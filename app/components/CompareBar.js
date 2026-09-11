import Link from "next/link";
import { XIcon } from "@/app/components/icons";

const MAX_COMPARE = 2;

// Floating bar that appears once at least one listing is selected for
// comparison. Lets you review the picks, remove one, or jump to /compare.
export default function CompareBar({ selected, onRemove, onClear }) {
  if (selected.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-brand-teal-950/90 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-brand-cream">
          {selected.length}/{MAX_COMPARE} selected
        </span>

        <div className="flex flex-1 flex-wrap gap-2">
          {selected.map((listing) => (
            <span
              key={listing.id}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1 pl-3 pr-1.5 text-xs font-medium text-brand-cream"
            >
              {listing.title}
              <button
                type="button"
                onClick={() => onRemove(listing.id)}
                aria-label={`Remove ${listing.title} from comparison`}
                className="rounded-full p-0.5 text-brand-sage-dim hover:bg-white/10 hover:text-brand-cream"
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
            className="text-sm font-medium text-brand-sage hover:text-brand-cream"
          >
            Clear
          </button>
          {selected.length >= 2 ? (
            <Link
              href={`/compare?ids=${selected.map((l) => l.id).join(",")}`}
              className="rounded-full bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-105"
            >
              Compare
            </Link>
          ) : (
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-brand-sage-dim">
              Pick 1 more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

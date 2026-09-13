import VerifiedBadge from "@/app/components/VerifiedBadge";
import { StarIcon, ClockIcon, UserIcon } from "@/app/components/icons";

export default function LandlordCard({ landlord }) {
  const initials = landlord.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="border border-brand-line bg-white p-5">
      <h3 className="text-sm font-semibold text-brand-ink-soft">Hosted by</h3>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand-ink text-sm font-bold text-white">
          {initials || <UserIcon className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="font-semibold text-brand-ink">{landlord.name}</p>
            {landlord.verified && <VerifiedBadge size="sm" />}
          </div>
          <p className="text-xs text-brand-muted">
            Member since {landlord.memberSince}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-brand-line pt-4 text-sm">
        <div className="flex items-center gap-2 text-brand-ink-soft">
          <StarIcon className="h-4 w-4 text-brand-orange" filled />
          <span className="font-medium text-brand-ink">{landlord.rating}</span>
          <span className="text-brand-muted">({landlord.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-2 text-brand-ink-soft">
          <ClockIcon className="h-4 w-4 shrink-0" />
          {landlord.responseTime}
        </div>
      </dl>

      {!landlord.verified && (
        <p className="mt-4 border border-brand-orange/30 bg-brand-orange-tint px-3 py-2 text-xs text-brand-orange">
          This landlord hasn&apos;t completed FindAStay verification yet.
        </p>
      )}

      <button
        type="button"
        className="mt-4 w-full bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
      >
        Message landlord
      </button>
    </div>
  );
}

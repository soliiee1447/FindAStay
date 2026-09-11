import VerifiedBadge from "@/app/components/VerifiedBadge";
import { StarIcon, ClockIcon, UserIcon } from "@/app/components/icons";

export default function LandlordCard({ landlord }) {
  const initials = landlord.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <h3 className="text-sm font-semibold text-brand-sage">Hosted by</h3>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cream text-sm font-bold text-brand-teal-950">
          {initials || <UserIcon className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="font-semibold text-brand-cream">{landlord.name}</p>
            {landlord.verified && <VerifiedBadge size="sm" />}
          </div>
          <p className="text-xs text-brand-sage-dim">
            Member since {landlord.memberSince}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
        <div className="flex items-center gap-2 text-brand-sage">
          <StarIcon className="h-4 w-4 text-brand-orange" filled />
          <span className="font-medium text-brand-cream">{landlord.rating}</span>
          <span className="text-brand-sage-dim">({landlord.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-2 text-brand-sage">
          <ClockIcon className="h-4 w-4 shrink-0" />
          {landlord.responseTime}
        </div>
      </dl>

      {!landlord.verified && (
        <p className="mt-4 rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-3 py-2 text-xs text-brand-orange">
          This landlord hasn&apos;t completed FindAStay verification yet.
        </p>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-full bg-brand-cream px-4 py-2.5 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-[1.02]"
      >
        Message landlord
      </button>
    </div>
  );
}

import { CheckBadgeIcon } from "@/app/components/icons";

const SIZES = {
  sm: "gap-1 px-2 py-0.5 text-[11px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-1.5 px-3 py-1.5 text-sm",
};

const ICON_SIZES = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

// The trust signal for the pitch: mint as an accent (icon + text + thin
// border) on a dark glass pill, rather than a solid mint fill — keeps mint
// a highlight color instead of a dominant block repeated across every card.
export default function VerifiedBadge({ size = "md", label = "Verified" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand-mint/40 bg-brand-teal-950/70 font-semibold text-brand-mint backdrop-blur-sm ${SIZES[size]}`}
    >
      <CheckBadgeIcon className={ICON_SIZES[size]} />
      {label}
    </span>
  );
}

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

// The trust signal for the pitch: a filled mint pill with a checkmark badge
// icon, dark-teal text so it reads as a confident stamp rather than a
// generic green "ok" chip.
export default function VerifiedBadge({ size = "md", label = "Verified" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-mint font-semibold text-brand-teal-950 shadow-[0_0_12px_rgba(61,217,196,0.35)] ${SIZES[size]}`}
    >
      <CheckBadgeIcon className={ICON_SIZES[size]} />
      {label}
    </span>
  );
}

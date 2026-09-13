import { CheckBadgeIcon } from "@/app/components/icons";

const SIZES = {
  sm: "gap-1 px-1.5 py-0.5 text-[10px]",
  md: "gap-1 px-2 py-1 text-xs",
  lg: "gap-1.5 px-2.5 py-1.5 text-sm",
};

const ICON_SIZES = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

// The trust signal for the pitch: a small solid-green tag, sharp corners —
// a badge is inherently accent-scale, so a flat fill here still reads as
// an accent rather than a dominant color.
export default function VerifiedBadge({ size = "md", label = "Verified" }) {
  return (
    <span
      className={`inline-flex items-center bg-brand-green font-semibold uppercase tracking-wide text-white ${SIZES[size]}`}
    >
      <CheckBadgeIcon className={ICON_SIZES[size]} />
      {label}
    </span>
  );
}

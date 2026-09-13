import { renderAmenityIcon } from "@/app/components/icons";

export default function AmenityBadge({ name, size = "sm" }) {
  const padding = size === "sm" ? "gap-1 px-2 py-1 text-xs" : "gap-1.5 px-3 py-1.5 text-sm";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <span
      className={`inline-flex items-center border border-brand-line text-brand-ink-soft ${padding}`}
    >
      {renderAmenityIcon(name, `${iconSize} text-brand-green`)}
      {name}
    </span>
  );
}

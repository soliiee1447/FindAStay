import { HouseIcon } from "@/app/components/icons";

// Stand-in for a real listing photo. Entirely CSS (no network image
// requests), so the demo works offline. Flat, neutral, sharp-edged — real
// product photography would go here, so no orange/green wash; those stay
// accent colors used only in badges/tags/icons elsewhere on the page.
const TONES = ["#F1F0EA", "#ECEAE1", "#F5F3EC", "#EFEDE4"];

export default function PhotoPlaceholder({ seed = 0, className = "" }) {
  const tone = TONES[Math.abs(seed) % TONES.length];

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ backgroundColor: tone }}
    >
      <HouseIcon className="h-10 w-10 text-brand-muted" />
    </div>
  );
}

import { HouseIcon } from "@/app/components/icons";

// Stand-in for a real listing photo. Entirely CSS (no network image
// requests), so the demo works offline. `seed` picks one of the brand's
// moody teal/orange/mint duotone gradients so every "photo" still reads as
// on-brand instead of a generic rainbow of pastel placeholders.
const GRADIENTS = [
  "from-brand-teal-900 via-brand-teal-800 to-brand-orange/70",
  "from-brand-teal-950 via-brand-teal-800 to-brand-mint/50",
  "from-brand-orange/80 via-brand-teal-900 to-brand-teal-950",
  "from-brand-mint/60 via-brand-teal-900 to-brand-teal-950",
  "from-brand-teal-800 via-brand-teal-900 to-brand-orange/60",
  "from-brand-teal-950 via-brand-orange/40 to-brand-mint/40",
  "from-brand-mint/50 via-brand-teal-950 to-brand-orange/50",
];

export default function PhotoPlaceholder({ seed = 0, className = "" }) {
  const gradient = GRADIENTS[Math.abs(seed) % GRADIENTS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 bg-brand-teal-950/10" />
      <HouseIcon className="relative h-10 w-10 text-brand-cream/60" />
    </div>
  );
}

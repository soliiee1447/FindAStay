import { HouseIcon } from "@/app/components/icons";

// Stand-in for a real listing photo. Entirely CSS (no network image
// requests), so the demo works offline. Each card sits on the brand's deep
// teal base with a single soft orange or mint glow — an accent, not a
// full-bleed color wash — so orange/mint stay highlight colors even though
// this block repeats across every card in the grid.
const GLOW_POSITIONS = [
  "at 85% 15%",
  "at 15% 85%",
  "at 85% 85%",
  "at 15% 15%",
  "at 50% 0%",
  "at 90% 55%",
  "at 10% 55%",
];

const GLOW_COLORS = ["#E8763C", "#3DD9C4"];

export default function PhotoPlaceholder({ seed = 0, className = "" }) {
  const position = GLOW_POSITIONS[Math.abs(seed) % GLOW_POSITIONS.length];
  const color = GLOW_COLORS[Math.abs(seed) % GLOW_COLORS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-brand-teal-900 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle ${position}, ${color}4d, transparent 55%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-teal-950/50" />
      <HouseIcon className="relative h-10 w-10 text-brand-cream/50" />
    </div>
  );
}

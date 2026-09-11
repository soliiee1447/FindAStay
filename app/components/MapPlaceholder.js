import { MapPinIcon } from "@/app/components/icons";

// Stand-in for a real map. Later, swap this component's contents for a
// library like react-map-gl (Mapbox) or @vis.gl/react-google-maps, and pass
// it the same `lat`/`lng` values to drop a real pin. For now it's pure CSS —
// a faint street grid plus a pin positioned with `pin` — so the demo never
// depends on a network map tile request.
export default function MapPlaceholder({ location, school, walkMinutes, pin = { x: 50, y: 50 } }) {
  return (
    <div className="relative mt-2 h-72 overflow-hidden rounded-2xl border border-white/10 bg-brand-teal-900">
      {/* Faint street grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5EFE4 1px, transparent 1px), linear-gradient(to bottom, #F5EFE4 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 46%, #F5EFE4 46%, #F5EFE4 50%, transparent 50%), linear-gradient(30deg, transparent 60%, #F5EFE4 60%, #F5EFE4 63%, transparent 63%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-orange/10" />

      {/* School marker */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: "50%", top: "50%" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-brand-mint ring-4 ring-brand-mint/20" />
        <span className="mt-1 whitespace-nowrap rounded bg-brand-teal-950/80 px-1.5 py-0.5 text-[10px] font-medium text-brand-sage shadow-sm">
          {school}
        </span>
      </div>

      {/* Listing pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      >
        <MapPinIcon className="h-8 w-8 text-brand-orange drop-shadow" />
      </div>

      {/* Walk-time badge */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-cream px-3 py-1.5 text-xs font-semibold text-brand-teal-950 shadow-md">
        🚶 {walkMinutes} min walk to {school}
      </div>

      <div className="absolute bottom-3 left-3 rounded-lg bg-brand-teal-950/80 px-2.5 py-1.5 text-xs text-brand-sage shadow-sm">
        {location}
      </div>
    </div>
  );
}

// Stand-in for a real map. Later, swap this component's contents for a
// library like react-map-gl (Mapbox) or @vis.gl/react-google-maps, and pass
// it the same `lat`/`lng` values to drop a real pin.
export default function MapPlaceholder({ lat, lng, location }) {
  const hasCoordinates = typeof lat === "number" && typeof lng === "number";

  return (
    <div className="mt-2 flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 text-center">
      <span className="text-3xl" aria-hidden="true">
        📍
      </span>
      <p className="mt-2 font-medium text-zinc-900">{location}</p>
      <p className="text-sm text-zinc-500">
        {hasCoordinates
          ? `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          : "No coordinates saved for this listing yet"}
      </p>
      <p className="mt-1 text-xs text-zinc-400">Map coming soon</p>
    </div>
  );
}

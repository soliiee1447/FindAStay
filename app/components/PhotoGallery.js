"use client";

import { useState } from "react";
import PhotoPlaceholder from "@/app/components/PhotoPlaceholder";

export default function PhotoGallery({ title, baseSeed, count = 4 }) {
  const [active, setActive] = useState(0);
  const seeds = Array.from({ length: count }, (_, i) => baseSeed * count + i);

  return (
    <div>
      <div className="aspect-video w-full border border-brand-line">
        <PhotoPlaceholder seed={seeds[active]} className="h-full w-full" />
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {seeds.map((seed, index) => (
          <button
            key={seed}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show photo ${index + 1} of ${title}`}
            aria-pressed={active === index}
            className={`aspect-video border transition-colors ${
              active === index
                ? "border-brand-ink"
                : "border-brand-line opacity-60 hover:opacity-100"
            }`}
          >
            <PhotoPlaceholder seed={seed} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

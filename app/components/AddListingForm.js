"use client";

import { useState } from "react";
import { allAmenities } from "@/lib/mockListings";

const EMPTY_FORM = {
  title: "",
  location: "",
  school: "",
  price: "",
  bedrooms: "1",
  bathrooms: "1",
  sqm: "",
  amenities: [],
};

// Cosmetic-only "add a listing" form for the demo — no backend, just calls
// onSubmit with a plausible listing object so the dashboard can show it
// appearing in "My Listings" right away.
export default function AddListingForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleAmenity(amenity) {
    update({
      amenities: form.amenities.includes(amenity)
        ? form.amenities.filter((a) => a !== amenity)
        : [...form.amenities, amenity],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      id: `new-${Date.now()}`,
      title: form.title || "Untitled listing",
      location: form.location || "Davao City",
      school: form.school || "Nearby campus",
      shortSchool: form.school || "campus",
      walkMinutes: 10,
      price: Number(form.price) || 0,
      bedrooms: Number(form.bedrooms) || 1,
      bathrooms: Number(form.bathrooms) || 1,
      sqm: Number(form.sqm) || 15,
      description: "New listing — details coming soon.",
      amenities: form.amenities,
      verified: false,
      gradient: Math.floor(Math.random() * 7),
      pin: { x: 50, y: 50 },
      landlord: null,
    });
    setForm(EMPTY_FORM);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
    >
      <h3 className="text-sm font-semibold text-brand-cream">New listing</h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" htmlFor="title">
          <input
            id="title"
            required
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Studio near Ateneo Gate 2"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Nearest campus" htmlFor="school">
          <input
            id="school"
            value={form.school}
            onChange={(e) => update({ school: e.target.value })}
            placeholder="e.g. Ateneo"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Location" htmlFor="location">
          <input
            id="location"
            value={form.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. Jacinto St, Davao City"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Price / month (₱)" htmlFor="price">
          <input
            id="price"
            type="number"
            min="0"
            required
            value={form.price}
            onChange={(e) => update({ price: e.target.value })}
            placeholder="5000"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Bedrooms" htmlFor="bedrooms">
          <input
            id="bedrooms"
            type="number"
            min="1"
            value={form.bedrooms}
            onChange={(e) => update({ bedrooms: e.target.value })}
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Size (sqm)" htmlFor="sqm">
          <input
            id="sqm"
            type="number"
            min="1"
            value={form.sqm}
            onChange={(e) => update({ sqm: e.target.value })}
            placeholder="18"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-brand-cream">Amenities</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {allAmenities.map((amenity) => {
            const active = form.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand-orange bg-brand-orange/15 text-brand-orange"
                    : "border-white/15 bg-white/5 text-brand-sage hover:border-white/30 hover:text-brand-cream"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-brand-cream px-5 py-2.5 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-105"
        >
          Publish listing
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-brand-sage hover:text-brand-cream"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const INPUT_CLASS =
  "mt-1.5 w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange";

function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="text-sm font-medium text-brand-cream">
        {label}
      </label>
      {children}
    </div>
  );
}

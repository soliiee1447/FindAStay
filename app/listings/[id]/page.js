import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById, formatPrice } from "@/lib/mockListings";
import PhotoGallery from "@/app/components/PhotoGallery";
import VerifiedBadge from "@/app/components/VerifiedBadge";
import AmenityBadge from "@/app/components/AmenityBadge";
import LandlordCard from "@/app/components/LandlordCard";
import MapPlaceholder from "@/app/components/MapPlaceholder";
import { BedIcon, BathIcon, RulerIcon, ChevronLeftIcon } from "@/app/components/icons";

// `[id]` in the folder name makes this a dynamic route: visiting
// "/listings/1" renders this page with params.id === "1".
export default async function ListingDetailPage({ params }) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-brand-sage hover:text-brand-cream"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to listings
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-brand-cream sm:text-3xl">
              {listing.title}
            </h1>
            {listing.verified && <VerifiedBadge />}
          </div>
          <p className="mt-1 text-brand-sage">
            {listing.location} · {listing.walkMinutes} min walk to {listing.school}
          </p>
        </div>
        <p className="text-2xl font-bold text-brand-cream">
          {formatPrice(listing.price)}
          <span className="text-base font-normal text-brand-sage"> / month</span>
        </p>
      </div>

      <div className="mt-6">
        <PhotoGallery title={listing.title} baseSeed={listing.gradient} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-brand-sage">
              <BedIcon className="h-4 w-4 text-brand-mint" />
              {listing.bedrooms} bedroom{listing.bedrooms > 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 text-brand-sage">
              <BathIcon className="h-4 w-4 text-brand-mint" />
              {listing.bathrooms} bathroom{listing.bathrooms > 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 text-brand-sage">
              <RulerIcon className="h-4 w-4 text-brand-mint" />
              {listing.sqm} sqm
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-bold tracking-tight text-brand-cream">
              About this place
            </h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-brand-sage">
              {listing.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold tracking-tight text-brand-cream">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((amenity) => (
                <AmenityBadge key={amenity} name={amenity} size="md" />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold tracking-tight text-brand-cream">Location</h2>
            <MapPlaceholder
              location={listing.location}
              school={listing.school}
              walkMinutes={listing.walkMinutes}
              pin={listing.pin}
            />
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <LandlordCard landlord={listing.landlord} />
          </div>
        </div>
      </div>
    </main>
  );
}

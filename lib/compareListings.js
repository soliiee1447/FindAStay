// Head-to-head analysis for exactly two listings — computes a winner (or
// tie) per category plus a non-judgmental "best for" tag per listing, so
// the compare page can show a verdict instead of a flat side-by-side table.

const BEST_FOR_LABELS = {
  verification: "Best for peace of mind",
  price: "Best for your budget",
  distance: "Best for convenience",
  amenities: "Best for comfort",
  fallback: "Best for a well-rounded stay",
};

export function compareTwoListings(a, b) {
  const priceDiff = Math.abs(a.price - b.price);
  const cheaperId = a.price === b.price ? null : a.price < b.price ? a.id : b.id;

  const distanceDiff = Math.abs(a.walkMinutes - b.walkMinutes);
  const closerId =
    a.walkMinutes === b.walkMinutes ? null : a.walkMinutes < b.walkMinutes ? a.id : b.id;

  const aOnlyAmenities = a.amenities.filter((x) => !b.amenities.includes(x));
  const bOnlyAmenities = b.amenities.filter((x) => !a.amenities.includes(x));
  const amenitiesWinnerId =
    a.amenities.length === b.amenities.length
      ? null
      : a.amenities.length > b.amenities.length
        ? a.id
        : b.id;

  const verificationWinnerId = a.verified === b.verified ? null : a.verified ? a.id : b.id;

  const winners = { cheaperId, closerId, amenitiesWinnerId, verificationWinnerId };

  return {
    price: { diff: priceDiff, winnerId: cheaperId },
    distance: { diff: distanceDiff, winnerId: closerId },
    amenities: {
      aOnly: aOnlyAmenities,
      bOnly: bOnlyAmenities,
      winnerId: amenitiesWinnerId,
    },
    verification: { winnerId: verificationWinnerId },
    bestFor: {
      [a.id]: bestForTag(a.id, winners),
      [b.id]: bestForTag(b.id, winners),
    },
  };
}

// Priority order when a listing wins more than one category — leads with
// whichever a Davao student would care about most for a first apartment.
function bestForTag(listingId, { verificationWinnerId, cheaperId, closerId, amenitiesWinnerId }) {
  if (verificationWinnerId === listingId) return BEST_FOR_LABELS.verification;
  if (cheaperId === listingId) return BEST_FOR_LABELS.price;
  if (closerId === listingId) return BEST_FOR_LABELS.distance;
  if (amenitiesWinnerId === listingId) return BEST_FOR_LABELS.amenities;
  return BEST_FOR_LABELS.fallback;
}

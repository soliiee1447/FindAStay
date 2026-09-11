// Hardcoded sample data for demo purposes — no Supabase calls involved.
// Shape mirrors the real `listings` table (see supabase/schema.sql) plus a
// few extra display-only fields (school, walkMinutes, landlord, gradient)
// that a future migration would add as real columns.

export const mockListings = [
  {
    id: "1",
    title: "Studio near Ateneo Gate 1",
    location: "Jacinto St, Davao City",
    school: "Ateneo de Davao University",
    shortSchool: "Ateneo",
    walkMinutes: 5,
    price: 6500,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 18,
    description:
      "Five minutes from Gate 1 on foot — no jeepney fare, no tricycle haggling. Freshly renovated with a real bed frame and a desk that fits a monitor setup. Solo living, zero drama.",
    amenities: ["WiFi", "Aircon", "Furnished"],
    verified: true,
    gradient: 0,
    pin: { x: 55, y: 32 },
    landlord: {
      name: "Karen Villanueva",
      verified: true,
      memberSince: 2021,
      rating: 4.9,
      reviews: 38,
      responseTime: "Replies in under an hour",
    },
  },
  {
    id: "2",
    title: "Shared Room walk to Ateneo",
    location: "Roxas Ave, Davao City",
    school: "Ateneo de Davao University",
    shortSchool: "Ateneo",
    walkMinutes: 7,
    price: 3800,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 12,
    description:
      "The cheapest bed you'll find this close to campus. Splits a room with one other tenant, shares the kitchen downstairs. No frills, just a mattress, a fan, and a short walk to class.",
    amenities: ["WiFi", "Electric Fan", "Shared Kitchen"],
    verified: false,
    gradient: 1,
    pin: { x: 62, y: 40 },
    landlord: {
      name: "Nestor Abellana",
      verified: false,
      memberSince: 2023,
      rating: 4.2,
      reviews: 11,
      responseTime: "Replies within a day",
    },
  },
  {
    id: "3",
    title: "Chill Studio near UM Matina",
    location: "Matina, Davao City",
    school: "University of Mindanao (Matina Campus)",
    shortSchool: "UM Matina",
    walkMinutes: 6,
    price: 5200,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 20,
    description:
      "A genuinely quiet street a few blocks from UM Matina's main gate. Aircon that actually keeps up with Davao heat, plus a laundry area so you're not hauling clothes across town.",
    amenities: ["WiFi", "Aircon", "Furnished", "Laundry"],
    verified: true,
    gradient: 2,
    pin: { x: 40, y: 55 },
    landlord: {
      name: "Marife Sabandal",
      verified: true,
      memberSince: 2020,
      rating: 4.8,
      reviews: 54,
      responseTime: "Replies in under an hour",
    },
  },
  {
    id: "4",
    title: "Budget Room walk to USeP Obrero",
    location: "Bo. Obrero, Davao City",
    school: "University of Southeastern Philippines",
    shortSchool: "USeP",
    walkMinutes: 4,
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 14,
    description:
      "Four minutes to the USeP gate — you can leave for your 8am class at 7:55. Basic setup: bed, fan, shared bathroom down the hall. Built for tight budgets, not for flexing.",
    amenities: ["WiFi", "Electric Fan"],
    verified: false,
    gradient: 3,
    pin: { x: 70, y: 60 },
    landlord: {
      name: "Ronnie Escobido",
      verified: false,
      memberSince: 2022,
      rating: 4.1,
      reviews: 8,
      responseTime: "Replies within a day",
    },
  },
  {
    id: "5",
    title: "Fully Furnished Pad near USeP",
    location: "Bo. Obrero, Davao City",
    school: "University of Southeastern Philippines",
    shortSchool: "USeP",
    walkMinutes: 8,
    price: 7200,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 24,
    description:
      "The upgrade option near USeP. Move-in ready — cookware, aircon, the works — with CCTV covering the halls and a guard on duty at night. Built for parents who worry.",
    amenities: ["WiFi", "Aircon", "Furnished", "24/7 Security", "CCTV"],
    verified: true,
    gradient: 4,
    pin: { x: 48, y: 45 },
    landlord: {
      name: "Joel Antazo",
      verified: true,
      memberSince: 2019,
      rating: 4.9,
      reviews: 71,
      responseTime: "Replies in under an hour",
    },
  },
  {
    id: "6",
    title: "Cozy Room near San Pedro College",
    location: "San Pedro St, Davao City",
    school: "San Pedro College",
    shortSchool: "San Pedro",
    walkMinutes: 5,
    price: 4600,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 16,
    description:
      "Tucked behind San Pedro College, close enough to sleep in and still make it on time. Furnished, aircon-ready, and quiet enough to actually study in.",
    amenities: ["WiFi", "Aircon", "Furnished"],
    verified: true,
    gradient: 5,
    pin: { x: 58, y: 50 },
    landlord: {
      name: "Teresa Bacus",
      verified: true,
      memberSince: 2021,
      rating: 4.7,
      reviews: 29,
      responseTime: "Replies in a few hours",
    },
  },
  {
    id: "7",
    title: "Shared Apartment near Holy Cross",
    location: "Sta. Ana Ave, Davao City",
    school: "Holy Cross of Davao College",
    shortSchool: "Holy Cross",
    walkMinutes: 9,
    price: 3500,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 15,
    description:
      "Split with one roommate, a nine-minute walk from Holy Cross. Shared kitchen, shared vibes — good if you'd rather split rent than live alone.",
    amenities: ["WiFi", "Electric Fan", "Shared Kitchen"],
    verified: false,
    gradient: 6,
    pin: { x: 35, y: 35 },
    landlord: {
      name: "Dexter Ompad",
      verified: false,
      memberSince: 2023,
      rating: 4.3,
      reviews: 6,
      responseTime: "Replies within a day",
    },
  },
];

export const allAmenities = Array.from(
  new Set(mockListings.flatMap((listing) => listing.amenities))
).sort();

export function formatPrice(price) {
  return `₱${price.toLocaleString("en-PH")}`;
}

export function getListingById(id) {
  return mockListings.find((listing) => listing.id === id) ?? null;
}

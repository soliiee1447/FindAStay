// Mock data for the landlord dashboard demo. `currentLandlord` matches the
// landlord already attached to listing "5" in mockListings.js (Joel Antazo)
// so the dashboard and the public listing pages feel like one dataset.

export const currentLandlord = {
  name: "Joel Antazo",
  email: "joel.antazo@findastay.test",
  memberSince: 2019,
  verificationStatus: "verified", // "verified" | "pending"
  activeBookings: 3,
};

// Which mock listings belong to this landlord, and their dashboard-only
// status (separate from the public `verified` flag on the listing itself).
export const myListingStatus = {
  5: "Active",
  1: "Active",
  4: "Pending Verification",
};

export const myListingIds = Object.keys(myListingStatus);

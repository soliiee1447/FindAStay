"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { getListingById } from "@/lib/mockListings";
import { currentLandlord, myListingIds, myListingStatus } from "@/lib/landlordData";
import LandlordListingCard from "@/app/components/LandlordListingCard";
import AddListingForm from "@/app/components/AddListingForm";
import StatusTag from "@/app/components/StatusTag";
import { PlusIcon } from "@/app/components/icons";

const INITIAL_LISTINGS = myListingIds.map((id) => ({
  listing: getListingById(id),
  status: myListingStatus[id],
}));

export default function LandlordDashboardPage() {
  const { loggedIn, role, hydrated } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState(INITIAL_LISTINGS);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!loggedIn) {
      router.replace("/login");
    } else if (role !== "landlord") {
      router.replace("/");
    }
  }, [hydrated, loggedIn, role, router]);

  if (!hydrated || !loggedIn || role !== "landlord") {
    return <main className="mx-auto w-full max-w-6xl px-4 py-16 text-center text-brand-sage">Loading…</main>;
  }

  function handleNewListing(listing) {
    setEntries((prev) => [{ listing, status: "Pending Verification" }, ...prev]);
    setShowForm(false);
  }

  const activeCount = entries.filter((e) => e.status === "Active").length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-brand-cream sm:text-3xl">
        Welcome back, {currentLandlord.name.split(" ")[0]}
      </h1>
      <p className="mt-1 text-brand-sage">
        Here&apos;s how your listings on FindAStay are doing.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total listings" value={entries.length} />
        <StatCard label="Active bookings" value={currentLandlord.activeBookings} />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-sm text-brand-sage">Profile verification</p>
          <div className="mt-2">
            <StatusTag status={currentLandlord.verificationStatus} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-brand-cream">My Listings</h2>
          <p className="mt-1 text-sm text-brand-sage">
            {activeCount} active · {entries.length - activeCount} pending verification
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-full bg-brand-cream px-4 py-2.5 text-sm font-semibold text-brand-orange transition-transform hover:scale-105"
        >
          <PlusIcon className="h-4 w-4" />
          {showForm ? "Close form" : "Add New Listing"}
        </button>
      </div>

      {showForm && (
        <AddListingForm onSubmit={handleNewListing} onCancel={() => setShowForm(false)} />
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ listing, status }) => (
          <LandlordListingCard key={listing.id} listing={listing} status={status} />
        ))}
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <p className="text-sm text-brand-sage">{label}</p>
      <p className="mt-1 text-3xl font-bold text-brand-cream">{value}</p>
    </div>
  );
}

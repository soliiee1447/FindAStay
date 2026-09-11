// Small pill for dashboard-only status ("Active" / "Pending Verification"),
// distinct from the public VerifiedBadge — mint reads as "live and good",
// orange reads as "needs attention", matching the rest of the brand system.
export default function StatusTag({ status }) {
  const isActive = status === "Active" || status === "verified";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? "bg-brand-mint/15 text-brand-mint ring-1 ring-brand-mint/30"
          : "bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/30"
      }`}
    >
      {status === "verified" ? "Verified" : status === "pending" ? "Pending" : status}
    </span>
  );
}

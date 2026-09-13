// Small sharp-cornered tag for dashboard-only status ("Active" / "Pending
// Verification") — green reads as "live and good", orange as "needs
// attention", matching the rest of the brand's accent usage.
export default function StatusTag({ status }) {
  const isActive = status === "Active" || status === "verified";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
        isActive
          ? "bg-brand-green-tint text-brand-green"
          : "bg-brand-orange-tint text-brand-orange"
      }`}
    >
      {status === "verified" ? "Verified" : status === "pending" ? "Pending" : status}
    </span>
  );
}

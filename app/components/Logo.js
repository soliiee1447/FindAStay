// FindAStay mark: a house inside a magnifying glass. Drawn as a flat icon
// with no container/badge — the old circular badge doesn't fit a brand
// system where nothing has rounded corners.
export default function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M6 10.5 12 5l6 5.5"
        stroke="#17171A"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.5V16a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9.5"
        stroke="#17171A"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="14" r="4" fill="#FAFAF8" stroke="#E8763C" strokeWidth={1.6} />
      <path d="M17.4 16.9 20 19.5" stroke="#E8763C" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

// FindAStay mark: a house inside a magnifying glass, on a circular cream
// badge — matches the brand's circular badge treatment (e.g. the "Sign Up"
// button style) rather than a generic square app icon.
export default function LogoMark({ className = "h-9 w-9" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-cream ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" aria-hidden="true">
        <path
          d="M6 10.5 12 5l6 5.5"
          stroke="#0F2E2B"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 9.5V16a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9.5"
          stroke="#0F2E2B"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="14" r="4" fill="#F5EFE4" stroke="#E8763C" strokeWidth={1.8} />
        <path d="M17.4 16.9 20 19.5" stroke="#E8763C" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    </div>
  );
}

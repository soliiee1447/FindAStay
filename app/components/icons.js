// Minimal inline stroke icons — no icon package, no network font/CDN.
// Every icon accepts a `className` so callers control size/color.

function base(props) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
  };
}

export function CheckBadgeIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M9 12.5l2 2 4.5-4.5" />
      <path d="M12 3l2.2 1.3 2.5-.3 1.1 2.3 2.3 1.1-.3 2.5L21 12l-1.3 2.2.3 2.5-2.3 1.1-1.1 2.3-2.5-.3L12 21l-2.2-1.3-2.5.3-1.1-2.3-2.3-1.1.3-2.5L3 12l1.3-2.2-.3-2.5 2.3-1.1 1.1-2.3 2.5.3z" />
    </svg>
  );
}

export function WifiIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M2 8.5a15.5 15.5 0 0 1 20 0" />
      <path d="M5.5 12.3a10.7 10.7 0 0 1 13 0" />
      <path d="M9 16a5.8 5.8 0 0 1 6 0" />
      <circle cx="12" cy="19.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SnowflakeIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 2.5v19M4 7l16 10M20 7 4 17" />
      <path d="M12 2.5l-2 2m2-2 2 2M12 21.5l-2-2m2 2 2-2M4 7l2.7.3M4 7l1-2.5M20 7l-2.7.3M20 7l-1-2.5M4 17l2.7-.3M4 17l1 2.5M20 17l-2.7-.3M20 17l-1 2.5" />
    </svg>
  );
}

export function CarIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M4 16V11.5L6 7h12l2 4.5V16" />
      <path d="M2.5 16h19" />
      <circle cx="7" cy="16.5" r="1.6" />
      <circle cx="17" cy="16.5" r="1.6" />
    </svg>
  );
}

export function SofaIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M5 11V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5V11" />
      <path d="M3.5 11h17a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1z" />
      <path d="M4.5 16.5V19M19.5 16.5V19" />
    </svg>
  );
}

export function WashingMachineIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M4 7.5h16" />
      <circle cx="7" cy="5.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="4.2" />
      <path d="M10.5 14a1.5 2 0 0 0 3 0" />
    </svg>
  );
}

export function ShieldIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 3l7 3v5.2c0 4.6-3 8.4-7 9.8-4-1.4-7-5.2-7-9.8V6z" />
    </svg>
  );
}

export function CameraIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1-1.5h9L17.5 7h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="13" r="3.3" />
    </svg>
  );
}

export function UtensilsIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M7 2.5v7a2 2 0 0 0 2 2v10M7 2.5v7M9 2.5v7M16 2.5c-1.4 0-2.5 1.8-2.5 4.5s1.1 4.5 2.5 4.5v10" />
    </svg>
  );
}

export function FanIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.5c0-3 1.5-6 4-6.5 2 0 2.5 2 1 4-1 1.4-2.8 2.2-5 2.5zM13.5 12c3 0 6 1.5 6.5 4 0 2-2 2.5-4 1-1.4-1-2.2-2.8-2.5-5zM12 13.5c0 3-1.5 6-4 6.5-2 0-2.5-2-1-4 1-1.4 2.8-2.2 5-2.5zM10.5 12c-3 0-6-1.5-6.5-4 0-2 2-2.5 4-1 1.4 1 2.2 2.8 2.5 5z" />
    </svg>
  );
}

export function DotIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MapPinIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function StarIcon({ className, filled }) {
  return (
    <svg
      {...base({
        className,
        fill: filled ? "currentColor" : "none",
      })}
    >
      <path d="M12 3.5l2.5 5.3 5.7.7-4.2 4 1.1 5.7L12 16.5l-5.1 2.7 1.1-5.7-4.2-4 5.7-.7z" />
    </svg>
  );
}

export function ClockIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function UserIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.3-3.7 4.2-5.5 7.5-5.5s6.2 1.8 7.5 5.5" />
    </svg>
  );
}

export function XIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function BedIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
      <path d="M3 15h18M3 18v2M21 18v2" />
      <path d="M6 11V8.5A1.5 1.5 0 0 1 7.5 7h3A1.5 1.5 0 0 1 12 8.5V11" />
    </svg>
  );
}

export function BathIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M4 12V6a2 2 0 0 1 3.5-1.3" />
      <path d="M3 12h18v1.5A5.5 5.5 0 0 1 15.5 19h-7A5.5 5.5 0 0 1 3 13.5z" />
      <path d="M6 19l-1 2.5M18 19l1 2.5" />
    </svg>
  );
}

export function RulerIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v3M15 8v3" />
    </svg>
  );
}

export function ArrowUpIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function EqualsIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M5 9.5h14M5 14.5h14" />
    </svg>
  );
}

export function PlusIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function HouseIcon({ className }) {
  return (
    <svg {...base({ className })}>
      <path d="M4 11l8-7 8 7" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20" />
    </svg>
  );
}

export const AMENITY_ICONS = {
  WiFi: WifiIcon,
  Aircon: SnowflakeIcon,
  Parking: CarIcon,
  Furnished: SofaIcon,
  Laundry: WashingMachineIcon,
  "24/7 Security": ShieldIcon,
  CCTV: CameraIcon,
  "Shared Kitchen": UtensilsIcon,
  "Electric Fan": FanIcon,
  Elevator: HouseIcon,
};

export function renderAmenityIcon(name, className) {
  const Icon = AMENITY_ICONS[name] ?? DotIcon;
  return <Icon className={className} />;
}

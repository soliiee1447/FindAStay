"use client";

import Link from "next/link";
import LogoMark from "@/app/components/Logo";
import { useAuth } from "@/app/AuthContext";

export default function Header() {
  const { loggedIn, role, name, logout, hydrated } = useAuth();

  // No navigation here on purpose: on a public page, logging out just
  // updates the header in place. On a protected page (e.g. /landlord),
  // that page's own auth guard effect is the single place that redirects
  // once `loggedIn` flips to false — otherwise two navigations (this one
  // and the guard's) race and land somewhere unpredictable.
  function handleLogout() {
    logout();
  }

  const initials = (name ?? "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-teal-950/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-lg font-bold tracking-tight text-brand-cream">
            FindAStay
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-sage sm:flex">
          <Link href="/" className="transition-colors hover:text-brand-cream">
            Browse
          </Link>
          <Link href="/compare" className="transition-colors hover:text-brand-cream">
            Compare
          </Link>
          {loggedIn && role === "landlord" && (
            <Link href="/landlord" className="transition-colors hover:text-brand-cream">
              Dashboard
            </Link>
          )}
        </nav>

        {!hydrated ? (
          <div className="h-9 w-20" />
        ) : loggedIn ? (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-xs font-bold text-brand-teal-950">
                {initials || "?"}
              </span>
              <span className="text-sm text-brand-sage">{name}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-brand-sage transition-colors hover:border-white/30 hover:text-brand-cream"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-105"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}

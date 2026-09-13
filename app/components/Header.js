"use client";

import Link from "next/link";
import LogoMark from "@/app/components/Logo";
import { useAuth } from "@/app/AuthContext";
import { SearchIcon, UserIcon } from "@/app/components/icons";

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
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-bg">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center px-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-serif text-lg font-semibold tracking-tight text-brand-ink">
            FindAStay
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium uppercase tracking-wide text-brand-ink-soft sm:flex">
          <Link href="/" className="transition-colors hover:text-brand-ink">
            Browse
          </Link>
          <Link href="/compare" className="transition-colors hover:text-brand-ink">
            Compare
          </Link>
          {loggedIn && role === "landlord" && (
            <Link href="/landlord" className="transition-colors hover:text-brand-ink">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/#listings"
            aria-label="Search listings"
            className="text-brand-ink-soft transition-colors hover:text-brand-ink"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>

          {!hydrated ? (
            <div className="h-5 w-5" />
          ) : loggedIn ? (
            <div className="flex items-center gap-2.5">
              <span
                title={name}
                className="hidden h-7 w-7 items-center justify-center bg-brand-ink text-[11px] font-semibold text-white sm:flex"
              >
                {initials || "?"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-brand-ink-soft underline-offset-4 transition-colors hover:text-brand-ink hover:underline"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Log in"
              className="text-brand-ink-soft transition-colors hover:text-brand-ink"
            >
              <UserIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

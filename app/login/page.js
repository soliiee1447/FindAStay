"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoMark from "@/app/components/Logo";
import { useAuth } from "@/app/AuthContext";
import { currentLandlord } from "@/lib/landlordData";

function deriveStudentName(email) {
  const local = email.split("@")[0] ?? "";
  const words = local
    .split(/[._\-+0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1));
  return words.join(" ") || "Student";
}

export default function LoginPage() {
  const { loggedIn, role, hydrated, login } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already logged in (e.g. refreshed on this page) — bounce straight to
  // the right place instead of showing the form again.
  useEffect(() => {
    if (hydrated && loggedIn) {
      router.replace(role === "landlord" ? "/landlord" : "/");
    }
  }, [hydrated, loggedIn, role, router]);

  function handleSubmit(e) {
    e.preventDefault();
    const name = selectedRole === "landlord" ? currentLandlord.name : deriveStudentName(email);
    login({ role: selectedRole, email, name });
    router.push(selectedRole === "landlord" ? "/landlord" : "/");
  }

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-10 w-10" />
          <h1 className="mt-4 font-serif text-3xl text-brand-ink">
            Log in to FindAStay
          </h1>
          <p className="mt-1 text-sm text-brand-ink-soft">
            Demo login — no real account needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 border border-brand-line bg-white p-6">
          <div className="grid grid-cols-2 border border-brand-line">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              aria-pressed={selectedRole === "student"}
              className={`px-3 py-2.5 text-sm font-semibold transition-colors ${
                selectedRole === "student"
                  ? "bg-brand-ink text-white"
                  : "bg-white text-brand-ink-soft hover:text-brand-ink"
              }`}
            >
              I&apos;m a Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("landlord")}
              aria-pressed={selectedRole === "landlord"}
              className={`border-l border-brand-line px-3 py-2.5 text-sm font-semibold transition-colors ${
                selectedRole === "landlord"
                  ? "bg-brand-ink text-white"
                  : "bg-white text-brand-ink-soft hover:text-brand-ink"
              }`}
            >
              I&apos;m a Landlord
            </button>
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-brand-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted outline-none focus:border-brand-ink"
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-brand-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted outline-none focus:border-brand-ink"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-brand-orange px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-orange-dark"
          >
            Log In
          </button>

          <p className="mt-4 text-center text-xs text-brand-muted">
            Just exploring?{" "}
            <Link href="/" className="text-brand-green hover:underline">
              Browse without logging in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

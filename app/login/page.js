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
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-cream">
            Log in to FindAStay
          </h1>
          <p className="mt-1 text-sm text-brand-sage">
            Demo login — no real account needed.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              aria-pressed={selectedRole === "student"}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                selectedRole === "student"
                  ? "bg-brand-cream text-brand-teal-950"
                  : "text-brand-sage hover:text-brand-cream"
              }`}
            >
              I&apos;m a Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("landlord")}
              aria-pressed={selectedRole === "landlord"}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                selectedRole === "landlord"
                  ? "bg-brand-cream text-brand-teal-950"
                  : "text-brand-sage hover:text-brand-cream"
              }`}
            >
              I&apos;m a Landlord
            </button>
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-brand-cream">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-brand-cream">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-sage-dim outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-cream px-4 py-2.5 text-sm font-semibold text-brand-teal-950 transition-transform hover:scale-[1.02]"
          >
            Log In
          </button>

          <p className="mt-4 text-center text-xs text-brand-sage-dim">
            Just exploring?{" "}
            <Link href="/" className="text-brand-mint hover:underline">
              Browse without logging in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

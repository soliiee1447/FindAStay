"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "findastay_auth";
const EMPTY_AUTH = { loggedIn: false, role: null, name: null, email: null };

const AuthContext = createContext(null);

// Mock, client-side-only auth for the demo — no Supabase, no real session.
// State is kept in React context and mirrored to localStorage purely so a
// page refresh mid-pitch doesn't kick you back to the login screen.
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(EMPTY_AUTH);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // One-time read of localStorage on mount: must happen post-hydration
      // (window is undefined during SSR) so the server-rendered logged-out
      // markup matches the client's first paint, then updates.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setAuth(JSON.parse(stored));
    } catch {
      // ignore — falls back to logged-out state
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } catch {
      // ignore — demo still works for the current tab
    }
  }, [auth, hydrated]);

  function login({ role, email, name }) {
    setAuth({ loggedIn: true, role, email, name });
  }

  function logout() {
    setAuth(EMPTY_AUTH);
  }

  return (
    <AuthContext.Provider value={{ ...auth, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

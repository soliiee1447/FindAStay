import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/AuthContext";
import Header from "@/app/components/Header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// This metadata shows up as the browser tab title / description, and is
// used by search engines and link previews.
export const metadata = {
  title: "FindAStay — Student Housing",
  description: "A student housing marketplace.",
};

// Every page in the app is rendered inside this layout, so it's the place
// for things that should appear on every page (fonts, global styles, header).
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-brand-cream">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This metadata shows up as the browser tab title / description, and is
// used by search engines and link previews.
export const metadata = {
  title: "FindAStay — Student Housing",
  description: "A student housing marketplace.",
};

// Every page in the app is rendered inside this layout, so it's the place
// for things that should appear on every page (fonts, global styles, etc).
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}

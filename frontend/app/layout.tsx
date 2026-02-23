import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Folio — Portfolio Platform for Creatives",
  description:
    "Build a stunning portfolio website in minutes. Made for photographers, interior designers, architects, and all visual creatives.",
  keywords: ["portfolio", "photographer portfolio", "interior design portfolio", "creative portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

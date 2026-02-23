"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-light tracking-tight">
          folio<span className="text-[hsl(var(--accent))]">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-base transition-colors",
                pathname === link.href ? "font-medium" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/contact">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/pricing">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

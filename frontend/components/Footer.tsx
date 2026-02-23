import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-2xl font-light tracking-tight">
              folio<span className="text-[hsl(var(--accent))]">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Beautiful portfolio websites for every creative.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-medium mb-3">Platform</h4>
            <ul className="space-y-2">
              {["Photography", "Interior Design", "Architecture", "Graphic Design"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium mb-3">Follow</h4>
            <ul className="space-y-2">
              {["Instagram", "Twitter / X", "LinkedIn", "Behance"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Folio Platform. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for creatives, by creatives.
          </p>
        </div>
      </div>
    </footer>
  );
}

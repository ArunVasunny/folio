import Link from "next/link";
import { ArrowRight, Camera, Home, Building2, Palette, Film, Pencil, Scissors, Globe } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/PortfolioCard";
import { portfolioApi } from "@/lib/api";

// Category tiles configuration
const CATEGORIES = [
  {
    slug: "photography",
    label: "Photography",
    description: "Capture the world, one frame at a time",
    icon: Camera,
    color: "from-stone-900 to-stone-700",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  },
  {
    slug: "interior-design",
    label: "Interior Design",
    description: "Spaces that tell your story",
    icon: Home,
    color: "from-amber-900 to-amber-700",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
  },
  {
    slug: "architecture",
    label: "Architecture",
    description: "Buildings that stand the test of time",
    icon: Building2,
    color: "from-zinc-900 to-zinc-700",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=600",
  },
  {
    slug: "graphic-design",
    label: "Graphic Design",
    description: "Visual communication, elevated",
    icon: Palette,
    color: "from-rose-900 to-rose-700",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  },
  {
    slug: "videography",
    label: "Videography",
    description: "Motion and emotion in every cut",
    icon: Film,
    color: "from-slate-900 to-slate-700",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600",
  },
  {
    slug: "illustration",
    label: "Illustration",
    description: "Art that breathes and speaks",
    icon: Pencil,
    color: "from-teal-900 to-teal-700",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
  },
  {
    slug: "fashion",
    label: "Fashion",
    description: "Where style meets identity",
    icon: Scissors,
    color: "from-pink-900 to-pink-700",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    slug: "web-design",
    label: "Web Design",
    description: "Pixels with purpose",
    icon: Globe,
    color: "from-indigo-900 to-indigo-700",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600",
  },
];

// Fetch featured portfolios server-side
async function getFeaturedPortfolios() {
  try {
    const res = await portfolioApi.list({ featured: true, limit: 6 });
    return res.data.portfolios;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredPortfolios = await getFeaturedPortfolios();

  return (
    <div className="pt-16">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[hsl(var(--accent))]/5 blur-3xl" />
        </div>

        <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 px-3 py-1 border border-border rounded-full">
            Portfolio Platform for Creatives
          </span>
        </div>

        <h1
          className="animate-fade-up opacity-0 font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6 text-balance"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          Your work deserves
          <br />
          <em className="italic text-[hsl(var(--accent))]">a beautiful home.</em>
        </h1>

        <p
          className="animate-fade-up opacity-0 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Choose a template, upload your work, and launch a portfolio that represents you — in minutes.
        </p>

        {/* Search bar */}
        <div
          className="animate-fade-up opacity-0 w-full max-w-2xl mx-auto mb-8"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <SearchBar />
          <p className="text-xs text-muted-foreground mt-2">
            Search by creator name to discover portfolios on Folio
          </p>
        </div>

        <div
          className="animate-fade-up opacity-0 flex flex-col sm:flex-row gap-3"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <Button size="lg" asChild>
            <Link href="/pricing">
              Start for Free
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/category/photography">Browse Portfolios</Link>
          </Button>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up opacity-0 flex flex-wrap gap-8 justify-center mt-16 text-center"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          {[
            { value: "12K+", label: "Portfolios created" },
            { value: "30+", label: "Templates" },
            { value: "98%", label: "Satisfaction rate" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-light">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────── */}
      <section className="border-t border-border bg-card py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
            Built for the way creatives work
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Folio is a portfolio platform designed specifically for visual creatives — photographers,
            interior designers, architects, and more. Pick a template crafted for your discipline,
            upload your work, and share a portfolio that looks as good as your craft.
            No coding. No complexity. Just your work, beautifully displayed.
          </p>
        </div>
      </section>

      {/* ── Category Tiles ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-light mb-3">
              What kind of creative are you?
            </h2>
            <p className="text-muted-foreground">
              We have tailored templates for every discipline.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
                >
                  {/* Background image */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 group-hover:opacity-60 transition-opacity`} />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-4 text-white">
                    <Icon size={20} className="mb-2 opacity-80" />
                    <h3 className="font-display text-xl font-light leading-tight">{cat.label}</h3>
                    <p className="text-xs text-white/70 mt-1 leading-tight hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Portfolios ───────────────────────────── */}
      {featuredPortfolios.length > 0 && (
        <section className="py-20 px-4 bg-card border-t border-border">
          <div className="container mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-light">Featured work</h2>
                <p className="text-muted-foreground mt-2">
                  Top-rated portfolios from our community
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/category/photography">
                  View all
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio._id} portfolio={portfolio} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-tight">
            Ready to show the world
            <br />
            <em className="italic text-[hsl(var(--accent))]">what you do?</em>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of creatives who trust Folio to showcase their work.
          </p>
          <Button size="lg" asChild>
            <Link href="/pricing">
              Get Started — It&apos;s Free
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

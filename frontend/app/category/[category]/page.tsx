"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { templateApi, portfolioApi, Template, Portfolio } from "@/lib/api";
import { TemplateCard } from "@/components/TemplateCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/ui/button";

const CATEGORY_META: Record<string, { label: string; description: string; hero: string }> = {
  photography: {
    label: "Photography",
    description: "Templates designed for stunning image galleries, portfolios, and visual stories.",
    hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
  },
  "interior-design": {
    label: "Interior Design",
    description: "Showcase your spaces with layouts built for atmosphere and detail.",
    hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
  },
  architecture: {
    label: "Architecture",
    description: "Present your projects with the scale and precision they deserve.",
    hero: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1200",
  },
  "graphic-design": {
    label: "Graphic Design",
    description: "Dynamic layouts for brand work, campaigns, and visual identity.",
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  },
  illustration: {
    label: "Illustration",
    description: "Let your art take center stage with clean, editorial templates.",
    hero: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200",
  },
  videography: {
    label: "Videography",
    description: "Cinematic templates with full-screen hero and reel integration.",
    hero: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200",
  },
  fashion: {
    label: "Fashion",
    description: "Editorial and bold layouts for designers, stylists, and photographers.",
    hero: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
  },
  "web-design": {
    label: "Web Design",
    description: "Showcase digital work, UI projects, and interactive designs.",
    hero: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const meta = CATEGORY_META[category] || {
    label: category,
    description: "",
    hero: "",
  };

  const [templates, setTemplates] = useState<Template[]>([]);
  const [topPortfolios, setTopPortfolios] = useState<Portfolio[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingPortfolios, setLoadingPortfolios] = useState(true);

  useEffect(() => {
    setLoadingTemplates(true);
    templateApi
      .list({ category })
      .then((res) => setTemplates(res.data.templates))
      .catch(console.error)
      .finally(() => setLoadingTemplates(false));

    setLoadingPortfolios(true);
    portfolioApi
      .topRated({ category, limit: 6 })
      .then((res) => setTopPortfolios(res.data.portfolios))
      .catch(console.error)
      .finally(() => setLoadingPortfolios(false));
  }, [category]);

  return (
    <div className="pt-16">
      {/* ── Category Hero ────────────────────────────────── */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        {meta.hero && (
          <img
            src={meta.hero}
            alt={meta.label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative container mx-auto px-4 md:px-8 py-12 text-white">
          <p className="text-sm text-white/60 mb-2 tracking-wider uppercase">
            Choose your template
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light">{meta.label}</h1>
          <p className="text-white/70 mt-3 max-w-xl text-base">{meta.description}</p>
        </div>
      </section>

      {/* ── Template Selection ───────────────────────────── */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-light">Templates for {meta.label}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {templates.length} templates available — click to select
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal size={16} />
              <span className="text-sm">Filter</span>
            </div>
          </div>

          {loadingTemplates ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[3/2]" />
              ))}
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No templates found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  selected={selectedTemplate?._id === template._id}
                  onSelect={setSelectedTemplate}
                />
              ))}
            </div>
          )}

          {/* CTA after selecting */}
          {selectedTemplate && (
            <div className="mt-8 p-6 rounded-xl border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-medium">
                  You selected:{" "}
                  <span className="text-[hsl(var(--accent))]">{selectedTemplate.name}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Ready to build your portfolio? Get started below.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href={`/pricing?template=${selectedTemplate.slug}`}>
                  Use This Template
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Top-rated Example Portfolios ─────────────────── */}
      <section className="py-16 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Top {meta.label} portfolios on Folio
            </h2>
            <p className="text-muted-foreground mt-2">
              Real portfolios from creators in our community
            </p>
          </div>

          {loadingPortfolios ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-64" />
              ))}
            </div>
          ) : topPortfolios.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No portfolios to show yet. Be the first!</p>
              <Button className="mt-4" asChild>
                <Link href="/pricing">Create a Portfolio</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio._id} portfolio={portfolio} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

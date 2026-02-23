import { notFound } from "next/navigation";
import { MapPin, Globe, Instagram, Star, Eye } from "lucide-react";
import { portfolioApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: { slug: string };
}

async function getPortfolio(slug: string) {
  try {
    const res = await portfolioApi.getBySlug(slug);
    return res.data.portfolio;
  } catch {
    return null;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  photography: "Photography",
  "interior-design": "Interior Design",
  architecture: "Architecture",
  "graphic-design": "Graphic Design",
  illustration: "Illustration",
  videography: "Videography",
  fashion: "Fashion",
  "web-design": "Web Design",
};

export default async function PortfolioPage({ params }: Props) {
  const portfolio = await getPortfolio(params.slug);
  if (!portfolio) notFound();

  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────── */}
      {portfolio.coverImage && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={portfolio.coverImage}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        </div>
      )}

      {/* ── Profile info ─────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-3">
              {CATEGORY_LABELS[portfolio.category] || portfolio.category}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">{portfolio.title}</h1>
            <p className="text-xl text-muted-foreground font-light mb-4">{portfolio.ownerName}</p>
            {portfolio.bio && (
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{portfolio.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 mt-6">
              {portfolio.location && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  {portfolio.location}
                </span>
              )}
              {portfolio.rating > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star size={14} className="fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                  {portfolio.rating.toFixed(1)} rating
                </span>
              )}
              {portfolio.views > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Eye size={14} />
                  {portfolio.views.toLocaleString()} views
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              {portfolio.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe size={14} />
                  Website
                </a>
              )}
              {portfolio.instagram && (
                <a
                  href={`https://instagram.com/${portfolio.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={14} />
                  Instagram
                </a>
              )}
            </div>
          </div>

          {/* Template used */}
          {portfolio.templateId && (
            <div className="shrink-0 p-4 rounded-xl border border-border bg-card text-sm">
              <p className="text-muted-foreground text-xs mb-1">Template used</p>
              <p className="font-medium">{(portfolio.templateId as any).name}</p>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {(portfolio.templateId as any).style} layout
              </p>
            </div>
          )}
        </div>

        {/* ── Image gallery ───────────────────────────────── */}
        {portfolio.images && portfolio.images.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl font-light mb-6">Gallery</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {portfolio.images.map((img, i) => (
                <div key={i} className="break-inside-avoid rounded-lg overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.caption || `Image ${i + 1}`}
                    className="w-full object-cover"
                  />
                  {img.caption && (
                    <p className="text-xs text-muted-foreground mt-2 px-1">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No gallery images uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

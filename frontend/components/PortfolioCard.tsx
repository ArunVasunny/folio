import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/lib/api";
import { cn } from "@/lib/utils";

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

interface PortfolioCardProps {
  portfolio: Portfolio;
  className?: string;
}

export function PortfolioCard({ portfolio, className }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${portfolio.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {portfolio.coverImage ? (
          <img
            src={portfolio.coverImage}
            alt={portfolio.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-4xl font-display">
              {portfolio.ownerName.charAt(0)}
            </span>
          </div>
        )}
        {portfolio.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" className="text-xs">Featured</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{portfolio.ownerName}</p>
            <p className="text-xs text-muted-foreground truncate">{portfolio.title}</p>
          </div>
          {portfolio.rating > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0 text-xs text-muted-foreground">
              <Star size={12} className="fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
              <span>{portfolio.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <Badge variant="secondary" className="text-xs">
            {CATEGORY_LABELS[portfolio.category] || portfolio.category}
          </Badge>
          {portfolio.location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
              <MapPin size={10} />
              {portfolio.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

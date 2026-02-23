import { Star, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/api";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: Template;
  onSelect?: (template: Template) => void;
  selected?: boolean;
  className?: string;
}

const STYLE_LABELS: Record<string, string> = {
  grid: "Grid",
  masonry: "Masonry",
  fullscreen: "Full Screen",
  magazine: "Magazine",
  minimal: "Minimal",
  bold: "Bold",
};

export function TemplateCard({ template, onSelect, selected, className }: TemplateCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1",
        selected
          ? "border-[hsl(var(--accent))] shadow-lg"
          : "border-border bg-card",
        className
      )}
      onClick={() => onSelect?.(template)}
    >
      {/* Preview image */}
      <div className="relative overflow-hidden aspect-[3/2]">
        {template.previewImage ? (
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {template.isPremium && (
            <Badge className="bg-amber-500/90 text-white border-0 gap-1 text-xs">
              <Crown size={10} />
              Premium
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
            {STYLE_LABELS[template.style] || template.style}
          </Badge>
        </div>

        {selected && (
          <div className="absolute inset-0 bg-[hsl(var(--accent))]/10 flex items-center justify-center">
            <div className="bg-[hsl(var(--accent))] text-white rounded-full px-4 py-1.5 text-sm font-medium">
              Selected
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 bg-card">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-medium text-sm">{template.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{template.description}</p>
          </div>
          {template.rating > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
              <Star size={12} className="fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
              {template.rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground">{template.usageCount.toLocaleString()} using this</span>
          <Button size="sm" variant={selected ? "accent" : "outline"} className="h-7 text-xs">
            {selected ? "Selected" : "Use Template"}
          </Button>
        </div>
      </div>
    </div>
  );
}

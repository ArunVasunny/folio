"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchApi, SearchResult } from "@/lib/api";
import { cn } from "@/lib/utils";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
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

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    searchApi
      .search(debouncedQuery.trim())
      .then((res) => {
        setResults(res.data.results);
        setOpen(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/portfolio/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-2xl", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search portfolios by name…"
            className="pl-11 pr-10 h-12 text-base rounded-full border-border/60 bg-card shadow-sm focus-visible:ring-[hsl(var(--accent))]"
          />
          {loading && (
            <Loader2
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground"
            />
          )}
          {!loading && query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setOpen(false); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
          {results.map((result) => (
            <button
              key={result._id}
              onClick={() => handleSelect(result.slug)}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary text-left transition-colors border-b border-border/50 last:border-0"
            >
              {result.coverImage && (
                <img
                  src={result.coverImage}
                  alt={result.title}
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{result.ownerName}</p>
                <p className="text-xs text-muted-foreground truncate">{result.title}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {CATEGORY_LABELS[result.category] || result.category}
                </span>
                {result.rating > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star size={10} className="fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                    {result.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </button>
          ))}

          <button
            onClick={handleSubmit as any}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Search size={14} />
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}

      {open && results.length === 0 && !loading && query.trim().length >= 2 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-border bg-card shadow-xl z-50 px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">No portfolios found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}

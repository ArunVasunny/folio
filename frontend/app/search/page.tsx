"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { searchApi, SearchResult } from "@/lib/api";
import { SearchBar } from "@/components/SearchBar";
import { PortfolioCard } from "@/components/PortfolioCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    searchApi
      .search(q)
      .then((res) => {
        setResults(res.data.results);
        setSearched(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="pt-16">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-light mb-8">
            {q ? `Results for "${q}"` : "Search portfolios"}
          </h1>

          <div className="mb-10">
            <SearchBar />
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-64" />
              ))}
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-display font-light mb-2">No results found</p>
              <p className="text-muted-foreground">Try a different name or browse by category.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {results.length} portfolio{results.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((r) => (
                  <PortfolioCard
                    key={r._id}
                    portfolio={{
                      ...r,
                      bio: "",
                      ownerEmail: "",
                      slug: r.slug,
                      title: r.title,
                      featured: false,
                      views: 0,
                      images: [],
                      website: "",
                      instagram: "",
                      createdAt: "",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}

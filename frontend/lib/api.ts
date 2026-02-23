import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// ── Types ──────────────────────────────────────────────────
export interface Portfolio {
  _id: string;
  ownerName: string;
  slug: string;
  title: string;
  bio: string;
  category: string;
  coverImage: string;
  rating: number;
  views: number;
  featured: boolean;
  location: string;
  templateId?: Template;
  createdAt: string;
}

export interface Template {
  _id: string;
  name: string;
  slug: string;
  description: string;
  previewImage: string;
  categories: string[];
  style: string;
  rating: number;
  usageCount: number;
  isPremium: boolean;
  colorOptions: { name: string; primary: string; accent: string }[];
}

export interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
  order: number;
}

export interface SearchResult {
  _id: string;
  ownerName: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  rating: number;
  location: string;
}

// ── Portfolio API ──────────────────────────────────────────
export const portfolioApi = {
  list: (params?: { category?: string; featured?: boolean; page?: number; limit?: number }) =>
    api.get<{ portfolios: Portfolio[]; total: number; pages: number }>("/portfolios", { params }),

  topRated: (params?: { category?: string; limit?: number }) =>
    api.get<{ portfolios: Portfolio[] }>("/portfolios/top-rated", { params }),

  getBySlug: (slug: string) =>
    api.get<{ portfolio: Portfolio }>(`/portfolios/${slug}`),

  create: (data: Partial<Portfolio>) =>
    api.post<{ portfolio: Portfolio }>("/portfolios", data),
};

// ── Template API ───────────────────────────────────────────
export const templateApi = {
  list: (params?: { category?: string }) =>
    api.get<{ templates: Template[] }>("/templates", { params }),

  getBySlug: (slug: string) =>
    api.get<{ template: Template }>(`/templates/${slug}`),
};

// ── Pricing API ────────────────────────────────────────────
export const pricingApi = {
  list: () => api.get<{ plans: PricingPlan[] }>("/pricing"),
};

// ── Contact API ────────────────────────────────────────────
export const contactApi = {
  send: (data: { name: string; email: string; subject?: string; message: string }) =>
    api.post<{ message: string }>("/contact", data),
};

// ── Search API ─────────────────────────────────────────────
export const searchApi = {
  search: (q: string, category?: string) =>
    api.get<{ results: SearchResult[]; count: number; query: string }>("/search", {
      params: { q, category },
    }),
};

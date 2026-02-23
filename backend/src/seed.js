/**
 * Run with: node src/seed.js
 * Seeds the database with sample templates, portfolios, and pricing plans.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Template = require("./models/Template");
const Portfolio = require("./models/Portfolio");
const Pricing = require("./models/Pricing");

const TEMPLATES = [
  {
    name: "Luminary Grid",
    slug: "luminary-grid",
    description: "Clean asymmetric grid layout, perfect for photographers.",
    previewImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    categories: ["photography", "all"],
    style: "grid",
    rating: 4.8,
    usageCount: 1240,
    isPremium: false,
    colorOptions: [
      { name: "Midnight", primary: "#0f0f0f", accent: "#f0e6d3" },
      { name: "Ivory", primary: "#fafaf8", accent: "#1a1a1a" },
    ],
  },
  {
    name: "Cascade Masonry",
    slug: "cascade-masonry",
    description: "Flowing masonry layout that adapts to any image ratio.",
    previewImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    categories: ["photography", "interior-design", "all"],
    style: "masonry",
    rating: 4.7,
    usageCount: 980,
    isPremium: false,
    colorOptions: [
      { name: "Stone", primary: "#f5f0eb", accent: "#2c2c2c" },
    ],
  },
  {
    name: "Meridian Full",
    slug: "meridian-full",
    description: "Full-screen immersive layout with cinematic transitions.",
    previewImage: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=600",
    categories: ["photography", "videography", "architecture"],
    style: "fullscreen",
    rating: 4.9,
    usageCount: 760,
    isPremium: true,
    colorOptions: [
      { name: "Obsidian", primary: "#080808", accent: "#e8d5b7" },
    ],
  },
  {
    name: "Studio Editorial",
    slug: "studio-editorial",
    description: "Magazine-style editorial layout for design professionals.",
    previewImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
    categories: ["interior-design", "graphic-design", "fashion"],
    style: "magazine",
    rating: 4.6,
    usageCount: 540,
    isPremium: true,
    colorOptions: [
      { name: "Linen", primary: "#f8f4ef", accent: "#3d3d3d" },
    ],
  },
  {
    name: "Minimal Mono",
    slug: "minimal-mono",
    description: "Ultra-minimal single-column layout. Let the work speak.",
    previewImage: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600",
    categories: ["all"],
    style: "minimal",
    rating: 4.5,
    usageCount: 430,
    isPremium: false,
    colorOptions: [
      { name: "White", primary: "#ffffff", accent: "#000000" },
    ],
  },
];

const PRICING = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Get started with a beautiful portfolio.",
    features: [
      "1 portfolio",
      "3 free templates",
      "Folio subdomain (yourname.folio.io)",
      "5 GB storage",
      "Basic analytics",
    ],
    highlighted: false,
    ctaLabel: "Start Free",
    order: 0,
  },
  {
    name: "Pro",
    price: 14,
    yearlyPrice: 120,
    description: "For professionals who mean business.",
    features: [
      "5 portfolios",
      "All templates (30+)",
      "Custom domain",
      "20 GB storage",
      "Advanced analytics",
      "Remove Folio branding",
      "Priority support",
    ],
    highlighted: true,
    ctaLabel: "Go Pro",
    order: 1,
  },
  {
    name: "Studio",
    price: 39,
    yearlyPrice: 360,
    description: "For agencies and creative studios.",
    features: [
      "Unlimited portfolios",
      "All templates",
      "10 custom domains",
      "100 GB storage",
      "Team collaboration",
      "White-label option",
      "Dedicated support",
      "API access",
    ],
    highlighted: false,
    ctaLabel: "Contact Sales",
    order: 2,
  },
];

const PORTFOLIOS = [
  {
    ownerName: "Aria Chen",
    ownerEmail: "aria@example.com",
    slug: "aria-chen",
    title: "Aria Chen Photography",
    bio: "Capturing light and soul in every frame. Based in NYC.",
    category: "photography",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.9,
    views: 12400,
    featured: true,
    location: "New York, USA",
  },
  {
    ownerName: "Marco Ricci",
    ownerEmail: "marco@example.com",
    slug: "marco-ricci",
    title: "Ricci Interiors",
    bio: "Timeless spaces with a Mediterranean soul.",
    category: "interior-design",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    rating: 4.8,
    views: 9800,
    featured: true,
    location: "Milan, Italy",
  },
  {
    ownerName: "Yuki Tanaka",
    ownerEmail: "yuki@example.com",
    slug: "yuki-tanaka",
    title: "Yuki Tanaka Studio",
    bio: "Minimalist architecture rooted in Japanese philosophy.",
    category: "architecture",
    coverImage: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=800",
    rating: 4.7,
    views: 7600,
    featured: false,
    location: "Tokyo, Japan",
  },
  {
    ownerName: "Sofia Reyes",
    ownerEmail: "sofia@example.com",
    slug: "sofia-reyes",
    title: "Sofia Reyes Design",
    bio: "Bold graphic design for bold brands.",
    category: "graphic-design",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    rating: 4.6,
    views: 5400,
    featured: false,
    location: "Mexico City, Mexico",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    Template.deleteMany({}),
    Portfolio.deleteMany({}),
    Pricing.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  // Insert templates
  const templates = await Template.insertMany(TEMPLATES);
  console.log(`Inserted ${templates.length} templates`);

  // Insert portfolios with template references
  const portfoliosWithTemplates = PORTFOLIOS.map((p, i) => ({
    ...p,
    templateId: templates[i % templates.length]._id,
  }));
  const portfolios = await Portfolio.insertMany(portfoliosWithTemplates);
  console.log(`Inserted ${portfolios.length} portfolios`);

  // Insert pricing
  const plans = await Pricing.insertMany(PRICING);
  console.log(`Inserted ${plans.length} pricing plans`);

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

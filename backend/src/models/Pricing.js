const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // e.g. "Free", "Pro", "Studio"
    price: { type: Number, required: true },          // monthly price in USD
    yearlyPrice: { type: Number, default: 0 },
    description: { type: String, default: "" },
    features: [String],
    highlighted: { type: Boolean, default: false },  // "Most Popular" badge
    ctaLabel: { type: String, default: "Get Started" },
    order: { type: Number, default: 0 },             // display order
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pricing", pricingSchema);

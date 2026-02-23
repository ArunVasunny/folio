const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    // Owner info
    ownerName: { type: String, required: true, trim: true },
    ownerEmail: { type: String, required: true, lowercase: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    // Portfolio meta
    title: { type: String, required: true },
    bio: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: [
        "photography",
        "interior-design",
        "architecture",
        "graphic-design",
        "illustration",
        "videography",
        "fashion",
        "web-design",
      ],
    },

    // Template reference
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },

    // Portfolio content
    coverImage: { type: String, default: "" },
    images: [{ url: String, caption: String }],

    // Social / contact
    website: { type: String, default: "" },
    instagram: { type: String, default: "" },
    location: { type: String, default: "" },

    // Metrics
    rating: { type: Number, default: 0, min: 0, max: 5 },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search
portfolioSchema.index({ ownerName: "text", title: "text", category: "text" });

module.exports = mongoose.model("Portfolio", portfolioSchema);

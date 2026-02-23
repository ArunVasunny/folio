const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    previewImage: { type: String, default: "" },

    // Which portfolio categories this template supports
    categories: [
      {
        type: String,
        enum: [
          "photography",
          "interior-design",
          "architecture",
          "graphic-design",
          "illustration",
          "videography",
          "fashion",
          "web-design",
          "all",
        ],
      },
    ],

    // Layout style tag
    style: {
      type: String,
      enum: ["grid", "masonry", "fullscreen", "magazine", "minimal", "bold"],
      default: "grid",
    },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    usageCount: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },

    // Color palette options available
    colorOptions: [{ name: String, primary: String, accent: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);

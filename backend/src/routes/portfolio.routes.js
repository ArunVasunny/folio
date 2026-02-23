const router = require("express").Router();
const Portfolio = require("../models/Portfolio");

// GET /api/portfolios — list with optional category filter
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit = 12, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;

    const skip = (Number(page) - 1) * Number(limit);
    const [portfolios, total] = await Promise.all([
      Portfolio.find(filter)
        .populate("templateId", "name slug previewImage style")
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Portfolio.countDocuments(filter),
    ]);

    res.json({ portfolios, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/portfolios/top-rated — top rated per category (used on template page)
router.get("/top-rated", async (req, res) => {
  try {
    const { category, limit = 6 } = req.query;
    const filter = { rating: { $gte: 4 } };
    if (category) filter.category = category;

    const portfolios = await Portfolio.find(filter)
      .populate("templateId", "name slug previewImage style")
      .sort({ rating: -1, views: -1 })
      .limit(Number(limit));

    res.json({ portfolios });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/portfolios/:slug — single portfolio
router.get("/:slug", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("templateId");

    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ portfolio });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/portfolios — create portfolio
router.post("/", async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json({ portfolio });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/portfolios/:id — update portfolio
router.patch("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ portfolio });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/portfolios/:id
router.delete("/:id", async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

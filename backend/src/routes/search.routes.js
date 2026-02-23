const router = require("express").Router();
const Portfolio = require("../models/Portfolio");

// GET /api/search?q=john+doe&category=photography
// Searches portfolios by owner name, title, or category using MongoDB text index
router.get("/", async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: "Query must be at least 2 characters" });
    }

    const filter = {
      $or: [
        { ownerName: { $regex: q.trim(), $options: "i" } },
        { title: { $regex: q.trim(), $options: "i" } },
      ],
    };

    if (category) filter.category = category;

    const results = await Portfolio.find(filter)
      .select("ownerName title slug category coverImage rating location")
      .sort({ rating: -1 })
      .limit(Number(limit));

    res.json({ results, count: results.length, query: q });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

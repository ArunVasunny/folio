const router = require("express").Router();
const Template = require("../models/Template");

// GET /api/templates — all templates, optionally filtered by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { categories: { $in: [category, "all"] } } : {};
    const templates = await Template.find(filter).sort({ rating: -1, usageCount: -1 });
    res.json({ templates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/templates/:slug
router.get("/:slug", async (req, res) => {
  try {
    const template = await Template.findOne({ slug: req.params.slug });
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json({ template });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/templates — create (admin)
router.post("/", async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json({ template });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

const router = require("express").Router();
const Pricing = require("../models/Pricing");

// GET /api/pricing
router.get("/", async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ order: 1 });
    res.json({ plans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/pricing — create plan (admin)
router.post("/", async (req, res) => {
  try {
    const plan = new Pricing(req.body);
    await plan.save();
    res.status(201).json({ plan });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/pricing/:id
router.delete("/:id", async (req, res) => {
  try {
    await Pricing.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

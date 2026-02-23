require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const portfolioRoutes = require("./routes/portfolio.routes");
const templateRoutes = require("./routes/template.routes");
const pricingRoutes = require("./routes/pricing.routes");
const contactRoutes = require("./routes/contact.routes");
const searchRoutes = require("./routes/search.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/search", searchRoutes);

// ── Health check ───────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ── 404 handler ────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ── Error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ── MongoDB + Server ───────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

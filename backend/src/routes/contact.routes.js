const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// POST /api/contact
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json({ message: "Message received! We'll be in touch soon." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// GET /api/contact — list messages (admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

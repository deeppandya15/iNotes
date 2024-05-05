const express = require("express");
const router = express.Router();
const Notes = require("../modals/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user });
  res.json(notes);
});

router.post(
  "/addnote",
  fetchUser,
  [
    // Validation middleware for name, password, and email fields
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return validation errors if any
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      const note = new Notes({ title, description, tag, user: req.user });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

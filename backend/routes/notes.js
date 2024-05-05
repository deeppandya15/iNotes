const express = require("express");
const router = express.Router();
const Notes = require("../modals/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

//Route:1 Fetch all notes using: GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user });
  res.json(notes);
});
//Route:2 Add a new note using: POST "api/notes/addnote"
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

//Route:3 Update an existing note using: PUT "api/notes/updatenote"
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    // Destructure title, description, and tag from the request body
    const { title, description, tag } = req.body;

    // Create an empty object to hold the updated note details
    const newNote = {};

    // If title exists in the request body, add it to newNote
    if (title) {
      newNote.title = title;
    }

    // If description exists in the request body, add it to newNote
    if (description) {
      newNote.description = description;
    }

    // If tag exists in the request body, add it to newNote
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note by its ID in the database
    let note = await Notes.findById(req.params.id);

    // If the note is not found, return a 404 error
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user is the owner of the note
    if (note.user.toString() !== req.user) {
      // If not, return a 401 error
      return res.status(401).send("Not Allowed");
    }

    // Update the note with the newNote object
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    // Send the updated note as the response
    res.send(note);
  } catch (error) {
    // If any error occurs during the process, handle it
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route:4 Delete an existing note using: DELETE "api/notes/deletenote"
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Destructure title, description, and tag from the request body
    const { title, description, tag } = req.body;

    // Find the note by its ID in the database
    let note = await Notes.findById(req.params.id);

    // If the note is not found, return a 404 error
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user is the owner of the note
    if (note.user.toString() !== req.user) {
      // If not, return a 401 error
      return res.status(401).send("Not Allowed");
    }

    // Delete the note from the database
    note = await Notes.findOneAndDelete(req.params.id);

    // Send a success message along with the deleted note as the response
    res.json({ Success: "Note deleted successfully", note: note });
  } catch (error) {
    // If any error occurs during the process, handle it
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

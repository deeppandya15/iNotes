// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
    default: "General",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

// module.exports = mongoose.model("notes", NotesSchema);

const Notes = mongoose.model("notes", NotesSchema);
module.exports = Notes;

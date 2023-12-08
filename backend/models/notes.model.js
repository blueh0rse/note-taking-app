const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ownerId: { type: String },
  content: [{ type: String }],
});

module.exports = mongoose.model("Note", noteSchema);

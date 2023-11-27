const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: [{ type: String, id: String }],
  content: [{ type: String }],
});

module.exports = mongoose.model("Note", noteSchema);

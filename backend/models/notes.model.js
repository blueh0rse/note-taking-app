const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ownerId: { type: ObjectId },
  content: [{ type: String }],
});

module.exports = mongoose.model("Note", noteSchema);

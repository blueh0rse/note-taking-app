const mongoose = require("mongoose");
const User = require("./users.model");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  members: [{ id: String }],
});

module.exports = mongoose.model("Group", groupSchema);

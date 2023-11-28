const Group = require("../models/groups.model.js");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
    } else {
      res.status(200).json(group);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Group successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

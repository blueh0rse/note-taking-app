const Note = require("../models/notes.model.js");

exports.createNote = async (req, res) => {
  try {
    const name = req.body.name;
    // check if note has name
    if (!name) {
      return res.status(400).send({ message: "Note has no name." });
    }
    // check if note with same name exits
    const nameExists = await Note.findOne({ name });
    if (nameExists) {
      return res.status(400).send({ message: "Name already used." });
    }
    // add owner id to new note
    const newNote = new Note({ name, ownerId: req.user.id });
    // save note
    await newNote.save();
    res.status(201).json({ message: "Note created." });
  } catch (error) {
    res.status(400).send({ message: "Error." });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.params.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    // const note = await Note.findById(req.params.id);
    // if (!note) res.status(404).json({ message: "Note not found." });
    const { name, content } = req.item;
    const note = { name, content };
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

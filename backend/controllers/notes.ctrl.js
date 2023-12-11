const Note = require("../models/notes.model.js");
const validator = require("validator");

exports.createNote = async (req, res) => {
  try {
    const name = validator.escape(req.body.name);
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
    const userId = validator.escape(req.user.id);
    const newNote = new Note({ name, ownerId: userId });
    // save note
    await newNote.save();
    res.status(201).json({ message: "Note created." });
  } catch (error) {
    res.status(400).send({ message: "Error." });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    res.status(200).json(req.items);
  } catch (error) {
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    res.status(200).json(req.item);
  } catch (error) {
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = validator.escape(req.body);
    const noteId = validator.escape(req.params.note_id);
    const updateObject = {};

    if (!noteId) {
      res.status(400).json({ message: "Bad request!" });
    }

    if (title) {
      updateObject.title = title;
    }

    if (content) {
      updateObject.content = content;
    }
    const updatedNote = await Note.findByIdAndUpdate(noteId, updateObject, {
      new: true,
    }).select("_id name content");
    console.log(updatedNote);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = validator.escape(req.params.note_id);

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

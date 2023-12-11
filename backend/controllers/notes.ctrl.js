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
    console.log("testup");
    const { title, content } = req.body;
    const updateObject = {};
    const noteId = req.params.note_id;

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
    await Note.findByIdAndDelete(req.params.note_id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

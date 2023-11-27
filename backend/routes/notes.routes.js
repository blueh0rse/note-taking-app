const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes.ctrl.js");

router.post("/", noteController.createNote);
router.get("/", noteController.getUserNotes);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;

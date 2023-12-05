const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const Note = require("../models/notes.model.js");
const noteController = require("../controllers/notes.ctrl.js");

// create a note
router.post(
  "/",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("user"),
  noteController.createNote
);

// get user note(s)
router.get(
  "/",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("user"),
  auth.verifyPermissions(Note, "ownerId"),
  noteController.getUserNotes
);

// get 1 user note
router.get(
  "/:note_name",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("user"),
  auth.verifyPermissions(Note, "ownerId"),
  noteController.getNoteById
);

// update 1 user note
router.put(
  "/:note_id",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("user"),
  auth.verifyPermissions,
  noteController.updateNote
);

// delete 1 user note
router.delete(
  "/:note_id",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("user"),
  auth.verifyPermissions,
  noteController.deleteNote
);

module.exports = router;

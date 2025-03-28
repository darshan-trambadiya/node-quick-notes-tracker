// external
const express = require("express");

// controllers
const notesController = require("../controllers/notes");

const router = express.Router();

router.get("/", notesController.getHomePage);

router.get("/notes", notesController.getNotesPage);

router.get("/notes/:noteId", notesController.getNoteDetailsPage);

router.get("/add-note", notesController.getAddNotePage);

router.post("/add-note", notesController.addNote);

router.get("/edit-note/:noteId", notesController.getEditNotePage);

router.post("/edit-note", notesController.editNote);

router.post("/delete-note/:noteId", notesController.deleteNote);

module.exports = router;

// external
const express = require("express");

// controllers
const importantNotesController = require("../controllers/important_notes");

const router = express.Router();

router.get("/important-notes", importantNotesController.getImportantNotesPage);

router.post(
  "/mark-as-important-note",
  importantNotesController.markAsImportant
);

router.post(
  "/remove-as-important-note",
  importantNotesController.removeAsImportant
);

module.exports = router;

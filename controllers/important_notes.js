// models
const ImportantNotesModel = require("../models/important_notes");

exports.getImportantNotesPage = async (req, res, next) => {
  try {
    const importantNotes = await ImportantNotesModel.fetchAll();
    res.render("important_notes/important_notes", {
      importantNotes: importantNotes,
      pageTitle: "All Important Notes | Quick Notes Tracker",
      path: "/important-notes",
    });
  } catch (error) {
    console.error(
      "=====> Error: controllers -> important_notes.js -> getImportantNotesPage() :: ",
      error
    );
  }
};

exports.markAsImportant = async (req, res, next) => {
  try {
    const { noteId, fromView } = req.body;

    await ImportantNotesModel.markOrRemoveAsImportant(noteId, true);

    switch (fromView) {
      case "NOTES_LISTING":
        res.redirect("/notes");
        break;
      case "NOTE_DETAILS":
        res.redirect(`/notes/${noteId}`);
        break;
      case "IMPORTANT_NOTES":
        res.redirect("/important-notes");
        break;

      default:
        res.redirect("/notes");
        break;
    }
  } catch (error) {
    console.error(
      "=====> Error: controllers -> important_notes.js -> markAsImportant() :: ",
      error
    );
  }
};

exports.removeAsImportant = async (req, res, next) => {
  try {
    const { noteId, fromView } = req.body;

    await ImportantNotesModel.markOrRemoveAsImportant(noteId, false);

    switch (fromView) {
      case "NOTES_LISTING":
        res.redirect("/notes");
        break;
      case "NOTE_DETAILS":
        res.redirect(`/notes/${noteId}`);
        break;
      case "IMPORTANT_NOTES":
        res.redirect("/important-notes");
        break;

      default:
        res.redirect("/notes");
        break;
    }
  } catch (error) {
    console.error(
      "=====> Error: controllers -> important_notes.js -> removeAsImportant() :: ",
      error
    );
  }
};

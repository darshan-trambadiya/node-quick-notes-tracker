// models
const NotesModel = require("../models/notes");

exports.getHomePage = async (req, res, next) => {
  try {
    res.render("home_page", {
      pageTitle: "Home Page | Quick Notes Tracker",
      path: "/",
    });
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> getHomePage() :: ",
      error
    );
  }
};

exports.getNotesPage = async (req, res, next) => {
  try {
    const notes = await NotesModel.fetchAll();
    res.render("notes/notes_page", {
      notes: notes,
      pageTitle: "All Notes | Quick Notes Tracker",
      path: "/notes",
    });
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> getNotesPage() :: ",
      error
    );
  }
};

exports.getNoteDetailsPage = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await NotesModel.findById(noteId);
    res.render("notes/note_details", {
      note: note,
      pageTitle: `${note.title} Note Details | Quick Notes Tracker`,
      path: "/notes/:noteId",
    });
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> getNoteDetailsPage() :: ",
      error
    );
    res.render("home_page", {
      pageTitle: "Home Page | Quick Notes Tracker",
      path: "/",
    });
  }
};

exports.getAddNotePage = (req, res, next) => {
  res.render("notes/add_edit_note", {
    pageTitle: "Add Note | Quick Notes Tracker",
    path: "/add-note",
    editing: false,
  });
};

exports.addNote = async (req, res, next) => {
  try {
    const { title, priority, description, isImportant } = req.body;
    const note = new NotesModel(
      null,
      title,
      priority,
      description,
      isImportant === "true" ? true : false,
      new Date().toISOString(),
      new Date().toISOString()
    );
    await note.save();
    res.redirect("/notes");
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> addNote() :: ",
      error
    );
  }
};

exports.getEditNotePage = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const noteId = req.params.noteId;
    const note = await NotesModel.findById(noteId);
    if (!note) {
      return res.redirect("/");
    }
    res.render("notes/add_edit_note", {
      pageTitle: "Edit Note | Quick Notes Tracker",
      path: `/edit-note/${note.id}`,
      editing: editMode,
      note: note,
    });
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> getEditNotePage() :: ",
      error
    );
  }
};

exports.editNote = async (req, res, next) => {
  try {
    const { noteId, title, priority, description, isImportant, createdAt } =
      req.body;
    const updatedNote = new NotesModel(
      noteId,
      title,
      priority,
      description,
      isImportant === "true" ? true : false,
      createdAt,
      new Date().toISOString()
    );
    await updatedNote.save();
    res.redirect("/notes");
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> editNote() :: ",
      error
    );
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    console.log("==== deleteNote noteId :: ", noteId);
    await NotesModel.deleteById(noteId);
    res.redirect("/notes");
  } catch (error) {
    console.error(
      "=====> Error: controllers -> notes.js -> deleteNote() :: ",
      error
    );
  }
};

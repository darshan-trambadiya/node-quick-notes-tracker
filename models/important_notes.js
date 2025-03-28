// external
const fs = require("fs").promises;
const path = require("path");

// models
const NotesModel = require("./notes");

module.exports = class ImportantNotes {
  static async fetchAll() {
    try {
      const notes = await NotesModel.getNotesFromFileDatabase();
      return notes.filter((note) => note.isImportant);
    } catch (error) {
      console.error(
        "=====> Error: Models -> important_notes.js -> fetchAll() :: ",
        error
      );
      return [];
    }
  }

  static async markOrRemoveAsImportant(id, isImportantStatus) {
    try {
      const notes = await NotesModel.getNotesFromFileDatabase();
      const noteIndex = notes.findIndex((note) => note.id === id);
      if (noteIndex >= 0) {
        notes[noteIndex] = {
          ...notes[noteIndex],
          isImportant: isImportantStatus,
        };
        await fs.writeFile(
          NotesModel.notesJsonFile,
          JSON.stringify(notes, null, 2)
        );
      }
      return notes;
    } catch (error) {
      console.error(
        "=====> Error: Models -> important_notes.js -> markOrRemoveAsImportant() :: ",
        error
      );
      return [];
    }
  }
};

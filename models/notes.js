// external
const fs = require("fs").promises;
const path = require("path");

// utils
const { setWritePermissionToFile } = require("../utils/common");

module.exports = class Notes {
  static folderPath = path.join(__dirname, "..", "data");
  static notesJsonFile = path.join(Notes.folderPath, "notes.json");

  constructor(
    id,
    title,
    priority,
    description,
    isImportant,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.description = description;
    this.isImportant = isImportant;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async createFileAsDatabase() {
    try {
      await fs.access(Notes.folderPath); // Check if folder exists
    } catch (error) {
      // Folder does not exist, create it
      await fs.mkdir(Notes.folderPath, { recursive: true });
    }

    try {
      await fs.access(Notes.notesJsonFile); // Check if file exists
    } catch (error) {
      await setWritePermissionToFile(Notes.notesJsonFile);
      // File does not exist, create it with default content
      await fs.writeFile(Notes.notesJsonFile, JSON.stringify([]));
    }
  }

  static async getNotesFromFileDatabase() {
    try {
      const fileData = await fs.readFile(Notes.notesJsonFile);
      return JSON.parse(fileData);
    } catch (error) {
      console.error(
        "=====> Error: Models -> notes.js -> getNotesFromFileDatabase() :: ",
        error
      );
      return [];
    }
  }

  static fetchAll() {
    try {
      return Notes.getNotesFromFileDatabase();
    } catch (error) {
      console.error(
        "=====> Error: Models -> notes.js -> fetchAll() :: ",
        error
      );
      return [];
    }
  }

  static async findById(id) {
    try {
      const notes = await Notes.getNotesFromFileDatabase();
      return notes.find((note) => note.id === id);
    } catch (error) {
      console.error(
        "=====> Error: Models -> notes.js -> findById() :: ",
        error
      );
      return null;
    }
  }

  async save() {
    try {
      const notes = await Notes.getNotesFromFileDatabase();
      if (this.id) {
        const existingNoteIndex = notes?.findIndex(
          (note) => note.id === this.id
        );
        const updatedNotes = [...notes];
        updatedNotes[existingNoteIndex] = this;
        await fs.writeFile(
          Notes.notesJsonFile,
          JSON.stringify(updatedNotes, null, 2)
        );
      } else {
        this.id = new Date().getTime().toString();
        notes.push(this);
        await fs.writeFile(Notes.notesJsonFile, JSON.stringify(notes, null, 2));
      }
    } catch (error) {
      console.error("=====> Error: Models -> notes.js -> save() :: ", error);
    }
  }

  static async deleteById(id) {
    try {
      const notes = await Notes.getNotesFromFileDatabase();
      const updatedNotes = notes.filter((note) => note.id !== id);
      await fs.writeFile(
        Notes.notesJsonFile,
        JSON.stringify(updatedNotes, null, 2)
      );
    } catch (error) {
      console.error(
        "=====> Error: Models -> notes.js -> deleteById() :: ",
        error
      );
    }
  }
};

// external
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// controllers
const errorController = require("./controllers/error");

// routes
const notesRoutes = require("./routes/notes");
const importantNotesRoutes = require("./routes/important_notes");

// models
const NotesModel = require("./models/notes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(notesRoutes);
app.use(importantNotesRoutes);

app.use(errorController.get404);

app.listen(3000, async () => {
  await NotesModel.createFileAsDatabase();

  console.log("Server is running on port 3000!");
});

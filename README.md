# Quick Notes Tracker

Quick Notes Tracker is a Node.js-based application designed to streamline note-taking with essential features that enhance organization and flexibility. Users can create, edit, and delete notes, mark notes as important, and view detailed information for each note. All data is stored locally using files as a database, making it simple and accessible without complex configurations.

## Key Features

- **Create, Edit, and Delete Notes**: Easily manage personal notes by adding, modifying, or removing them as needed.
- **Detailed Note Navigation**: Navigate to individual note details for more in-depth information.
- **Mark as Important**: Highlight crucial notes by marking them as important for easy identification.
- **File-Based Database**: Stores notes as files locally, providing a lightweight, database-free solution.

## Technologies Used

- **Backend**: Node.js and Express for handling server-side operations
- **Frontend**: EJS template engine with Bootstrap 5 and animate.css for styling and animations
- **Data Handling**: fs.promises with async/await for efficient file operations
- **Middleware**: body-parser for handling form submissions and request data

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/darshan-trambadiya/node-quick-notes-tracker.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd node-quick-notes-tracker
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Start the application:**

   ```bash
   npm start
   ```

2. Open your web browser and go to `http://localhost:3000` to access the Quick Notes Tracker application.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy Note Taking!

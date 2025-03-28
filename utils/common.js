// external
const fs = require("fs").promises;
const path = require("path");

// utils
const { DEFAULT_FILE_PERMISSION_MODE } = require("./constants");

async function setWritePermissionToFile(
  file,
  permissionMode = DEFAULT_FILE_PERMISSION_MODE
) {
  try {
    await fs.chmod(path.dirname(file), permissionMode);
    return "Permission Granted!";
  } catch (error) {
    console.error(
      "=====> Error: Utils -> common.js -> setWritePermissionToFile() :: ",
      error
    );
    throw new Error("Permission Denied!");
  }
}

module.exports = {
  setWritePermissionToFile,
};

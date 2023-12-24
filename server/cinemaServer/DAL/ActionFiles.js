
const jsonfile = require("jsonfile");
const fs = require('fs/promises');

// Read from a JSON file 
const readJsonFile = async (filePath) => {
  try {
    const data = await jsonfile.readFile(filePath);
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

// Write to a JSON file 
const writeJsonFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData);
    console.log("Data written successfully!");
  } catch (err) {
    console.error("Error writing file:", err);
    throw err;
  }
};



module.exports = { readJsonFile, writeJsonFile};

// functions/jobs.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Read the jobs.json file
    const filePath = path.join(__dirname, "..", "data", "jobs.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error reading jobs.json:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

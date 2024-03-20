const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { client, seedData, createTable } = require("./db");

app.use(express.json());

(async () => {
  try {
    await client.connect();
    console.log("Connected to database!");
    await createTable();
    console.log("Tables created!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting server!", error);
  }
})();

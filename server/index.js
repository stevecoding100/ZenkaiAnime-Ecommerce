const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { client, seedData, createTable } = require("./db");
const router = require("./routes");

app.use(express.json());

(async () => {
  try {
    await client.connect();

    // -- Uncomment the following line to seed the database This will drop all tables and recreate them
    // await createTable();
    // console.log("Tables created!");

    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting server!", error);
  }
})();

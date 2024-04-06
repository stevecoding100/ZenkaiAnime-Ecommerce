const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { client, seedData, createTable } = require("./database/db");

app.use(express.json());

//Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const animeRoutes = require("./routes/anime");

(async () => {
  try {
    await client.connect();

    // -- Uncomment the following line to seed the database This will drop all tables and recreate them
    // await createTable();
    // console.log("Tables created!");

    app.use(express.static("dist"));

    app.use("/api/anime", animeRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/orders", orderRoutes);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting server!", error);
  }
})();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { client, seedData, createTable } = require("./database/db");

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const animeRoutes = require("./routes/anime");

(async () => {
  try {
    await client.connect();

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

module.exports = app;

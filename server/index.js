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

    const cors = require("cors");
    app.use(
      cors({
        origin: "https://zenkai-anime.vercel.app",
      })
    );

    app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Origin",
        "https://zenkai-anime.vercel.app"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    });

    app.use("/", animeRoutes);
    app.use("/", authRoutes);
    app.use("/", productRoutes);
    app.use("/", cartRoutes);
    app.use("/", orderRoutes);
    app.use("/", (req, res) => {
      res.json({ message: "Server is running!" });
    });
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting server!", error);
  }
})();

module.exports = app;

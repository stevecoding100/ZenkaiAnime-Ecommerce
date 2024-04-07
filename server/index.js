const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { client, seedData, createTable } = require("./database/db");

const cors = require("cors");
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

    const corsOptions = {
      origin: "https://zenkai-anime.vercel.app",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    };

    app.use(cors(corsOptions));

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

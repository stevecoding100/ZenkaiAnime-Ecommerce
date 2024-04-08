const express = require("express");
const app = express();
const cors = require("cors");
const apicache = require("apicache");
const { client, seedData, createTable } = require("./database/db");

let cache = apicache.middleware;

app.use(express.json());
app.use(
  cors({
    origin: "https://zenkai-anime.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type,Authorization",
  })
);

const init = async () => {
  try {
    await client.connect();
    // await createTable();
  } catch (error) {
    console.log(error);
  }
};

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const animeRoutes = require("./routes/anime");

// Use routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/anime", cache("5 minutes"), animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

init();

module.exports = app;

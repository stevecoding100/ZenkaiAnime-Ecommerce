const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const apicache = require("apicache");
let cache = apicache.middleware;
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const animeRoutes = require("./routes/anime");

// Apply caching only to animeRoutes
animeRoutes.use(cache("5 minutes"));
// productRoutes.use(cache("2 minutes"));

// Use routes
app.use("/", cors(), animeRoutes);
app.use("/", cors(), authRoutes);
app.use("/", cors(), productRoutes);
app.use("/", cors(), cartRoutes);
app.use("/", cors(), orderRoutes);
app.use("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

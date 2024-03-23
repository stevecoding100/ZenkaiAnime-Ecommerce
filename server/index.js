const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { client, seedData, createTable } = require("./database/db");

app.use(express.json());

//Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

(async () => {
  try {
    await client.connect();

    // -- Uncomment the following line to seed the database This will drop all tables and recreate them
    // await createTable();
    // console.log("Tables created!");

    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/orders", orderRoutes);
    app.get("/", (req, res) => {
      res.send("Welcome to the E-commerce API");
    });
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting server!", error);
  }
})();

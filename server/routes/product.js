const express = require("express");
const router = express.Router();
const { client } = require("../database/db");

// <-------- Database Queries -------->

// Create a new product
const createProduct = async ({
  name,
  descriptions,
  price,
  stock_quantity,
  image_url,
}) => {
  const SQL = `INSERT INTO products (name, descriptions, price, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await client.query(SQL, [
    name,
    descriptions,
    price,
    stock_quantity,
    image_url,
  ]);
  return response.rows[0];
};

const getAllProducts = async () => {
  const SQL = `SELECT * FROM products`;
  const response = await client.query(SQL);
  return response.rows;
};

const deleteProduct = async (id) => {
  const SQL = `DELETE FROM products WHERE id = $1`;
  await client.query(SQL, [id]);
};

// <-------- Routes -------->

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

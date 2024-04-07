const express = require("express");
const router = express.Router();
const { client } = require("../database/db");
const { isAdmin } = require("../middlewares/authMiddleware");

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

// Get all products
const getAllProducts = async () => {
  const SQL = `SELECT * FROM products`;
  const response = await client.query(SQL);
  return response.rows;
};
// Delete a product
const deleteProduct = async (id) => {
  const SQL = `DELETE FROM products WHERE id = $1`;
  await client.query(SQL, [id]);
};
// Update a product
const updateProduct = async (
  id,
  { name, descriptions, price, stock_quantity, image_url }
) => {
  const SQL = `UPDATE products SET name=$1, descriptions=$2, price=$3, stock_quantity=$4, image_url=$5 WHERE id=$6 RETURNING *`;
  const response = await client.query(SQL, [
    name,
    descriptions,
    price,
    stock_quantity,
    image_url,
    id,
  ]);
  return response.rows[0];
};

const getProductById = async (id) => {
  const SQL = `SELECT * FROM products WHERE id = $1`;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// <-------- Routes -------->

//Base route /api/products
router.get("/api/products/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// <!-- Get a single product
router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// <-- Admin Routes  -->

// <!-- Create a new product

router.post("/api/products/", isAdmin, async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// <!-- Delete a product

router.delete("/api/products/:id", isAdmin, async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// <!-- Update a product
router.put("/api/products/:id", isAdmin, async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

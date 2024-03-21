const express = require("express");
const router = express.Router();
const {
  createUser,
  createProduct,
  createCart,
  createCartItems,
} = require("./db");

router.post("/api/register", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/user/:user_id/cart", async (req, res) => {
  try {
    const cart = await createCart(req.params);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/cart/:cart_id", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const { cart_id } = req.params;
    const item = await createCartItems(cart_id, product_id, quantity);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

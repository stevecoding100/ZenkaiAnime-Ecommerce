const express = require("express");
const router = express.Router();
const { addItemsToCart } = require("../db");

// Add an item to a cart
router.post("/add", async (req, res) => {
  try {
    const { product_id, quantity, user_id } = req.body;
    const item = await addItemsToCart(user_id, product_id, quantity);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

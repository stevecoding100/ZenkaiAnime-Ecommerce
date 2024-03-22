const express = require("express");
const router = express.Router();
const { createProduct } = require("../db");

router.post("/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

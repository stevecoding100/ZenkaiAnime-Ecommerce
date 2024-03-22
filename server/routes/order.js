const express = require("express");
const router = express.Router();

const { createOrder } = require("../db");

router.post("/api/user/:user_id/order", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

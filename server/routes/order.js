const express = require("express");
const router = express.Router();

// <--- Database Queries --->

const createOrder = async ({ user_id, total_price, status }) => {
  const SQL = `INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [user_id, total_price, status]);
  return response.rows[0];
};

const createOrderItems = async (order_id, product_id, quantity, price) => {
  const SQL = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`;
  const response = await client.query(SQL, [
    order_id,
    product_id,
    quantity,
    price,
  ]);
  return response.rows[0];
};

// <--- Routes --->

// Create a new order
router.post("/api/user/:user_id/order", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

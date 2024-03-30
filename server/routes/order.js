const express = require("express");
const router = express.Router();
const { client } = require("../database/db");
const { isLoggedIn } = require("../middlewares/authMiddleware");

// <--- Database Queries --->

const getAllOrders = async () => {
  const SQL = `SELECT * FROM orders`;
  const response = await client.query(SQL);
  return response.rows;
};

const createOrder = async ({ user_id, total_price }) => {
  const SQL = `INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *`;
  const response = await client.query(SQL, [user_id, total_price]);
  return response.rows[0];
};

const deleteOrder = async ({ id }) => {
  const SQL = `DELETE FROM orders WHERE id = $1`;
  const response = await client.query(SQL, [id]);
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
// Base route /api/orders
// Get all orders

// ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new order
router.post("/add", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete an order
router.delete("/delete", async (req, res) => {
  try {
    await deleteOrder(req.body);
    res.status(204).json({ message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ORDER ITEMS
// Create a new order item
router.post("/order/:order_id/item", async (req, res) => {
  try {
    const orderItem = await createOrderItems(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

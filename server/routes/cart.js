const express = require("express");
const router = express.Router();

// <--- Database Queries --->
const addItemsToCart = async (user_id, product_id, quantity) => {
  // Check if user has a cart
  const cart = await client.query(`SELECT * FROM carts WHERE user_id = $1`, [
    user_id,
  ]);

  let cart_id;

  // If user has no cart, create a cart
  if (cart.rows.length === 0) {
    const SQL = `INSERT INTO carts (id) VALUES ($1) RETURNING *`;
    const response = await client.query(SQL, [user_id]);
    cart_id = response.rows[0].id;
  } else {
    cart_id = cart.rows[0].id;
  }

  const SQL = `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [cart_id, product_id, quantity]);
  return response.rows[0];
};

// <--- Routes --->
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

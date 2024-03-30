const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
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

const getCart = async (user_id) => {
  const SQL = `SELECT * FROM cart_items WHERE user_id = $1`;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const updateCart = async (user_id, product_id, quantity) => {
  const SQL = `UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`;
  const response = await client.query(SQL, [quantity, user_id, product_id]);
  return response.rows[0];
};

const deleteItemFromCart = async (user_id, product_id) => {
  const SQL = `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`;
  await client.query(SQL, [user_id, product_id]);
  return;
};

// <--- Routes --->
// Add an item to a cart
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const { product_id, quantity, user_id } = req.body;
    const item = await addItemsToCart(user_id, product_id, quantity);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a user's cart
router.get("/get", isLoggedIn, async (req, res) => {
  try {
    const { user_id } = req.body;
    const cart = await getCart(user_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an item in a cart
router.put("/update", isLoggedIn, async (req, res) => {
  try {
    const { product_id, quantity, user_id } = req.body;
    const item = await updateCart(user_id, product_id, quantity);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an item from a cart
router.delete("/delete", isLoggedIn, async (req, res) => {
  try {
    const { product_id, user_id } = req.body;
    await deleteItemFromCart(user_id, product_id);
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

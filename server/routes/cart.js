const express = require("express");
const router = express.Router();
const { client } = require("../database/db");
const { isLoggedIn } = require("../middlewares/authMiddleware");
// <--- Database Queries --->

const findCartByUserId = async (user_id) => {
  const SQL = `SELECT * FROM carts WHERE user_id = $1`;
  const response = await client.query(SQL, [user_id]);
  return response.rows[0];
};

const addItemsToCart = async ({ user_id, product_id, quantity }) => {
  // Check if user has a cart
  const cart = await findCartByUserId(user_id);
  let cart_id;

  // If user has no cart, create a cart
  if (!cart) {
    try {
      const SQL = `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`;
      const response = await client.query(SQL, [user_id]);
      cart_id = response.rows[0].id;
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  } else {
    cart_id = cart.id;
  }
  // Check if item is already in cart
  const item = await client.query(
    `SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
    [cart_id, product_id]
  );
  console.log("item", typeof item.rows[0].quantity);
  // If item is already in cart, update the quantity
  if (item.rows.length > 0) {
    try {
      const newQuantity = Number(item.rows[0].quantity) + quantity;
      const SQL = `UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *`;
      const response = await client.query(SQL, [
        newQuantity,
        cart_id,
        product_id,
      ]);
      return response.rows[0];
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  const SQL = `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [cart_id, product_id, quantity]);
  return response.rows[0];
};

const getCartItems = async (user_id) => {
  const cart = await findCartByUserId(user_id);
  const SQL = `SELECT * FROM cart_items WHERE cart_id = $1`;
  const response = await client.query(SQL, [cart.id]);

  // Get the product details for each item in the cart
  const items = await Promise.all(
    response.rows.map(async (item) => {
      const SQL = `SELECT * FROM products WHERE id = $1`;
      const response = await client.query(SQL, [item.product_id]);
      const product = response.rows[0];
      return {
        product,
        quantity: item.quantity,
      };
    })
  );
  console.log({ items });
  return items;
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
    const item = await addItemsToCart(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a user's cart
router.get("/:user_id", async (req, res) => {
  console.log("line 78 get cart", req.params);
  try {
    const cart = await getCartItems(req.params.user_id);
    console.log({ cart });
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

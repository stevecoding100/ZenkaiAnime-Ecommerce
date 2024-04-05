const express = require("express");
const router = express.Router();
const { client } = require("../database/db");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");

// <--- Database Queries --->
const getProduct = async (productId) => {
  const SQL = `SELECT id, name, descriptions, price, image_url FROM products WHERE id = $1`;
  const response = await client.query(SQL, [productId]);
  return response.rows[0];
};

const getUser = async (userId) => {
  const SQL = `SELECT id, first_name, last_name, email, billing_info FROM users WHERE id = $1`;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const orderItemsQuery = {
  createOrderItem: async (order_id, product_id, quantity, price) => {
    console.log({ order_id, product_id, quantity, price });
    const SQL = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`;
    const response = await client.query(SQL, [
      order_id,
      product_id,
      quantity,
      price,
    ]);
    return response.rows[0];
  },
  getOrderItems: async (order_id) => {
    const SQL = `SELECT product_id, quantity FROM order_items WHERE order_id = $1`;
    const response = await client.query(SQL, [order_id]);
    return response.rows;
  },
};
const ordersQuery = {
  getAllOrders: async () => {
    try {
      const SQL = `SELECT * FROM orders`;
      const response = await client.query(SQL);

      const orders = await Promise.all(
        response.rows.map(async (order) => {
          const orderItem = await orderItemsQuery.getOrderItems(order.id);
          const product = await getProduct(orderItem[0].product_id);
          const user = await getUser(order.user_id);

          return {
            id: order.id,
            date: order.order_date,
            status: order.status,
            total_price: order.total_price,
            user: user,
            product: product,
          };
        })
      );

      return orders;
    } catch (error) {
      throw new Error("Error getting orders", error);
    }
  },
  getSingleOrder: async ({ id }) => {
    try {
      const SQL = `SELECT * FROM orders WHERE id = $1`;
      const response = await client.query(SQL, [id]);
      const order = response.rows[0];
      const orderItems = await orderItemsQuery.getOrderItems(id);
      const user = await getUser(order.user_id);
      const products = await Promise.all(
        orderItems.map(async (item) => {
          return await getProduct(item.product_id);
        })
      );
      return {
        id: order.id,
        date: order.order_date,
        status: order.status,
        total_price: order.total_price,
        user,
        orderItems: products.map((product, index) => ({
          ...product,
          quantity: orderItems[index].quantity,
        })),
      };
    } catch (error) {
      throw new Error("Error getting order", error);
    }
  },
  createOrder: async ({ user_id, cart }) => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    try {
      const SQL = `INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *`;
      const response = await client.query(SQL, [user_id, totalPrice]);
      const order_id = response.rows[0].id;
      const orderItems = await Promise.all(
        cart.map(async (item) => {
          const orderItem = await orderItemsQuery.createOrderItem(
            order_id,
            item.id,
            item.quantity,
            item.price
          );
          // update quantity of product
          await client.query(
            `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
            [item.quantity, item.id]
          );
          return orderItem;
        })
      );
      await client.query(`DELETE FROM carts WHERE user_id = $1`, [user_id]);
      return { ...response.rows[0], orderItems };
    } catch (error) {
      throw new Error("Error creating order", error);
    }
  },
  deleteOrder: async ({ id }) => {
    try {
      const SQL = `DELETE FROM orders WHERE id = $1`;
      const response = await client.query(SQL, [id]);
      return response.rows[0];
    } catch (error) {
      throw new Error("Error deleting order", error);
    }
  },
};

// <--- Routes --->
// Base route /api/orders
// Get all orders

// ORDERS
router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await ordersQuery.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const order = await ordersQuery.getSingleOrder(req.params);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new order
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const order = await ordersQuery.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete an order
router.delete("/delete", isAdmin, async (req, res) => {
  try {
    await ordersQuery.deleteOrder(req.body);
    res.status(204).json({ message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ORDER ITEMS
// Create a new order item
//Base route /api/orders
router.get("/:order_id/item", isAdmin, async (req, res) => {
  try {
    const orderItems = await orderItemsQuery.getOrderItems(req.params);
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/:order_id/item", async (req, res) => {
  const { product_id, quantity, price } = req.body;
  const { order_id } = req.params;
  console.log({ product_id, quantity, price, order_id });
  try {
    const orderItem = await orderItemsQuery.createOrderItems(
      order_id,
      product_id,
      quantity,
      price
    );
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

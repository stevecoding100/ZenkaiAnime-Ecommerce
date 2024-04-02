const express = require("express");
const router = express.Router();
const { client } = require("../database/db");
const { isLoggedIn } = require("../middlewares/authMiddleware");
// <--- Database Queries --->

const findCartByUserId = async (userId) => {
    const query = "SELECT * FROM carts WHERE user_id = $1";
    const { rows } = await client.query(query, [userId]);

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

const updateCartItem = async (cartId, productId, quantity) => {
    const query =
        "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";
    const { rows } = await client.query(query, [quantity, cartId, productId]);
    const updatedItem = {
        id: productId,
        quantity: rows[0].quantity,
    };

    return updatedItem;
};

const createCart = async (userId) => {
    const query = "INSERT INTO carts (user_id) VALUES ($1) RETURNING *";
    const { rows } = await client.query(query, [userId]);
    return rows[0];
};

const getCartItemByProductId = async (cartId, productId) => {
    const query =
        "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2";
    const { rows } = await client.query(query, [cartId, productId]);
    return rows[0];
};

const addItemToCart = async (cartId, productId, quantity) => {
    const query =
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await client.query(query, [cartId, productId, quantity]);
    return rows[0];
};

const addItemsToCart = async ({ user_id, product_id, quantity }) => {
    try {
        let cart = await findCartByUserId(user_id);

        if (!cart) {
            cart = await createCart(user_id);
        }

        const cartItem = await getCartItemByProductId(cart.id, product_id);

        if (cartItem) {
            const newQuantity = cartItem.quantity + quantity;
            const updatedCartItem = await updateCartItem(
                cart.id,
                product_id,
                newQuantity
            );
            return updatedCartItem;
        } else {
            const newCartItem = await addItemToCart(
                cart.id,
                product_id,
                quantity
            );
            return newCartItem;
        }
    } catch (error) {
        console.error("Error adding items to cart:", error);
        throw error;
    }
};
const getCartItems = async (user_id) => {
    const cart = await findCartByUserId(user_id);

    if (!cart) {
        return [];
    }

    const SQL = `SELECT * FROM cart_items WHERE cart_id = $1`;
    const response = await client.query(SQL, [cart.id]);

    const items = await Promise.all(
        response.rows.map(async (item) => {
            const SQL = `SELECT * FROM products WHERE id = $1`;
            const response = await client.query(SQL, [item.product_id]);
            const product = response.rows[0];
            return {
                id: item.product_id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity: item.quantity,
            };
        })
    );
    return items;
};

const deleteItemFromCart = async (user_id, product_id) => {
    const cart = await findCartByUserId(user_id);

    const item = await getCartItemByProductId(cart.id, product_id);

    try {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            await updateCartItem(cart.id, product_id, newQuantity);
            return;
        } else {
            const SQL = `DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2`;
            await client.query(SQL, [cart.id, product_id]);
            return;
        }
    } catch (error) {
        throw new Error("Error deleting item from cart", error);
    }
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
    try {
        const cart = await getCartItems(req.params.user_id);
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
router.delete("/delete/:product_id/:user_id", isLoggedIn, async (req, res) => {
    try {
        const { product_id, user_id } = req.params;
        await deleteItemFromCart(user_id, product_id);
        res.status(200).json({ message: "Item deleted" });
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

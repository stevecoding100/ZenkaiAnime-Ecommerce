const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { client } = require("../database/db");
const {
  authenticateUser,
  isAdmin,
  isLoggedIn,
} = require("../middlewares/authMiddleware");

// <--- Database Queries --->
const createUser = async ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const SQL = `INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING first_name, last_name, username, email`;
  const response = await client.query(SQL, [
    first_name,
    last_name,
    username,
    email,
    hashedPassword,
  ]);
  return response.rows[0];
};
const getAllUsers = async () => {
  const SQL = `SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

const deleteUser = async (id) => {
  const SQL = `DELETE FROM users WHERE id = $1`;
  await client.query(SQL, [id]);
};

const updateUser = async (
  id,
  { first_name, last_name, username, email, password, billing_info }
) => {
  const SQL = `UPDATE users SET first_name=$1, last_name=$2, username=$3, email=$4, password=$5, billing_info=$6 WHERE id=$7 RETURNING *`;
  const response = await client.query(SQL, [
    first_name,
    last_name,
    username,
    email,
    password,
    billing_info,
    id,
  ]);
  return response.rows[0];
};

// <--- Routes --->
// Base route /api/auth

// Register a new user
router.post("/api/auth/register", async (req, res) => {
  try {
    const user = await createUser(req.body);
    const { token } = await authenticateUser(user.username, req.body.password);
    const userWithToken = { ...user, token };
    res.status(201).json(userWithToken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a user
router.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user information

// <--- ADMIN ONLY ROUTES --->

// Get user information
router.get("/api/auth/users", async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Delete a user
router.delete("/api/auth/delete/:id", isAdmin, async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user
router.put("/api/auth/update/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

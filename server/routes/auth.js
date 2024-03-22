const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { client } = require("../db");
const { authenticateUser, isAdmin } = require("./authMiddleware");

// TODO: Import the createUser function
// TODO: Create authentication routes
// TODO: Create middleware to authenticate users

// <--- Database Queries --->
const createUser = async ({
  first_name,
  last_name,
  username,
  email,
  password,
  billing_info,
}) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const SQL = `INSERT INTO users (first_name, last_name, username, email, password, billing_info) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const response = await client.query(SQL, [
    first_name,
    last_name,
    username,
    email,
    hashedPassword,
    billing_info,
  ]);
  return response.rows[0];
};
const getAllUsers = async () => {
  const SQL = `SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

// <--- Routes --->
// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
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
router.get("/users", isAdmin, async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

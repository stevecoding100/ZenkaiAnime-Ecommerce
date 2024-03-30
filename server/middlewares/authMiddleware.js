require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_CLIENT_SECRET = process.env.JWT_SECRET_CLIENT_KEY;
const JWT_ADMIN_SECRET = process.env.JWT_SECRET_ADMIN_KEY;
const { client } = require("../database/db");

// <-- Database Queries -->
const authenticateUser = async (username, password) => {
  const SQL = `SELECT * FROM users WHERE username=$1`;
  const response = await client.query(SQL, [username]);
  const user = response.rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { user_id: user.id },
    user.is_admin ? JWT_ADMIN_SECRET : JWT_CLIENT_SECRET
  );

  return { token, id: user.id };
};

const findUserByToken = async (token) => {
  try {
    let payload;
    try {
      payload = jwt.verify(token, JWT_CLIENT_SECRET);
    } catch (error) {
      payload = jwt.verify(token, JWT_ADMIN_SECRET);
    }
    const SQL = `SELECT * FROM users WHERE id=$1`;
    const response = await client.query(SQL, [payload.user_id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// <-- Middleware -->
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await findUserByToken(token);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, JWT_ADMIN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized User, Admin Only" });
  }
};

module.exports = { isLoggedIn, authenticateUser, isAdmin };

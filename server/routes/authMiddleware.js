const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_CLIENT_SECRET = process.env.JWT_SECRET_CLIENT_KEY;
const JWT_ADMIN_SECRET = process.env.JWT_SECRET_ADMIN_KEY;
require("dotenv").config();

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
  return { token, user };
};

const findUserByToken = async (token) => {
  try {
    const payload = jwt.verify(token, JWT_CLIENT_SECRET);
    const SQL = `SELECT * FROM users WHERE id=$1`;
    const response = await client.query(SQL, [payload.user_id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = findUserByToken(token);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

e.exports = { isLoggedIn, authenticateUser };

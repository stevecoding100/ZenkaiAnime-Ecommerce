const { findUserByToken } = require("./db");

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

e.exports = { isLoggedIn };

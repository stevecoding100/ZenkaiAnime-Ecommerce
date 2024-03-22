const express = require("express");
const router = express.Router();
const {
  createUser,
  createProduct,
  createCart,
  createCartItems,
  createOrder,
  createOrderItems,
} = require("./database/db");

module.exports = router;

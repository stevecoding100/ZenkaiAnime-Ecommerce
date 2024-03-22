const express = require("express");
const router = express.Router();
const {
  createUser,
  createProduct,
  createCart,
  createCartItems,
  createOrder,
  createOrderItems,
} = require("./db");

module.exports = router;

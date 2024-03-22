require("dotenv").config();
const pg = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_CLIENT_SECRET = process.env.JWT_SECRET_CLIENT_KEY;
const JWT_ADMIN_SECRET = process.env.JWT_SECRET_ADMIN_KEY;

const client = new pg.Client(process.env.DATABASE_URL);

const createTable = async () => {
  const SQL = `
        -- Zenkai DB
        
        DROP TABLE IF EXISTS watchlists;
       
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS cart_items;
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TYPE IF EXISTS watch_status;
        DROP TYPE IF EXISTS order_status;


        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TYPE watch_status AS ENUM ('watching', 'completed', 'on-hold', 'dropped', 'plan-to-watch');
        CREATE TYPE order_status AS ENUM ('pending', 'shipped', 'delivered', 'cancelled');
        -- Table users 
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            billing_info JSON,
            is_admin BOOLEAN DEFAULT FALSE
        );

        -- Anime Service
        CREATE TABLE watchlists (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            anime_name VARCHAR(255), 
            status watch_status DEFAULT 'plan-to-watch',
            progress INT, 
            rating INT
        );

        CREATE TABLE favorites (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE, 
            anime_name VARCHAR(255)
        );

        -- Ecommerce
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name TEXT,
            descriptions TEXT,
            price DECIMAL(10,2),
            stock_quantity INT, 
            image_url VARCHAR(255)
        );

        CREATE TABLE carts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE 
        );

        CREATE TABLE cart_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE CASCADE ,
            quantity INT 
        );

        CREATE TABLE orders (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            total_price DECIMAL,
            order_date DATE DEFAULT CURRENT_DATE,
            status order_status DEFAULT 'pending'
        );

        CREATE TABLE order_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE CASCADE,
            quantity INT,
            price DECIMAL
        );
            `;
  await client.query(SQL);
};

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
  return { token };
};

const addItemsToCart = async (user_id, product_id, quantity) => {
  // Check if user has a cart
  const cart = await client.query(`SELECT * FROM carts WHERE user_id = $1`, [
    user_id,
  ]);

  let cart_id;

  // If user has no cart, create a cart
  if (cart.rows.length === 0) {
    const SQL = `INSERT INTO carts (id) VALUES ($1) RETURNING *`;
    const response = await client.query(SQL, [user_id]);
    cart_id = response.rows[0].id;
  } else {
    cart_id = cart.rows[0].id;
  }

  const SQL = `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [cart_id, product_id, quantity]);
  return response.rows[0];
};

const createOrder = async ({ user_id, total_price, status }) => {
  const SQL = `INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [user_id, total_price, status]);
  return response.rows[0];
};

const createOrderItems = async (order_id, product_id, quantity, price) => {
  const SQL = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`;
  const response = await client.query(SQL, [
    order_id,
    product_id,
    quantity,
    price,
  ]);
  return response.rows[0];
};

// Admin User
const createProduct = async ({
  name,
  descriptions,
  price,
  stock_quantity,
  image_url,
}) => {
  const SQL = `INSERT INTO products (name, descriptions, price, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await client.query(SQL, [
    name,
    descriptions,
    price,
    stock_quantity,
    image_url,
  ]);
  return response.rows[0];
};

module.exports = {
  client,
  createTable,
  createUser,
  createProduct,
  addItemsToCart,
  createOrder,
  createOrderItems,
  authenticateUser,
};

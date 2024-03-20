require("dotenv").config();
const pg = require("pg");
const client =
  new pg.Client(process.env.DATABASE_URL) || "postgres://localhost/zenkai_db";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_CLIENT_SECRET = process.env.JWT_CLIENT_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

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

        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TYPE watch_status_enum AS ENUM ('watching', 'completed', 'on-hold', 'dropped', 'plan-to-watch');
        -- Table users 
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            billing_info JSON,
            is_admin BOOLEAN DEFAULT FALSE
        );

        -- Anime Service
        CREATE TABLE watchlists (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            anime_name VARCHAR(255), 
            status watch_status_enum DEFAULT 'plan-to-watch',
            progress INT, 
            rating INT
        );

        CREATE TABLE favorites (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            anime_name VARCHAR(255)
        );

        -- Ecommerce
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            descriptions TEXT,
            price DECIMAL(10,2),
            stock_quantity INT, 
            image_url VARCHAR(255)
        );

        CREATE TABLE carts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id)
        );

        CREATE TABLE cart_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            cart_id UUID REFERENCES carts(id),
            product_id INT REFERENCES products(id),
            quantity INT 
        );

        CREATE TABLE orders (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            total_price DECIMAL,
            order_date DATE DEFAULT CURRENT_DATE,
            status VARCHAR(50)
        );

        CREATE TABLE order_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES orders(id),
            product_id INT REFERENCES products(id),
            quantity INT,
            price DECIMAL
        );
            `;
  await client.query(SQL);
};

module.exports = { client, createTable };

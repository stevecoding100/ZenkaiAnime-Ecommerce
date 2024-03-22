const pg = require("pg");
require("dotenv").config();
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

module.exports = {
  client,
  createTable,
};

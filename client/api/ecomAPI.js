// const baseURL = import.meta.env.VITE_ECOMMERCE_API_URL;
const baseURL = "http://localhost:3000/api";
import axios from "axios";
const ecomAPI = {
  //AUTH
  auth: {
    register: async (formData) => {
      try {
        const user = await axios.post(`${baseURL}/auth/register`, formData);
        console.log("User registered", user);
        localStorage.setItem("token", user.token);
        localStorage.setItem("userID", user.id);
        return user;
      } catch (error) {
        throw new Error("Error registering user", error);
      }
    },
    login: async (formData) => {
      try {
        const user = await axios.post(`${baseURL}/auth/login`, formData);
        console.log("User logged in", user);
        localStorage.setItem("token", user.data.token);
        localStorage.setItem("userID", user.data.id);
        return user;
      } catch (error) {
        throw new Error("Error logging in user", error);
      }
    },
  },
  //PRODUCTS
  products: {
    getProducts: async () => {
      try {
        const products = await axios.get(`${baseURL}/products`);
        return products;
      } catch (error) {
        throw new Error("Error getting products", error);
      }
    },
    getProductById: async (id) => {
      try {
        const product = await axios.get(`${baseURL}/products/${id}`);
        return product;
      } catch (error) {
        throw new Error("Error getting product", error);
      }
    },
    createProduct: async (formData) => {
      try {
        const product = await axios.post(`${baseURL}/products`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return product;
      } catch (error) {
        throw new Error("Error creating product", error);
      }
    },
    deleteProduct: async (id) => {
      try {
        const product = await axios.delete(`${baseURL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return product;
      } catch (error) {
        throw new Error("Error deleting product", error);
      }
    },
    updateProduct: async (id, formData) => {
      try {
        const product = await axios.put(`${baseURL}/products/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return product;
      } catch (error) {
        throw new Error("Error updating product", error);
      }
    },
  },
  //CART
  cart: {
    getCart: async (user_id) => {
      try {
        const cart = await axios.get(`${baseURL}/cart/add${user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return cart;
      } catch (error) {
        throw new Error("Error getting cart", error);
      }
    },
    addToCart: async (formData) => {
      try {
        const cart = await axios.post(`${baseURL}/cart`, formData);
        return cart;
      } catch (error) {
        throw new Error("Error adding to cart", error);
      }
    },
  },
};

export default ecomAPI;

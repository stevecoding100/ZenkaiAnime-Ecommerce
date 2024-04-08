import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const ecomAPI = {
  //AUTH
  auth: {
    register: async (formData) => {
      try {
        const user = await axios.post(`/api/auth/register`, formData);
        localStorage.setItem("token", user.token);
        localStorage.setItem("userID", user.id);
        return user;
      } catch (error) {
        throw new Error("Error registering user", error);
      }
    },
    login: async (formData) => {
      try {
        const user = await axios.post(`/api/auth/login`, formData);
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
        const products = await axios.get(`/api/products`);
        return products;
      } catch (error) {
        throw new Error("Error getting products", error);
      }
    },
    getProductById: async (id) => {
      try {
        const product = await axios.get(`/api/products/${id}`);
        return product;
      } catch (error) {
        throw new Error("Error getting product", error);
      }
    },
    createProduct: async (formData) => {
      try {
        const product = await axios.post(`/api/products`, formData, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        return product;
      } catch (error) {
        throw new Error("Error creating product", error);
      }
    },
    deleteProduct: async (id) => {
      try {
        const product = await axios.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        return product;
      } catch (error) {
        throw new Error("Error deleting product", error);
      }
    },
    updateProduct: async (id, formData) => {
      try {
        const product = await axios.put(`/api/products/${id}`, formData, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
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
        const cart = await axios.get(`/api/cart/add${user_id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        return cart;
      } catch (error) {
        throw new Error("Error getting cart", error);
      }
    },
    addToCart: async (formData) => {
      try {
        const cart = await axios.post(`/api/cart`, formData);
        return cart;
      } catch (error) {
        throw new Error("Error adding to cart", error);
      }
    },
  },

  //ORDERS
  orders: {
    getOrder: async () => {
      try {
        const orders = await axios.get(`/api/orders`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        return orders;
      } catch (error) {
        throw new Error("Error getting orders", error);
      }
    },
    getOrderById: async (id) => {
      try {
        const order = await axios.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        return order;
      } catch (error) {
        throw new Error("Error getting single order", error);
      }
    },
  },
};

export default ecomAPI;
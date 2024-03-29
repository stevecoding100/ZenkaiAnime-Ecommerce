const baseURL = import.meta.env.VITE_ECOMMERCE_API_URL;
import axios from "axios";
const ecomAPI = {
    //AUTH
    auth: {
        register: async (formData) => {
            try {
                const { user } = await axios.post(
                    `${baseURL}/auth/register`,
                    formData
                );
                localStorage.setItem("token", user.token);
                return user;
            } catch (error) {
                throw new Error("Error registering user", error);
            }
        },
        login: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/login`,
                    formData
                );
                localStorage.setItem("token", user.data.token);
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
        createProduct: async (formData) => {
            try {
                const product = await axios.post(
                    `${baseURL}/products`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                return product;
            } catch (error) {
                throw new Error("Error creating product", error);
            }
        },
        deleteProduct: async (id) => {
            try {
                const product = await axios.delete(
                    `${baseURL}/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                return product;
            } catch (error) {
                throw new Error("Error deleting product", error);
            }
        },
        updateProduct: async (id, formData) => {
            try {
                const product = await axios.put(
                    `${baseURL}/products/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
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
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
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

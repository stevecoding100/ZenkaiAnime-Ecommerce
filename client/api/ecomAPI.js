// const baseURL = import.meta.env.VITE_ECOMMERCE_API_URL;
const baseURL = "http://localhost:3000/api";
import axios from "axios";
const ecomAPI = {
    //AUTH
    auth: {
        register: async (formData) => {
            try {
                const user = await axios.post(
                    `${baseURL}/auth/register`,
                    formData
                );
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
    },
};

export default ecomAPI;

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ShopCategories from "../../components/shop/ShopCategories";
import ShopHeroSection from "../../components/shop/ShopHeroSection";
import ShopMerchCard from "../../components/shop/ShopMerchCard";
import ecomAPI from "../../../api/ecomAPI";
import axios from "axios";
import { useState, useEffect } from "react";
import Cart from "../../components/shop/Cart";

const MerchandiseHomePage = () => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await ecomAPI.products.getProducts();
                setProducts(products.data);
            } catch (err) {
                throw new Error(err.message);
            }
        }
        getProducts();
    }, []);

    const addToCart = async (product_id) => {
        try {
            const quantity = 1;
            const user_id = userID;
            const response = await axios.post(
                "http://localhost:3000/api/cart/add",
                {
                    product_id,
                    quantity,
                    user_id,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            const updatedItem = response.data;

            // Update the cart state based on the previous state
            setCart((prevCart) => {
                // Check if the item already exists in the cart
                const existingItemIndex = prevCart.findIndex(
                    (item) => item.id === updatedItem.id
                );
                if (existingItemIndex !== -1) {
                    // If the item exists, update its quantity
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].quantity += 1;
                    return updatedCart;
                } else {
                    // If the item doesn't exist, add it to the cart
                    const product = products.find(
                        (product) => product.id === product_id
                    );
                    return [...prevCart, { ...product, quantity }];
                }
            });
        } catch (error) {
            console.error("Error adding item to cart", error);
        }
    };

    return (
        <>
            <div className="min-h-screen w-full">
                <Navbar pageType="merchandise" />
                <div className="h-full w-full mt-28">
                    <Cart cart={cart} />
                    <ShopHeroSection productData={products} />
                    <ShopCategories productData={products} />
                    <ShopMerchCard
                        productData={products}
                        addToCart={addToCart}
                    />
                </div>
                <Footer pageType="merchandise" />
            </div>
        </>
    );
};

export default MerchandiseHomePage;

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
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch products
                const productsResponse = await axios.get(
                    "http://localhost:3000/api/products"
                );
                setProducts(productsResponse.data);

                // Fetch cart
                const cartResponse = await axios.get(
                    `http://localhost:3000/api/cart/${userID}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setCart(cartResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [token, userID]);
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

    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        // Clear token state
        setToken(null);
    };
    const decreaseQuantity = async (product_id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/cart/delete/${product_id}/${userID}`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Check if the item exists in the cart
                const existingItem = cart.find(
                    (item) => item.id === product_id
                );
                if (existingItem.quantity > 1) {
                    // If the quantity is greater than 1, decrease it
                    const updatedCart = cart.map((item) => {
                        if (item.id === product_id) {
                            return {
                                ...item,
                                quantity: item.quantity - 1,
                            };
                        }
                        return item;
                    });
                    setCart(updatedCart);
                } else {
                    // If the quantity is 1, remove the item from the cart
                    const updatedCart = cart.filter(
                        (item) => item.id !== product_id
                    );
                    setCart(updatedCart);
                }
            }
        } catch (error) {
            console.error("Error decreasing quantity", error);
        }
    };

    const removeItem = async (product_id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/cart/delete/${product_id}/${userID}`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Remove the item from the cart entirely
                const updatedCart = cart.filter(
                    (item) => item.id !== product_id
                );
                setCart(updatedCart);
            }
        } catch (error) {
            console.error("Error removing item from cart", error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/orders/add",
                {
                    user_id: userID,
                    cart,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            console.log(response.data);
            if (response.status === 201) {
                setCart([]);
            }
        } catch (error) {
            console.error("Error checking out:", error);
        }
    };

    return (
        <>
            <div className="min-h-screen w-full">
                <Navbar
                    pageType="merchandise"
                    token={token}
                    setShowCart={setShowCart}
                    logout={logout}
                />
                <div className="h-full w-full mt-28">
                    {showCart && (
                        <Cart
                            cart={cart}
                            removeItem={removeItem}
                            addToCart={addToCart}
                            handleCheckOut={handleCheckOut}
                            decreaseQuantity={decreaseQuantity}
                            token={token}
                        />
                    )}
                    <ShopHeroSection productData={products} />
                    <ShopCategories productData={products} />
                    <ShopMerchCard
                        productData={products}
                        addToCart={addToCart}
                        removeItem={removeItem}
                    />
                </div>
                <Footer pageType="merchandise" />
            </div>
        </>
    );
};

export default MerchandiseHomePage;

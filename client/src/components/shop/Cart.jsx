import { useEffect, useState } from "react";

const Cart = ({ cart, removeItem, checkOut, addToCart, decreaseQuantity }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total.toFixed(2));
    };

    useEffect(() => {
        // Calculate total price whenever cart changes
        calculateTotalPrice();
    }, [cart]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex flex-col space-y-4 overflow-scroll h-[40vh] p-2">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <img
                                    className="w-16 h-16 object-cover rounded"
                                    src={item.image_url}
                                    alt={item.name}
                                />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">
                                        ${item.price}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                        onClick={() => addToCart(item.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">
                            Total Price: ${totalPrice}
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={checkOut}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;

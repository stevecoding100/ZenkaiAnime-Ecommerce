import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import Navbar from "../../components/Navbar";
const CartDropdown = ({ cart, addToCart, removeItem, checkOut }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Cart</h2>
      </div>
      <div className="px-4 py-2 max-h-64 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 mb-4">
              <img
                className="w-16 h-16 object-cover rounded"
                src={item.image_url}
                alt={item.name}
              />
              <div>
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-700">Price: ${item.price}</p>
                <div className="space-x-6 text-xl">
                  <span onClick={() => removeItem(item.id)}> - </span>
                  <span onClick={() => addToCart(item.id)}> + </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <button
          onClick={checkOut}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
=======

>>>>>>> e7afdfc (add conditional if product already exist in the cart)
const ProductCart = ({ product, addToCart }) => {
  return (
    <div className="flex justify-between items-center border-b-2 p-2">
      <div>
        <h1>{product.name}</h1>
        <img
          className="h-1/2 w-[200px] object-cover"
          src={product.image_url}
          alt={product.name}
        />
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <div>
        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
};

const Test = () => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
<<<<<<< HEAD
  const [filteredProducts, setFilteredProducts] = useState([products]);

  const searchProducts = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filteredProducts);
  };
=======
>>>>>>> e7afdfc (add conditional if product already exist in the cart)

  const getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:3000/api/products");
<<<<<<< HEAD
      const [p1, p2, p3, p4, p5] = products.data;
      setProducts([p1, p2, p3, p4, p5]);
      setFilteredProducts([p1, p2, p3, p4, p5]);
    } catch (error) {
      throw new Error("Error getting products", error);
    }
  };
=======
      const [p1, p2, p3] = products.data;
      setProducts([p1, p2, p3]);
    } catch (error) {
      console.log(error);
    }
  };

>>>>>>> e7afdfc (add conditional if product already exist in the cart)
  const addToCart = async (product_id) => {
    try {
      const quantity = 1;
      const user_id = userID;
<<<<<<< HEAD
      const response = await axios.post(
=======
      const item = await axios.post(
>>>>>>> e7afdfc (add conditional if product already exist in the cart)
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
<<<<<<< HEAD
      const updatedItem = response.data;

      if (updatedItem.quantity === 1) {
        const product = products.find((product) => product.id === product_id);
        setCart([...cart, { ...product, quantity }]);
      } else {
        // Update the cart state with the updated quantity
        const updatedCart = cart.map((item) => {
          if (item.id === updatedItem.id) {
            return {
              ...item,
              quantity: updatedItem.quantity,
            };
          }
          return item;
        });
        setCart(updatedCart);
      }
    } catch (error) {
      throw new Error("Error adding item to cart", error);
    }
  };

  const getCart = async () => {
    try {
      const cart = await axios.get(`http://localhost:3000/api/cart/${userID}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setCart(cart.data);
    } catch (error) {
      throw new Error("Error getting cart", error);
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
        const findItem = cart.find((item) => item.id === product_id);

        if (findItem.quantity > 1) {
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
          const updatedCart = cart.filter((item) => item.id !== product_id);
          setCart(updatedCart);
        }
      }
    } catch (error) {
      throw new Error("Error removing item from cart", error);
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
      throw new Error("Error checking out", error);
=======
      console.log(item);
    } catch (error) {
      console.log(error);
>>>>>>> e7afdfc (add conditional if product already exist in the cart)
    }
  };

  useEffect(() => {
    getProducts();
<<<<<<< HEAD
    getCart();
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar searchProducts={searchProducts} />
      <h1>Products</h1>
      <CartDropdown
        checkOut={handleCheckOut}
        removeItem={removeItem}
        addToCart={addToCart}
        cart={cart}
      />
      {filteredProducts.map((product) => (
=======
  }, []);
  return (
    <div className="container mx-auto">
      <h1>Products</h1>
      {products.map((product) => (
>>>>>>> e7afdfc (add conditional if product already exist in the cart)
        <ProductCart key={product.id} addToCart={addToCart} product={product} />
      ))}
    </div>
  );
};

export default Test;

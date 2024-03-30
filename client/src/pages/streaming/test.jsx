import axios from "axios";
import { useEffect, useState } from "react";

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

  const getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:3000/api/products");
      const [p1, p2, p3] = products.data;
      setProducts([p1, p2, p3]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product_id) => {
    try {
      const quantity = 1;
      const user_id = userID;
      const item = await axios.post(
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
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="container mx-auto">
      <h1>Products</h1>
      {products.map((product) => (
        <ProductCart key={product.id} addToCart={addToCart} product={product} />
      ))}
    </div>
  );
};

export default Test;

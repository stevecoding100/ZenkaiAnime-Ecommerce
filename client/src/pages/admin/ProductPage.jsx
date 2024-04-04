import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const ProductPage = () => {
  const [product, setProduct] = useState({});// [1
  const { id } = useParams();

    useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await ecomAPI.products.getProduct(id);
        setProduct(product.data);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };

  return <div>ProductPage{id}</div>;
};

export default ProductPage;

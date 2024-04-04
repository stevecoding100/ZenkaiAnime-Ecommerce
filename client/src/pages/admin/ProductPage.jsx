import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ecomAPI from "../../../api/ecomAPI";
import { Image } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/react";
import { MdSystemUpdateAlt, MdDeleteOutline } from "react-icons/md";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState();
  const [productImage, setProductImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await ecomAPI.products.getProductById(id);
        console.log("Product", product);
        setProductImage(product.data.image_url);
        setProductName(product.data.name);
        setProduct(product.data);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const onSubmit = async (id) => {
    const result = await ecomAPI.products.updateProduct(id, product);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "name") {
      setProductName(value);
    }

    if (name === "image_url") {
      setProductImage(value);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <h1 className="text-center text-2xl mb-4">{productName}</h1>
      <div className="flex flex-col items-center gap-8">
        <Image
          name="image_url"
          src={productImage}
          alt={product.name}
          fallbackSrc="https://via.placeholder.com/350"
          width={350}
          height={350}
        />
        <Input
          className="w-96"
          name="image_url"
          onChange={onChange}
          label="Image URL"
          value={product.image_url}
        />

        <Input
          name="name"
          onChange={onChange}
          label="Name"
          value={product.name}
          size="lg"
          className="w-96 mt-"
        />
        <Input
          name="stock_quantity"
          onChange={onChange}
          type="number"
          label="Stock"
          placeholder={product.stock_quantity}
          value={product.stock_quantity || ""}
          labelPlacement="outside"
          className="w-96"
        />
        <Input
          name="price"
          onChange={onChange}
          type="number"
          label="Price"
          placeholder={product.price}
          value={product.price || ""}
          labelPlacement="outside"
          className="w-96"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />

        <Textarea
          name="descriptions"
          label="Description"
          labelPlacement="outside"
          placeholder={product.descriptions}
          value={product.descriptions || ""}
          className="w-96 mb-4"
          onChange={onChange}
          size="lg"
        />
        <div className="mt-4">
          <div className="flex items-center space-x-1">
            <MdSystemUpdateAlt className="text-yellow-600" />
            <button onClick={() => onSubmit(id)}>Update Product</button>
            <MdDeleteOutline className="text-red-600" />
            <button>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

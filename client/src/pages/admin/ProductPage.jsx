import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/react";
import { MdSystemUpdateAlt, MdDeleteOutline } from "react-icons/md";
import ecomAPI from "../../../utils/ecomAPI";
const ProductsPage = () => {
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
    <div className="container mx-auto mt-20  py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{productName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image
            isZoomed
            isBlurred
            name="image_url"
            src={productImage}
            alt={product.name}
            fallbackSrc="https://via.placeholder.com/350"
            width={350}
            height={350}
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-10">
          <Input
            className="w-full"
            name="image_url"
            onChange={onChange}
            label="Image URL"
            value={product.image_url}
            bordered
            color="default"
          />
          <Input
            name="name"
            onChange={onChange}
            label="Name"
            value={product.name}
            size="lg"
            className="w-full"
            bordered
            color="default"
          />
          <Textarea
            name="descriptions"
            label="Description"
            labelPlacement="inside"
            placeholder={product.descriptions}
            value={product.descriptions || ""}
            className="w-full"
            onChange={onChange}
            size="lg"
            bordered
            color="default"
          />
          <Input
            name="stock_quantity"
            onChange={onChange}
            type="number"
            label="Stock"
            placeholder={product.stock_quantity}
            value={product.stock_quantity || ""}
            labelPlacement="outside-left"
            className="w-full"
            bordered
            color="default"
          />
          <Input
            name="price"
            onChange={onChange}
            type="number"
            label="Price"
            placeholder={product.price}
            value={product.price || ""}
            labelPlacement="outside-left"
            className="w-full"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-gray-400 text-sm">$</span>
              </div>
            }
            bordered
            color="default"
          />

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onSubmit(id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <MdSystemUpdateAlt className="text-xl mr-2" />
                Update Product
              </div>
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              <div className="flex items-center">
                <MdDeleteOutline className="text-xl mr-2" />
                Delete Product
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

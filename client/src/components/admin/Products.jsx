import React from "react";
import { useState, useEffect } from "react";
import ecomAPI from "../../../api/ecomAPI";
import { Image, Pagination } from "@nextui-org/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ecomAPI.products.getProducts();
        setProducts(products.data);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-20 bg-white shadow-lg rounded-lg p-6">
      <div className="">
        <table className="w-full h-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={50}
                        height={50}
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">${product.price}</td>
                <td className="py-3 px-6 text-left">
                  {product.stock_quantity}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link
                      to={`${product.id}`}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <MdOutlineModeEdit className="text-xl" />
                    </Link>
                    <Link className="text-red-500 hover:text-red-600">
                      <MdOutlineDeleteOutline className="text-xl" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          total={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={onPageChange}
          size="lg"
          rounded
          color="primary"
        />
      </div>
    </div>
  );
};

export default Products;

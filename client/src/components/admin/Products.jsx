import React from "react";
import { useState, useEffect } from "react";
import ecomAPI from "../../../api/ecomAPI";
import { Image, Pagination } from "@nextui-org/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

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
    <div className="shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={75}
                  height={75}
                />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.stock_quantity}</td>
              <td className="px-6 py-4 text-right">
                <button className=" text-blue-600 dark:text-blue-500 mr-2">
                  <MdOutlineModeEdit className="text-2xl" />
                </button>
                <button className=" text-red-600 dark:text-red-500">
                  <MdOutlineDeleteOutline className="text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          total={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Products;

import React from "react";
import { useState, useEffect } from "react";
import ecomAPI from "../../../api/ecomAPI";
import { Image, Pagination } from "@nextui-org/react";

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
    <div>
      <div className="max-h-[500px]">
        <table className="w-full border border-slate-400 table-auto">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={75}
                    height={75}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock_quantity}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

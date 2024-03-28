import { eCommerceRoutes } from "../../api/eCommerceRoute";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import MerchandiseCard from "../components/MerchandiseCard";
import Carousel from "../components/Carousel";
const MerchandiseHomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(eCommerceRoutes.getMerchandise());
        const [d1, d2, d3, d4] = await response.json();
        setProducts([d1, d2, d3, d4]);
      } catch (error) {
        console.error("Error fetching products!", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar pageType="merchandise" />
      <div className="max-w">
        <Carousel products={products} />
      </div>
      <div className="grid grid-cols-4 container min-w-full">
        {products.map((product) => (
          <MerchandiseCard key={product.id} merchandise={product} />
        ))}
        {/* <Footer pageType="merchandise" /> */}
      </div>
    </>
  );
};

export default MerchandiseHomePage;

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ShopCategories from "../../components/shop/ShopCategories";
import ShopHeroSection from "../../components/shop/ShopHeroSection";
import ShopMerchCard from "../../components/shop/ShopMerchCard";
<<<<<<< HEAD
import ecomAPI from "../../../api/ecomAPI";

import { useState, useEffect } from "react";

const MerchandiseHomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await ecomAPI.products.getProducts();
                console.log("Line 23 Data: ", products);
                setProducts(products.data);
            } catch (err) {
                throw new Error(err.message);
            }
        }
        getProducts();
    }, []);

    return (
        <>
            <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
                <Navbar pageType="merchandise" />
                <div className="h-full w-full mt-28">
                    <ShopHeroSection productData={products} />
                    <ShopCategories productData={products} />
                    <ShopMerchCard productData={products} />
                </div>
                <Footer pageType="merchandise" />
            </div>
        </>
    );
=======

const MerchandiseHomePage = () => {
  return (
    <>
      <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
        <Navbar pageType="merchandise" />
        <div className="h-full w-full mt-28">
          <ShopHeroSection />
          <ShopCategories />
          <ShopMerchCard />
        </div>
        <Footer pageType="merchandise" />
      </div>
    </>
  );
>>>>>>> 76e3204 (deleted unused file)
};

export default MerchandiseHomePage;

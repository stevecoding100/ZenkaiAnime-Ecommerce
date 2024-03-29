import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ShopCategories from "../../components/shop/ShopCategories";
import ShopHeroSection from "../../components/shop/ShopHeroSection";
import ShopMerchCard from "../../components/shop/ShopMerchCard";

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
};

export default MerchandiseHomePage;

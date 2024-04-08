import Navbar from "../../components/Navbar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeRow from "../../components/streaming/AnimeRow.jsx";
import FeaturedAnime from "../../components/streaming/FeaturedAnime.jsx";
import Footer from "../../components/Footer.jsx";
import AnimeCards from "../../components/streaming/AnimeCards.jsx";
import apiRoutes from "../../../utils/apiRoutes.jsx";
import { useNavigate } from "react-router-dom";

const StreamingHomePage = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popularList, setPopularList] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logout");
    // Remove token from localStorage
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularList = await axios.get(apiRoutes.getPopularAnime());
        const trendingList = await axios.get(apiRoutes.getTrendingAnime());
        setPopularList(popularList.data.results);
        setTrendingList(trendingList.data.results);
        setIsLoading(false);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen w-full">
      <Navbar pageType="streaming" token={token} logout={logout} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FeaturedAnime data={trendingList} />
          <AnimeRow rowID="1" title="Trending" data={trendingList} />
          <AnimeCards title="Popular" data={popularList} />
        </>
      )}
      <Footer pageType="streaming" />
    </div>
  );
};

export default StreamingHomePage;

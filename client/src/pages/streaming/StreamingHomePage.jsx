import Navbar from "../../components/Navbar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeRow from "../../components/streaming/AnimeRow.jsx";
import FeaturedAnime from "../../components/streaming/FeaturedAnime.jsx";
import Footer from "../../components/Footer.jsx";
import AnimeCards from "../../components/streaming/AnimeCards.jsx";
import apiRoutes from "../../../api/apiRoutes.jsx";
import useAnimeStore from "../../../store/store.jsx";

const StreamingHomePage = () => {
  const { addAnimeList, animeList } = useAnimeStore();
  const [trendingList, setTrendingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnimeList() {
      try {
        const { data } = await axios.get(apiRoutes.getTrendingAnime(), {
          proxy: apiRoutes.proxyConfig,
        });
        console.log("Line 22 Data: ", data.results);
        setTrendingList(data.results);
        setIsLoading(false);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getAnimeList();
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen w-full p-2">
      <Navbar pageType="streaming" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FeaturedAnime data={trendingList} />
          <AnimeRow rowID="1" title="Popular" data={trendingList} />
          <AnimeCards title="Recent Episodes" data={trendingList} />
        </>
      )}
      <Footer pageType="streaming" />
    </div>
  );
};

export default StreamingHomePage;

import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeRow from "../components/AnimeRow";
import FeaturedAnime from "../components/FeaturedAnime";
import Footer from "../components/Footer";
import AnimeCards from "../components/AnimeCards";
import apiRoutes from "../../api/apiRoutes";

const StreamingHomePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnimeList() {
      try {
        const { data } = await axios.get(apiRoutes.getTrendingAnime());
        console.log(data);
        setAnimeList(data.results);
        setIsLoading(false);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getAnimeList();
  }, []);

  // console.log(animeList);

  return (
    <div className="bg-[#000000] min-h-screen w-full p-2">
      <Navbar pageType="streaming" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FeaturedAnime data={animeList} />
          <AnimeRow rowID="1" title="Popular" data={animeList} />
          <AnimeCards title="Recent Episodes" data={animeList} />
        </>
      )}
      <Footer pageType="streaming" />
    </div>
  );
};

export default StreamingHomePage;

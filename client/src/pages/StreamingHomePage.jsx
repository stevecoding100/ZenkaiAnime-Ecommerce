import CarouselSlider from "../components/CarouselSlider";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
AnimeCard;
const StreamingHomePage = () => {
  const url = "https://zenkai-api.vercel.app/anime/gogoanime/top-airing";
  const [animeList, setAnimeList] = useState([]);

  const getAnimeList = async () => {
    try {
      const { data } = await axios.get(url, { params: { page: 1 } });
      setAnimeList(data.results);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen w-full">
      <Navbar pageType="streaming" />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Anime List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {console.log(animeList)}
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamingHomePage;

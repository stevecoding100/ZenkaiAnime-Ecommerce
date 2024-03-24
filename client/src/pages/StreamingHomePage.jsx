import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeRow from "../components/AnimeRow";
import FeaturedAnime from "../components/FeaturedAnime";

const StreamingHomePage = () => {
    const url = "https://zenkai-api.vercel.app/anime/gogoanime/top-airing";
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        async function getAnimeList() {
            try {
                const { data } = await axios.get(url, { params: { page: 1 } });
                setAnimeList(data.results);
            } catch (err) {
                throw new Error(err.message);
            }
        }
        getAnimeList();
    }, []);

    // console.log(animeList);

    return (
        <div className="bg-[#000000] min-h-screen w-full">
            <Navbar pageType="streaming" />
            <FeaturedAnime data={animeList} />
            <AnimeRow title="Upcoming" />
            <AnimeRow title="Popular" />
            <AnimeRow title="Trending" />
            <AnimeRow title="Favorite" />
        </div>
    );
};

export default StreamingHomePage;

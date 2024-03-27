import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

import EpisodeCard from "../components/EpisodeCard";

const AnimeDetailsPage = () => {
    const [animeDetails, setAnimeDetails] = useState({});
    const [streamingLinks, setStreamingLinks] = useState([]);
    const { animeId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAnimeDetails() {
            try {
                const { data } = await axios.get(
                    `https://zenkai-api.vercel.app/anime/gogoanime/info/${animeId}`
                );
                console.log("Anime Details", data);
                setAnimeDetails(data);
                setStreamingLinks(data.episodes);
                setLoading(false);
            } catch (error) {
                throw new Error(error.message);
            }
        }
        getAnimeDetails();
    }, []);

    return (
        <div className="bg-black w-full min-h-screen p-2">
            <Navbar pageType="streaming" />
            {loading ? (
                <div className="container mx-auto min-h-screen flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div>Hello World!</div>
            )}
        </div>
    );
};
export default AnimeDetailsPage;

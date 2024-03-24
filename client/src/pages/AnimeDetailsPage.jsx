import { useParams, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import VideoPlayer from "../components/VideoPlayer";
import EpisodeCard from "../components/EpisodeCard";

const AnimeDetailsPage = () => {
  const [animeDetails, setAnimeDetails] = useState({});
  const [streamingLinks, setStreamingLinks] = useState([]); // [1
  const { animeId } = useParams();
  const [loading, setLoading] = useState(true);

  const getAnimeDetails = async () => {
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
  };

  useEffect(() => {
    getAnimeDetails();
  }, []);

  return (
    <div>
      <Navbar pageType="streaming" />
      {loading ? (
        <div className="container mx-auto min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="container mx-auto min-h-screen mt-20">
          <div className="flex flex-row-reverse">
            {/*Recommendation Column */}
            <div className="border border-gray-300">
              <h1>Recommendation</h1>
            </div>
            {/* Anime Descriptions Column */}
            <div className="flex flex-col ml-6">
              <h1 className="text-4xl mb-4">{animeDetails.id}</h1>

              <div className="flex flex-row">
                {animeDetails.genres.map((genre) => (
                  <div
                    key={genre}
                    className="mb-2 mr-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    {genre}
                  </div>
                ))}
              </div>
              <p className="text-xl mt-3">{animeDetails.description}</p>
              <div className="mt-7 max-w-full grid grid-cols-5 gap-4 overflow-y-auto max-h-[600px]">
                {streamingLinks.map((episode) => (
                  <EpisodeCard
                    className
                    key={episode.number}
                    animeId={animeId}
                    episode={episode}
                  />
                ))}
              </div>
            </div>
            {/* Anime Images and descriptions */}
            <div className="min-w-max">
              <img
                className="rounded-lg"
                src={animeDetails.image}
                alt={animeDetails.id}
              />
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center  w-full my-4">
                Write a Review
              </button>

              <div className="anime-info flex flex-col justify-center text-center divide-y divide-y-2 rounded-md divide-zinc-400 px-10 bg-gray-200 text-gray-700">
                <div className="py-2">
                  <h2 className="text-xl">Season</h2>
                  <p>{animeDetails.type}</p>
                </div>
                <div className="py-">
                  <h2 className="text-xl">Released</h2>
                  <p>{animeDetails.releaseDate}</p>
                </div>
                <div className="py-">
                  <h2 className="text-xl">Status</h2>
                  <p>{animeDetails.status}</p>
                </div>
                <div className="py-">
                  <h2 className="text-xl">Total Episodes</h2>
                  <p>{animeDetails.totalEpisodes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AnimeDetailsPage;

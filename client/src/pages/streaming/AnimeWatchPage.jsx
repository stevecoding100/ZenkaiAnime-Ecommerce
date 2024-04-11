import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAnimeStore from "../../../store/store";
import axios from "axios";
import apiRoutes from "../../../utils/apiRoutes";
import VideoPlayer from "../../components/streaming/VideoPlayer";
import { AiFillLike } from "react-icons/ai";
import { BsCollectionFill } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import Navbar from "../../components/Navbar";

const AnimeWatchPage = () => {
  const { animeId, episodeId } = useParams();
  const { currentAnime } = useAnimeStore();
  const [anime, setAnime] = useState({});
  const [episodes, setEpisodes] = useState({});
  const [nextEpisode, setNextEpisode] = useState();
  const [lastEpisode, setLastEpisode] = useState();
  const [currentEpisode, setCurrentEpisode] = useState();

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const episodesHandler = (episodes, cEpisode) => {
    const cIdx = episodes.indexOf(cEpisode);
    setCurrentEpisode(cEpisode);
    setLastEpisode(episodes[cIdx - 1]);
    setNextEpisode(episodes[cIdx + 1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anime = await axios.get(apiRoutes.getAnimeInfo(animeId));
        console.log(anime);
        setAnime(anime.data);
        setEpisodes(anime.data.episodes);

        const cEpisode = anime.data.episodes.find((e) => e.id === episodeId);

        episodesHandler(anime.data.episodes, cEpisode);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    if (!currentAnime || Object.keys(currentAnime).length === 0) {
      fetchData();
    } else {
      setAnime(currentAnime);
      setEpisodes(currentAnime.episodes);
      const cEpisode = currentAnime.episodes.find((e) => e.id === episodeId);
      episodesHandler(currentAnime.episodes, cEpisode);
    }
  }, [animeId, episodeId, currentAnime]);

  return (
    <>
      <section className="flex flex-col min-h-screen w-screen bg-black">
        <Navbar pageType="streaming" />
        {Object.keys(anime).length === 0 ? (
          <div className="container mx-auto min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/4">
                <VideoPlayer episodeId={episodeId} />
                <div className="flex flex-col md:flex-row justify-between mx-4 mt-4">
                  {lastEpisode && (
                    <Link
                      to={`/series/${animeId}/watch/${lastEpisode.id}`}
                      className="flex items-center justify-center mb-2 md:mb-0 md:mr-2 px-3 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700"
                    >
                      <GrFormPreviousLink className="inline-block text-xl mr-1" />
                      <span>Prev: Episode {lastEpisode.number}</span>
                    </Link>
                  )}
                  <button className="flex items-center justify-center mb-2 md:mb-0 md:mr-2 px-3 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700">
                    <FaBookmark className="inline-block text-xl mr-1" />
                    <span>Bookmark</span>
                  </button>
                  <Link
                    to={`/series/${animeId}`}
                    className="flex items-center justify-center mb-2 md:mb-0 md:mr-2 px-3 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700"
                  >
                    View Details
                  </Link>
                  {nextEpisode && (
                    <Link
                      to={`/series/${animeId}/watch/${nextEpisode.id}`}
                      className="flex items-center justify-center px-3 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700"
                    >
                      <span>Next: Episode {nextEpisode.number}</span>
                      <GrFormNextLink className="inline-block text-xl ml-1" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 h-screen overflow-x-hidden scrollbarY mr-4">
                <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-2 text-slate-400">
                  {episodes.map((episode) => (
                    <Link
                      to={`/series/${animeId}/watch/${episode.id}`}
                      key={episode.id}
                      className="rounded-md bg-slate-800 p-2 hover:bg-slate-700 text-center"
                    >
                      {episode.number}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black">
              <div className="flex flex-col md:flex-row">
                {/* Anime Details */}
                <div className="w-full md:w-3/4 p-4 md:p-8">
                  <div className="flex flex-col md:flex-row items-center bg-slate-800 py-6 md:py-10 rounded-xl text-white">
                    <div className="w-full md:w-1/3 lg:w-[250px] mb-4 md:mb-0 md:mr-8">
                      <img
                        className="object-cover w-full h-auto rounded-lg"
                        src={anime.image}
                        alt={
                          anime.title?.userPreferred ||
                          anime.title?.english ||
                          anime.title?.romanji ||
                          anime.title?.native
                        }
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h1 className="text-2xl md:text-4xl font-bold mb-2">
                        <span className="text-orange-400">Episode</span>{" "}
                        {currentEpisode.number}
                      </h1>
                      <div className="text-slate-200">
                        <p className="text-sm md:text-lg mb-2">
                          {anime.releaseDate}
                        </p>
                        <h2 className="text-xl md:text-3xl font-semibold mb-2 md:mb-4">
                          {anime.title?.userPreferred ||
                            anime.title?.english ||
                            anime.title?.romanji ||
                            anime.title?.native}
                        </h2>
                        <p
                          className="text-sm md:text-lg"
                          dangerouslySetInnerHTML={{
                            __html: truncateString(anime.description, 500),
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Recommendation */}
                <div className="w-full md:w-1/4 mb-10">
                  <h1 className="text-xl md:text-3xl font-bold text-center text-gray-50 mb-4">
                    <IoIosRocket className="text-3xl md:text-5xl inline-block text-gray-50 mr-2" />
                    Recommended Anime
                  </h1>
                  {anime.recommendations && (
                    <div className="space-y-4 bg-black">
                      {anime.recommendations.map((recommendation, idx) => (
                        <Link
                          to={`/series/${recommendation.id}`}
                          key={recommendation.id}
                          className="flex items-center space-x-2 md:space-x-4 bg-slate-800 p-2 md:p-4 rounded-md"
                        >
                          <p className="w-6 md:w-8 text-center text-slate-200 rounded-md border border-slate-400 p-1 mr-2 md:mr-4">
                            {idx + 1}
                          </p>
                          <div className="w-1/4">
                            <img
                              src={recommendation.image}
                              alt={recommendation.title.userPreferred}
                              className="rounded-md object-cover w-full h-auto"
                            />
                          </div>
                          <div className="text-slate-400 flex-grow ml-2 md:ml-4">
                            <p className="text-sm md:text-xl text-slate-300 truncate">
                              {recommendation.title.userPreferred}
                            </p>
                            <div className="text-xs md:text-md text-pretty mt-1 md:mt-2">
                              <p className="text-orange-200">
                                <AiFillLike className="inline-block mr-1" />
                                Rating {recommendation.rating}
                              </p>
                              <p className="text-slate-400">
                                <BsCollectionFill className="inline-block mr-1" />
                                Episodes <span>{recommendation.episodes}</span>
                              </p>
                              <p>{recommendation.status}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* <Footer pageType="streaming" /> */}
      </section>
    </>
  );
};

export default AnimeWatchPage;

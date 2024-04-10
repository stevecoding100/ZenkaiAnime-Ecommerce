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
      <section className="flex flex-col min-h-screen w-screen bg-black ">
        <Navbar pageType="streaming" />
        {Object.keys(anime).length === 0 ? (
          <Spinner />
        ) : (
          <>
            <div className="flex h-screen flex-col">
              <div className="flex">
                <div className="w-screen">
                  <VideoPlayer episodeId={episodeId} />
                  <div className="flex flex-row text-slate-300 justify-between w-1/2 mx-auto mt-4">
                    {lastEpisode && (
                      <Link
                        to={`/series/${animeId}/watch/${lastEpisode.id}`}
                        className="border border-slate-400 rounded-xl px-3 py-3 text-slate-300"
                      >
                        <GrFormPreviousLink className="inline-block text-xl mr-1" />
                        <span className="text-sm text-slate-500 mr-1">
                          Prev:
                        </span>{" "}
                        Episode {lastEpisode.number}
                      </Link>
                    )}
                    <button className="border border-slate-400 rounded-xl px-3 py-3">
                      <FaBookmark className="inline-block text-xl mr-1" />
                      Bookmark
                    </button>
                    <button className="border border-slate-400 rounded-xl px-3 py-3">
                      View Details
                    </button>
                    {nextEpisode && (
                      <Link
                        to={`/series/${animeId}/watch/${nextEpisode.id}`}
                        className="border border-slate-400 rounded-xl px-3 py-3 text-slate-300"
                      >
                        <span className="text-sm text-slate-500 mr-1">
                          Next:
                        </span>{" "}
                        Episode {nextEpisode.number}
                        <GrFormNextLink className="inline-block text-xl" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 h-screen overflow-x-hidden scrollbarY mr-10">
                  <div className="grid grid-cols-4 gap-2 text-slate-400">
                    {episodes.map((episode) => (
                      <button
                        key={episode.id}
                        className="rounded-md bg-slate-800 p-2 hover:bg-slate-700"
                      >
                        {episode.number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-black">
                <div className="flex flex-col md:flex-row bg-black mt-4 ">
                  {/* Anime Details */}
                  <div className="md:w-3/4 p-8">
                    <div className="flex flex-col md:flex-row items-center justify-center bg-slate-800 py-10 rounded-xl text-white">
                      <div className="md:w-1/3 lg:w-[250px] mb-8 md:mb-0 md:mr-8">
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
                      <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">
                          <span className="text-orange-400">Episode</span>{" "}
                          {currentEpisode.number}
                        </h1>
                        <div className="text-slate-200">
                          <p className="text-lg mb-2">{anime.releaseDate}</p>
                          <h2 className="text-3xl font-semibold mb-4">
                            {anime.title?.userPreferred ||
                              anime.title?.english ||
                              anime.title?.romanji ||
                              anime.title?.native}
                          </h2>
                          <p
                            className="text-lg"
                            dangerouslySetInnerHTML={{
                              __html: truncateString(anime.description, 500),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Recommendation */}
                  <div className="scrollbarY h-screen md:w-1/4 mb-10">
                    <h1 className="text-3xl font-bold text-center text-gray-50 mb-4">
                      <IoIosRocket className="text-5xl inline-block text-gray-50 mr-2" />
                      Recommended Anime Series
                    </h1>
                    {anime.recommendations && (
                      <div className="space-y-4 bg-black">
                        {anime.recommendations.map((recommendation, idx) => (
                          <Link
                            to={`/series/${recommendation.id}`}
                            key={recommendation.id}
                            className="flex items-center space-x-4 bg-slate-800 p-4 rounded-md"
                          >
                            <p className="w-8 text-center text-slate-200 rounded-md border border-slate-400 p-1 mr-4">
                              {idx + 1}
                            </p>
                            <div className="w-1/4 ">
                              <img
                                src={recommendation.image}
                                alt={recommendation.title.userPreferred}
                                className="rounded-md object-cover w-full h-auto"
                              />
                            </div>
                            <div className="text-slate-400 flex-grow ml-4">
                              <p className="text-xl text-slate-300 truncate">
                                {recommendation.title.userPreferred}
                              </p>
                              <div className="text-md text-pretty mt-2">
                                <p className="text-orange-200">
                                  <AiFillLike className="inline-block mr-1" />
                                  Rating {recommendation.rating}
                                </p>
                                <p className="text-slate-400">
                                  <BsCollectionFill className="inline-block mr-1" />
                                  Episodes{" "}
                                  <span>{recommendation.episodes}</span>
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
            </div>
          </>
        )}
        {/* <Footer pageType="streaming" /> */}
      </section>
    </>
  );
};

export default AnimeWatchPage;

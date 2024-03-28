import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import EpisodeCard from "../components/EpisodeCard";
import AnimeRow from "../components/AnimeRow";
import Footer from "../components/Footer";
import apiRoutes from "../../api/apiRoutes.jsx";
import useAnimeStore from "../../store/store";
const AnimeDetailsPage = () => {
  const { addAnimeList, animeList } = useAnimeStore();
  const [animeDetails, setAnimeDetails] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [like, setLike] = useState(false);
  const { animeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [recommendationList, setRecommendationList] = useState([]);

  const getAnimeDetails = async () => {
    try {
      const { data } = await axios.get(apiRoutes.getAnimeInfo(animeId), {});
      setAnimeDetails(data);
      setEpisodeList(data.episodes);
      addAnimeList(data); // Pass the data object to addAnimeList
      setRecommendationList(data.recommendations);
      setLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    const animeData = animeList.find((anime) => anime.id === animeId);
    console.log("animeList", animeList);

    if (animeData) {
      setAnimeDetails(animeData);
      setEpisodeList(animeData.episodes);
      setRecommendationList(animeData.recommendations);
      setLoading(false);
    } else {
      getAnimeDetails();
    }
  }, [animeId, animeList]);
  return (
    <div className="bg-black w-full min-h-screen pt-4">
      <div>
        <Navbar pageType="streaming" />
      </div>
      <div>
        {loading ? (
          <div className="container mx-auto min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="text-white pt-[12rem] md:pt-[8rem] flex flex-col w-full h-full">
            <div className="lg:flex lg:items-center lg:w-full">
              <div className="relative w-full h-full">
                <img
                  src={animeDetails.image}
                  alt={animeDetails.id}
                  className="w-[260px] md:w-[420px] h-auto mx-auto lg:mx-16 rounded-md m-10"
                />
                <Link to="/">
                  <div className="absolute -top-10 lg:top-0 right-6 md:right-28 lg:right-12">
                    <IoIosCloseCircleOutline size={34} />
                  </div>
                </Link>
              </div>

              <div className="w-[80%] lg:w-full text-center mx-auto lg:text-start">
                <h1 className="text-2xl md:text-4xl mb-4 m-2">
                  {animeDetails.title.english}
                </h1>
                <h4
                  className="text-sm md:text-lg text-slate-400 mb-4 md:mb-8 leading-6 m-1"
                  dangerouslySetInnerHTML={{
                    __html: animeDetails.description,
                  }}
                ></h4>
                <div className="flex items-center justify-around mb-4  md:mb-10  w-[100%] md:w-[65%] lg:mx-0 mx-auto">
                  <span className="text-sm md:text-lg ">Genres:</span>
                  {animeDetails.genres.map((genre) => (
                    <p
                      key={genre}
                      className="text-blue-400 text-[.70rem] md:text-[1rem] lg:text-[1.2rem]"
                    >
                      {genre}
                    </p>
                  ))}
                </div>
                <div className="mt-6 mb-6">
                  <ul className="text-[.80rem] flex justify-around w-[85%] md:w-[65%] md:pr-[6rem] mx-auto lg:mx-0 md:text-[1rem] lg:text-[1.2rem]">
                    <li>
                      Season:{" "}
                      <span className=" text-orange-400">
                        {animeDetails.type}
                      </span>
                    </li>
                    <li>
                      Released:{" "}
                      <span className=" text-orange-400">
                        {animeDetails.releaseDate}
                      </span>
                    </li>
                    <li>
                      Status:{" "}
                      <span className=" text-orange-400">
                        {animeDetails.status}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-around items-center m-8 mt-20 w-[90%] md:w-[50%] lg:mx-0 lg:w-[45%] mx-auto font-sans text-slate-200">
                  <p className="flex justify-around w-[32%] lg:w-full mx-auto">
                    Favorite
                    {like ? (
                      <FaHeart size={24} className=" text-gray-300" />
                    ) : (
                      <FaRegHeart size={24} className=" text-gray-300" />
                    )}
                  </p>
                  <button className="border-2 p-2 px-4 border-yellow-400  ml-8  lg:w-full rounded-md ">
                    Write Review
                  </button>
                </div>
              </div>
            </div>

            <div>
                {loading ? (
                    <div className="container mx-auto min-h-screen flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="text-white pt-[12rem] md:pt-[8rem] flex flex-col w-full h-full">
                        <div className="text-white flex items-center justify-center p-32 mb-24">
                            Movie Trailer
                        </div>
                        <div className="lg:flex lg:items-center lg:w-full">
                            <div className="relative w-full h-full">
                                <img
                                    src={animeDetails.image}
                                    alt={animeDetails.id}
                                    className="w-[260px] md:w-[420px] h-auto mx-auto lg:mx-16 rounded-md m-10"
                                />
                                <Link to="/">
                                    <div className="absolute -top-10 lg:top-0 right-6 md:right-28 lg:right-24">
                                        <IoIosCloseCircleOutline size={34} />
                                    </div>
                                </Link>
                            </div>

                            <div className="w-[90%] lg:w-full text-center mx-auto lg:text-start">
                                <h1 className="text-2xl md:text-4xl mb-4 md:m-2">
                                    {animeDetails.id}
                                </h1>
                                <h4 className="text-[.8rem] md:text-lg text-slate-400 mb-4 md:mb-8 leading-6 m-1">
                                    {animeDetails.description}
                                </h4>
                                <div className="container w-full h-full flex flex-col lg:m-2">
                                    <div className="flex mx-auto lg:mx-0">
                                        <h4 className="text-sm md:text-lg">
                                            Genres:{" "}
                                        </h4>
                                        <ul className="ml-2 flex justify-around md:w-[90%] lg:w-[70%] text-blue-400">
                                            {animeDetails.genres.map(
                                                (genre) => (
                                                    <li
                                                        key={genre}
                                                        className="text-[.8rem] md:text-lg ml-2"
                                                    >
                                                        {genre}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div className="flex flex-row text-start w-[70%] justify-between mx-auto  lg:mx-0 md:w-[55%] lg:w-[65%] mt-4">
                                        <h5 className="text-[.8rem] md:text-lg">
                                            Season:{" "}
                                            <span className="ml-[.2rem] md:ml-2 text-orange-400 t">
                                                {animeDetails.type}
                                            </span>
                                        </h5>
                                        <h5 className="text-[.8rem] md:text-lg">
                                            Release:{" "}
                                            <span className="ml-[.2rem] md:ml-2 text-orange-400 t">
                                                {animeDetails.releaseDate}
                                            </span>
                                        </h5>
                                        <h5 className="text-[.8rem] md:text-lg">
                                            Status:{" "}
                                            <span className="ml-[.2rem] md:ml-2 text-orange-400 t">
                                                {animeDetails.status}
                                            </span>
                                        </h5>
                                    </div>
                                </div>
                                <div className="flex justify-around items-center m-8 mt-12 w-[85%] md:w-[50%] lg:mx-0 lg:w-[45%] mx-auto font-sans text-slate-200">
                                    <p className="flex justify-around w-[32%] lg:w-full mx-auto">
                                        Favorite
                                        {like ? (
                                            <FaHeart
                                                size={24}
                                                className=" text-gray-300"
                                            />
                                        ) : (
                                            <FaRegHeart
                                                size={24}
                                                className=" text-gray-300"
                                            />
                                        )}
                                    </p>
                                    <button className="border-2 p-2 px-4 border-yellow-400  ml-8  lg:w-full rounded-md ">
                                        Write Review
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center text-xl md:text-2xl mt-24 mb-6">
                            Watch Episodes
                        </h2>
                        <div className="h-[40vh] overflow-scroll w-[85%] md:w-[70%] mx-auto">
                            {streamingLinks.map((episode) => (
                                <EpisodeCard
                                    className
                                    key={episode.number}
                                    animeId={animeId}
                                    episode={episode}
                                />
                            ))}
                        </div>
                        <div className=" w-full h-auto mb-6">
                            <h3 className="mt-12 text-xl md:text-2xl text-center">
                                Recomendations
                            </h3>
                            <AnimeRow data={animeList} />
                        </div>
                        <Footer pageType="streaming" />
                    </div>
                )}

            <h2 className="text-center text-xl md:text-2xl mt-24 mb-6">
              Watch Episodes
            </h2>
            <div className="h-[40vh] overflow-scroll w-[85%] md:w-[70%] mx-auto">
              {episodeList.map((episode) => (
                <EpisodeCard
                  className
                  key={episode.number}
                  animeId={animeId}
                  episode={episode}
                />
              ))}
            </div>
            <div className=" w-full h-auto mb-6">
              <h3 className="mt-12 text-xl md:text-2xl text-center">
                Recomendations
              </h3>
              <AnimeRow data={recommendationList} />

            </div>
            <Footer pageType="streaming" />
          </div>
        )}
      </div>
    </div>
  );
};
export default AnimeDetailsPage;

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
import AnimeEpisode from "../components/AnimeEpisode.jsx";

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
            const { data } = await axios.get(
                apiRoutes.getAnimeInfo(animeId),
                {}
            );
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
                        <AnimeEpisode data={animeDetails} />
                        <div className="flex lg:items-center">
                            <div className="w-[85%] md:w-[90%] lg:w-[60%] mx-auto lg:text-start">
                                <h1 className="text-2xl md:text-4xl text-center mb-4 m-2">
                                    {animeDetails.title.english}
                                </h1>
                                <h4
                                    className="text-sm md:text-lg  text-slate-400 mb-4 md:mb-8 leading-6"
                                    dangerouslySetInnerHTML={{
                                        __html: animeDetails.description,
                                    }}
                                ></h4>
                                <div className="flex items-center justify-between w-[80%] md:w-[60%] lg:w-[45%] mt-6">
                                    <h4 className="text-sm md:text-lg ">
                                        Genres:
                                    </h4>
                                    {animeDetails.genres.map((genre) => (
                                        <p
                                            key={genre}
                                            className="text-blue-400 text-[.8rem] md:text-lg"
                                        >
                                            {genre}
                                        </p>
                                    ))}
                                </div>
                                <div className="flex justify-between w-[80%] md:w-[45%]  mt-6 mb-6">
                                    <h5 className="text-sm md:text-lg">
                                        Season:{" "}
                                        <span className=" text-orange-400 ml-1">
                                            {animeDetails.type}
                                        </span>
                                    </h5>
                                    <h5 className="text-sm md:text-lg">
                                        Season:{" "}
                                        <span className=" text-orange-400 ml-1">
                                            {animeDetails.releaseDate}
                                        </span>
                                    </h5>
                                    <h5 className="text-sm md:text-lg">
                                        Season:{" "}
                                        <span className=" text-orange-400 ml-1">
                                            {animeDetails.status}
                                        </span>
                                    </h5>
                                </div>
                                <div className="flex justify-between items-center w-[80%]  md:w-[50%] mx-auto lg:mx-0 mt-12 lg:w-[40%]">
                                    <p className="flex justify-between w-[34%] md:w-[28%]">
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
                                    <button className="border-2 p-2 px-4 border-yellow-400 w-[50%] lg:w-[40%] ml-8 rounded-md">
                                        Write Review
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center text-xl md:text-2xl mt-24 mb-6">
                            Watch Episodes
                        </h2>
                        <div className="h-[50vh] overflow-scroll w-full md:w-[65%] lg:w-[50%] mx-auto">
                            {episodeList.map((episode) => (
                                <>
                                    <Link to={episode.url}>
                                        <EpisodeCard
                                            key={episode.id}
                                            animeId={animeId}
                                            episode={episode}
                                        />
                                    </Link>
                                </>
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

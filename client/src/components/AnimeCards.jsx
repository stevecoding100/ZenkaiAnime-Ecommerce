import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const AnimeCards = ({ title }) => {
    const url = "https://zenkai-api.vercel.app/anime/gogoanime/top-airing";
    const [animeList, setAnimeList] = useState([]);
    const [like, setLike] = useState(false);

    // This function reduces the number of character in the anime title
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

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

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 md:gap-y-6 md:gap-0 mb-8 lg:p-2 relative">
                    {animeList.map((item, id) => (
                        <div
                            key={id}
                            className=" w-[185px] md:w-[228px]  mx-auto cursor-pointer relative"
                        >
                            <img
                                className="w-full h-[280px] md:h-[360px] object-cover rounded-sm"
                                src={item.image}
                                alt={item.title}
                            />
                            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white font-sans">
                                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full font-sans text-center">
                                    {truncateString(item.title, 25)}
                                </p>
                                <p>
                                    {like ? (
                                        <FaHeart className="absolute top-4 left-4 text-gray-300" />
                                    ) : (
                                        <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AnimeCards;

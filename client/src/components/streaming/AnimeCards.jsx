import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnimeCards = ({ title, data }) => {
    const [like, setLike] = useState(false);

    // This function reduces the number of character in the anime title
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative  flex items-center group">
                <div className="w-full h-full grid grid-cols-3 lg:grid-cols-6 gap-y-6  mb-8">
                    {data.map((anime, id) => (
                        <div
                            key={id}
                            className=" w-[90%] mx-auto cursor-pointer relative"
                        >
                            <Link to={`/series/${anime.id}`}>
                                <img
                                    className="h-[175px] md:h-[340px] object-cover rounded-sm"
                                    src={anime.image}
                                    alt={anime.title.english}
                                />
                                <div className="absolute top-0 left-0 flex items-center pr-10 md:pr-0 justify-center w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white font-sans">
                                    <p className="text-xs md:text-sm font-bold font-sans">
                                        {truncateString(
                                            anime.title?.english ||
                                                anime.title?.romaji ||
                                                anime.title?.userPreferred ||
                                                anime.title?.native,
                                            20
                                        )}
                                    </p>
                                    <p>
                                        {like ? (
                                            <FaHeart className="absolute top-4 left-4 text-gray-300" />
                                        ) : (
                                            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AnimeCards;

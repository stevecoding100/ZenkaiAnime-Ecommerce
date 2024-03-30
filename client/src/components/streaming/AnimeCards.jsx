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
            <div className="relative flex items-center group">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4  mb-8 lg:p-2 relative">
                    {data.map((anime, id) => (
                        <div
                            key={id}
                            className=" w-[176px] md:w-[238px]  lg:w-[218px] mx-auto cursor-pointer relative"
                        >
                            <Link to={`/series/${anime.id}`}>
                                <img
                                    className="w-full h-[260px] md:h-[348px]  object-cover rounded-sm"
                                    src={anime.image}
                                    alt={anime.title.english}
                                />
                                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white font-sans">
                                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full font-sans text-center">
                                        {truncateString(
                                            anime.title?.english ||
                                                anime.title?.romaji ||
                                                anime.title?.userPreferred ||
                                                anime.title?.native,
                                            25
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

import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const dummyData = {
    id: "one-piece",
    title: "One Piece",
    image: "https://gogocdn.net/cover/one-piece-1708412053.png",
    url: "https://gogoanime3.co/category/one-piece",
    genres: [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Shounen",
        "Super Power",
    ],
    episodeId: "one-piece-episode-1098",
    episodeNumber: 1098,
};
const AnimeRow = ({ title, rowID }) => {
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

    const slideLeft = () => {
        let slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        let slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft
                    className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                    size={40}
                    onClick={slideLeft}
                />
                <div
                    id={"slider" + rowID}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll scroll-smooth srollbar-hide relative"
                >
                    {animeList.map((item, id) => (
                        <div
                            key={id}
                            className="w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                        >
                            <img
                                className="w-full h-[130px] lg:h-[150px] object-cover block rounded-sm"
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
                <MdChevronRight
                    className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                    size={40}
                    onClick={slideRight}
                />
            </div>
        </>
    );
};

export default AnimeRow;

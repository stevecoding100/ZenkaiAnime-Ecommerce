import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const AnimeRow = ({ title, rowID, data }) => {
  const [like, setLike] = useState(false);

  // This function reduces the number of character in the anime title
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

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
          {data.map((anime, id) => (
            <div
              key={id}
              className="w-[185px] md:w-[216px] lg:w-[220px] inline-block cursor-pointer relative p-2"
            >
              {/* Takes user to AnimeDetail component */}
              <Link to={`/series/${anime.id}`}>
                <img
                  className="w-full h-[280px] md:h-[340px] object-cover block rounded-sm"
                  src={anime.image}
                  alt={anime.title.english}
                />

                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white font-sans">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full font-sans text-center">
                    {truncateString(
                      anime.title?.english ||
                        anime.title?.native ||
                        anime.title?.romanji ||
                        anime.title?.userPreferred ||
                        "No title",
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

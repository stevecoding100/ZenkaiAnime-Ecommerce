import { Link } from "react-router-dom";

const FeaturedAnime = ({ data }) => {
    const randomAnime = data[Math.floor(Math.random() * data.length)];

    // This function reduces the number of character in the anime description
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    return (
        <div className=" relative w-full h-[600px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[600px]  bg-gradient-to-r from-black"></div>
                <img
                    src={randomAnime?.cover}
                    alt={randomAnime.title}
                    key={randomAnime.id}
                    className="w-full h-full object-center object-cover"
                />
                <div className="absolute w-full top-[20%] p-6 md:p-8 ">
                    <h1 className="text-3xl md:text-5xl font-bold font-sans">
                        {data.title}
                    </h1>
                    <div className="my-4">
                        <Link to={`/series/${randomAnime?.id}`}>
                            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded-sm">
                                Play
                            </button>
                        </Link>
                        <button className="border text-white  border-gray-300 py-2 px-5 rounded-sm  ml-4">
                            Watch Later
                        </button>
                    </div>
                    <p className="text-gray-400 font-sans text-sm">
                        Released: {randomAnime.releaseDate}
                    </p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 font-sans">
                        {truncateString(randomAnime?.description, 200)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAnime;

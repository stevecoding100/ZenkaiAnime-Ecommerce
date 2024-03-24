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

const FeaturedAnime = ({ data }) => {
    const anime = data[Math.floor(Math.random() * data.length)];
    console.log(anime);

    // This function reduces the number of character in the anime description
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    return (
        <div className="w-full h-[600px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[600px]  bg-gradient-to-r from-black"></div>
                <img
                    src={anime?.image}
                    alt={data.title}
                    key={data.id}
                    className="w-full h-full object-cover"
                />
                <div className="absolute w-full top-[20%] p-6 md:p-8 ">
                    <h1 className="text-3xl md:text-5xl font-bold font-sans">
                        {data.title}
                    </h1>
                    <div className="my-4">
                        <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded-sm">
                            Play
                        </button>
                        <button className="border text-white  border-gray-300 py-2 px-5 rounded-sm  ml-4">
                            Watch Later
                        </button>
                    </div>
                    <p className="text-gray-400 font-sans text-sm">
                        Released: 06/04/2005
                    </p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 font-sans">
                        {truncateString(
                            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, asperiores, esse labore, laudantium et minima soluta nihil aut delectus voluptatem beatae harum praesentium? Omnis esse in minus doloribus.`,
                            150
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAnime;

import { Link } from "react-router-dom";

const EpisodeCard = ({ episode, animeId }) => {
    const { id, number, url } = episode;
    return (
        <Link
            to={`/${animeId}/watch/${episode.id}`}
            className="block bg-black rounded-md p-4 hover:bg-blue-500 h-[8vh] md:h-[10vh]"
        >
            <div className="flex flex-row justify-between border-b-2">
                <h2 className="text-xl  text-white font-bold">
                    Episode {number}
                </h2>
            </div>
            {/* Add more episode details */}
        </Link>
    );
};

export default EpisodeCard;

import { Link } from "react-router-dom";

const EpisodeCard = ({ episode, animeId }) => {
  const { id, number, url } = episode;
  return (
    <Link
      to={`/${animeId}/watch/${episode.id}`}
      className="block bg-white rounded-md p-4 hover:bg-gray-100"
    >
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold">Episode {number}</h2>
      </div>
      {/* Add more episode details */}
    </Link>
  );
};

export default EpisodeCard;

import { Link } from "react-router-dom";
const AnimeCard = ({ anime }) => {
  const { title, image, url, genres, episodeId, episodeNumber, id } = anime;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Genres: {genres.join(", ")}</p>
        <Link
          to={`/series/${id}`}
          className="text-blue-500 hover:text-blue-700 mb-2 block"
        >
          View Series
        </Link>
        <a
          href={`${url}/${episodeId}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Episode {episodeNumber}
        </a>
      </div>
    </div>
  );
};

export default AnimeCard;

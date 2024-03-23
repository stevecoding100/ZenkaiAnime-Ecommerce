import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const AnimeDetailsPage = () => {
  const [animeDetails, setAnimeDetails] = useState({});
  const { id } = useParams();

  const getAnimeDetails = async () => {
    try {
      console.log({ id });
      const { data } = await axios.get(
        `https://zenkai-api.vercel.app/anime/gogoanime/info/${id}`
      );
      console.log(data);
      setAnimeDetails(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getAnimeDetails();
  }, []);

  return (
    <div>
      <h1>Anime Details Page</h1>
    </div>
  );
};
export default AnimeDetailsPage;

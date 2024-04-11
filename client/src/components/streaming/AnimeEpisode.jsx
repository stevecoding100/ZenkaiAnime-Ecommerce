import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AnimeEpisode = ({ data }) => {
  const [trailer, setTrailer] = useState(false);

  return (
    <div className="relative  flex w-full h-full items-center justify-center mb-6 lg:p-14">
      {data?.trailer ? (
        <iframe
          className="w-full md:w-5/6 lg:w-1/2 aspect-video rounded-xl "
          src={`https://www.youtube.com/embed/${data.trailer.id}`}
          style={{ pointerEvents: "auto" }}
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={data.image}
          alt="#"
          className=" w-[360px] h-[400px]   md:w-[600px] md:h-[600px] lg:h-[650px]  object-center object-cover rounded-md"
        />
      )}
    </div>
  );
};

export default AnimeEpisode;

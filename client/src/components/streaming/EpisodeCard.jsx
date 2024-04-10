const EpisodeCard = ({ episode, type }) => {
  console.log(episode);
  const { number, image } = episode;

  if (type === "details") {
    return (
      <div className="flex flex-row justify-between  mx-6 lg:mx-12 items-center border-b-2">
        <img
          src={image}
          alt="#"
          className="w-[220px] h-[150px] object-cover p-4"
        />
        <h2 className="text-xl  text-white font-bold mr-4 md:mr-10">
          Episode {number}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-row scrollbarY ">
      <img
        src={image}
        alt="#"
        className="w-[220px] h-[150px] object-cover p-4"
      />
      <h2 className="text-xl  text-white font-bold mr-4 md:mr-10">
        Episode {number}
      </h2>
    </div>
  );
};

export default EpisodeCard;

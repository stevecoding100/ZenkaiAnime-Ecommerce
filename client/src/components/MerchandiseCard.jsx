const MerchandiseCard = ({ merchandise }) => {
  return (
    <div className="border-2 rounded-3xl shadow-md  mx-5 hover:scale-125 duration-700 hover:cursor-pointer w-3/4">
      <img
        className="rounded-3xl"
        src={merchandise.image_url}
        alt={merchandise.name}
      />
      <div className="text-center my-2 space-y-2">
        <h2 className="text-xl">{merchandise.name}</h2>
        <p className="text-lg">${merchandise.price}</p>
      </div>
    </div>
  );
};

export default MerchandiseCard;

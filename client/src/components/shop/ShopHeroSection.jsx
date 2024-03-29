import { Link } from "react-router-dom";
import merch from "../../assets/shop/one-piece-shorts.webp";
import pokemanCup from "../../assets/shop/pokeman-shop.webp";
import tees from "../../assets/shop/shop-tees.webp";


const HeroData = [
    {
        id: 1,
        image: merch,
        title: "One Piece Shorts",
        link: "/shop",
        buttonTitle: "Shop One Piece Collection",
    },
    {
        id: 2,
        image: pokemanCup,
        title: "Pokemon Pikachu Ramen Bowl Set",
        link: "/shop",
        buttonTitle: "Shop Pokemon Collection",
    },
    {
        id: 3,
        image: tees,
        title: "Anime T-shirt",
        link: "/shop",
        buttonTitle: "Shop Tees",
    },
];

const ShopHeroSection = () => {
    return (
        <div className="container mx-auto py-16 mb-24">
            <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold mb-12 p-2">
                Embrace Your Passion for Anime{" "}
                <span className="hidden md:inline-block">-</span>{" "}
                <br className="lg:hidden" /> Dive into Our Exclusive Collection
            </h1>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 p-2 lg:p-0">
                {HeroData.map((collection) => (
                    <div
                        key={collection.id}
                        className="flex flex-col text-center justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <img
                            src={collection.image}
                            alt={collection.title}
                            className="w-full h-64 lg:h-72 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                {collection.title}
                            </h2>
                            <Link to={collection.link}>
                                <button className="bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600">
                                    {collection.buttonTitle}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ShopHeroSection;

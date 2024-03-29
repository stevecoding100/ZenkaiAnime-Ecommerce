import { Link } from "react-router-dom";
import merch from "../assets/shop/one-piece-shorts.webp";
import animeFigure from "../assets/shop/anime-figure.webp";
import onePieceVarsity from "../assets/shop/one-piece-varsity.webp";
import pokemanFavorite from "../assets/shop/pokeman-favorite.webp";
import manga from "../assets/shop/manga-shop.webp";
const CategoryDummyData = [
    {
        id: 1,
        image: merch,
        title: "Clothes",
        link: "/shop",
    },
    {
        id: 2,
        image: manga,
        title: "Manga",
        link: "/shop",
    },
    {
        id: 3,
        image: animeFigure,
        title: "Figures",
        link: "/shop",
    },
    {
        id: 4,
        image: merch,
        title: "Posters",
        link: "/shop",
    },
    {
        id: 5,
        image: onePieceVarsity,
        title: "Popular",
        link: "/shop",
    },
    {
        id: 6,
        image: pokemanFavorite,
        title: "Favorites",
        link: "/shop",
    },
];

const ShopCategories = () => {
    return (
        <div className="container mx-auto py-12 p-4 lg:p-0 mt-12">
            <h1 className="text-center text-3xl lg:text-4xl font-bold mb-8">
                Categories
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {CategoryDummyData.map((category) => (
                    <Link key={category.id} to={category.link}>
                        <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg transition duration-300 hover:bg-gray-50">
                            <img
                                src={category.image}
                                alt=""
                                className="w-20 h-20 object-cover rounded-full mb-4"
                            />
                            <h4 className="text-sm md:text-base lg:text-lg font-medium text-center">
                                {category.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShopCategories;

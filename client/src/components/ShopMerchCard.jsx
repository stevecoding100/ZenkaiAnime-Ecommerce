import avatartShirt from "../assets/shop/avatar-tshirt.webp";

const productDummyData = [
    {
        id: 1,
        image: avatartShirt,
        title: "Avatar: The Last Airbender Group Acid Wash Boyfriend Fit Girls T-Shirt",
        ratings: 4,
        price: 21.52,
        originalPrice: 26.9,
        discount: 20,
    },
    {
        id: 2,
        image: avatartShirt,
        title: "Avatar: The Last Airbender Group Acid Wash Boyfriend Fit Girls T-Shirt",
        ratings: 4,
        price: 21.52,
        originalPrice: 26.9,
        discount: 20,
    },
    {
        id: 3,
        image: avatartShirt,
        title: "Avatar: The Last Airbender Group Acid Wash Boyfriend Fit Girls T-Shirt",
        ratings: 4,
        price: 21.52,
        originalPrice: 26.9,
        discount: 20,
    },
    {
        id: 4,
        image: avatartShirt,
        title: "Avatar: The Last Airbender Group Acid Wash Boyfriend Fit Girls T-Shirt",
        ratings: 4,
        price: 21.52,
        originalPrice: 26.9,
        discount: 20,
    },
];

const ShopMerchCard = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 mb-24 mt-40">
            <h1 className="text-center text-3xl lg:text-4xl font-bold mb-2">
                Products
            </h1>
            <div className="h-1 mt-16 mb-12 rounded-lg bg-gray-100"></div>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
                    type="text"
                    name="productSearch"
                    id="productSearch"
                    placeholder="Search all products..."
                />
                <div className="flex">
                    <input
                        className="flex-1 mr-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                    />
                    <input
                        className="flex-1 ml-2 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
                        type="text"
                        name="filter"
                        id="filter"
                        placeholder="Filter"
                    />
                </div>
            </div>

            {/* Product Cards */}
            <div>
                {/* Results and Filter Option */}
                <div className="flex justify-between mb-4">
                    <h5 className="text-gray-600">140,304 results</h5>
                    <h5 className="text-gray-600">
                        Sort by: <b className="text-black">Featured</b>
                    </h5>
                </div>
                {/* Product card */}
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                    {productDummyData.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col border rounded-lg p-0 bg-white"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-50  object-cover"
                            />
                            <div className="p-4">
                                <p className="text-gray-800 text-lg font-semibold mb-2">
                                    {product.title}
                                </p>
                                <p className="text-gray-500 mb-1">********</p>
                                <p className="text-gray-800 font-semibold mb-1">
                                    ${product.price}
                                </p>
                                <p className="text-gray-500 mb-1">
                                    <del>{product.originalPrice}</del>
                                </p>
                                <p className="text-red-600 font-semibold">
                                    {product.discount}% off
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopMerchCard;

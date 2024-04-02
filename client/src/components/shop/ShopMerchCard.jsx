const ShopMerchCard = ({ productData }) => {
    return (
        <div className="mx-auto max-w-screen-xl p-6 mb-24 mt-40">
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
                    <h5 className="text-gray-600">
                        {productData.length} results
                    </h5>
                    <h5 className="text-gray-600">
                        Sort by: <b className="text-black">Featured</b>
                    </h5>
                </div>
                {/* Product card */}
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                    {productData.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col border rounded-lg p-0 bg-white"
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-50  object-cover"
                            />
                            <div className="p-4">
                                <p className="text-gray-800 text-lg font-semibold mb-2">
                                    {product.name}
                                </p>
                                <p className="text-gray-500 mb-1">********</p>
                                <p className="text-gray-800 font-semibold mb-1">
                                    ${product.price}
                                </p>
                                <p className="text-gray-500 mb-1">
                                    <del>39.99</del>
                                </p>
                                <p className="text-red-600 font-semibold">
                                    20% off
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

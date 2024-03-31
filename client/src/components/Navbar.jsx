import { Link } from "react-router-dom";
import HambugerMenu from "./HambugerMenu";
import SignInSingnUpBtn from "./SignInSingnUpBtn";
import { useState } from "react";

const Navbar = ({ pageType }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <nav className="flex flex-col md:flex-row md:justify-between">
                <div className="flex justify-between items-center w-full p-6 md:w-auto">
                    {/* Small screens hamburger menu */}
                    <HambugerMenu
                        pageType={pageType}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
                    />
                    <Link
                        className={`text-2xl font-bold ${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black"
                        }`}
                        to={pageType === "streaming" ? "/" : "/shop"}
                    >
                        ZenKaiAnime
                    </Link>
                    <SignInSingnUpBtn pageType={pageType} />
                </div>

                <div
                    className={`md:flex md:flex-row justify-between md:items-center md:w-full ${
                        showMenu ? "block" : "hidden"
                    }`}
                >
                    <input
                        type="text"
                        className="w-[220px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder={`${
                            pageType === "streaming"
                                ? "Search movies..."
                                : "Search products..."
                        }`}
                    />

                    <ul
                        className={`md:flex items-center space-x-4 md:pr-6 lg:pr-32 ${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black"
                        } hidden lg:inline-block`}
                    >
                        {pageType === "streaming" ? (
                            <>
                                <Link to="/" className="text-sm lg:text-lg">
                                    Home
                                </Link>
                                <Link to="/shop" className="text-sm lg:text-lg">
                                    Shop
                                </Link>
                                <Link
                                    to="/news"
                                    className="text-sm  lg:text-lg"
                                >
                                    News
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/shop" className="text-sm lg:text-lg">
                                    Home
                                </Link>
                                <Link to="/" className="text-sm lg:text-lg">
                                    Anime Shows
                                </Link>
                                <Link
                                    to="/contactus"
                                    className="text-sm lg:text-lg"
                                >
                                    Contact Us
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
                <ul className="md:flex items-center  w-[280px] hidden">
                    <Link to="/login">
                        <button
                            className={`px-4 py-2 hover:text-blue-300 ${
                                pageType === "streaming"
                                    ? "text-gray-200"
                                    : "text-gray-800"
                            } rounded-md transition duration-300`}
                        >
                            Sign in
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button
                            className={`px-4 py-2 bg-blue-700 hover:bg-blue-600 ${
                                pageType === "streaming"
                                    ? "text-white"
                                    : "text-slate-100"
                            } rounded-md transition duration-300`}
                        >
                            Sign up
                        </button>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

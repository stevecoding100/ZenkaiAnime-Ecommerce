import { Link } from "react-router-dom";
import HambugerMenu from "./HambugerMenu";
import SignInSingnUpBtn from "./SignInSingnUpBtn";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
const Navbar = ({
    pageType,
    token,
    setShowCart,
    logout,
    handleSearchAnime,
}) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };

    return (
        <div>
            <nav className="flex flex-col md:flex-row md:justify-between">
                <div className="flex justify-between items-center w-full p-6 md:w-auto">
                    <HambugerMenu pageType={pageType} />
                    <Link
                        className={`text-xl md:text-2xl  font-bold ${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black md:mr-28"
                        }`}
                        to={pageType === "streaming" ? "/" : "/shop"}
                    >
                        ZenKaiAnime
                    </Link>
                    <div>
                        {token && (
                            <div className="text-black  cursor-pointer flex items-center md:hidden">
                                {pageType === "merchandise" && (
                                    <FaShoppingCart
                                        size={28}
                                        className="mr-12"
                                        onClick={toggleCart}
                                    />
                                )}
                                <FaRegBell
                                    size={28}
                                    className={`mr-6 ${
                                        pageType === "streaming"
                                            ? "text-slate-100"
                                            : "text-slate-900"
                                    } `}
                                />
                                <div>
                                    <div className="w-[50px] h-[50px]">
                                        <img
                                            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg"
                                            alt="profile picture"
                                            className={`w-full cursor-pointer h-full rounded-full object-cover border-2 ${
                                                pageType === "streaming"
                                                    ? "border-slate-100"
                                                    : "border-slate-900"
                                            }`}
                                            onClick={logout}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!token && <SignInSingnUpBtn pageType={pageType} />}
                </div>
                <div
                    className={`flex md:flex-row w-full items-center justify-center mb-4 md:mb-0`}
                >
                    {pageType === "streaming" ? (
                        <input
                            onChange={handleSearchAnime}
                            type="text"
                            className="w-[280px] px-4 py-2 md:mr-28 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder={`${
                                pageType === "streaming"
                                    ? "Search movies..."
                                    : "Search products..."
                            }`}
                        />
                    ) : (
                        ""
                    )}

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
                <div>
                    {token && (
                        <div className="text-black mt-4 cursor-pointer md:flex items-center mx-12 hidden">
                            {pageType === "merchandise" && (
                                <FaShoppingCart
                                    size={28}
                                    className="mr-12"
                                    onClick={toggleCart}
                                />
                            )}
                            <FaRegBell
                                size={28}
                                className={`mr-4 ${
                                    pageType === "streaming"
                                        ? "text-slate-100"
                                        : "text-slate-900"
                                } `}
                            />
                            <div>
                                <div className="w-[50px] h-[50px]">
                                    <img
                                        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg"
                                        alt="profile picture"
                                        className={`w-full cursor-pointer h-full rounded-full object-cover border-2 ${
                                            pageType === "streaming"
                                                ? "border-slate-100"
                                                : "border-slate-900"
                                        }`}
                                        onClick={logout}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!token && (
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
                )}
            </nav>
        </div>
    );
};
export default Navbar;

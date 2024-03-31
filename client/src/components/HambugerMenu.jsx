import { useState } from "react";
import { Link } from "react-router-dom";

const HambugerMenu = ({ pageType }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden z-50 mt-2" onClick={toggleMenu}>
            {/* Hamburger menu bars start */}
            <div
                className={`h-1 w-8 ${
                    pageType === "streaming" ? "bg-white" : "bg-slate-900"
                } rounded mb-2 transition-all duration-300 transform ${
                    isOpen ? "rotate-180 translate-y-1" : ""
                }`}
            ></div>
            <div
                className={`h-1 w-8 ${
                    pageType === "streaming" ? "bg-white" : "bg-slate-900"
                } rounded mb-2 transition-all duration-300 opacity-100 ${
                    isOpen ? "opacity-0" : ""
                }`}
            ></div>
            <div
                className={`h-1 w-8 ${
                    pageType === "streaming" ? "bg-white" : "bg-slate-900"
                } rounded mb-2 transition-all duration-300 transform ${
                    isOpen ? "-rotate-180 -translate-y-1" : ""
                }`}
            ></div>
            {/* Hamburger menu bars end */}
            {isOpen && (
                <div
                    className={`absolute ${
                        pageType === "streaming"
                            ? "bg-slate-800"
                            : "bg-slate-200"
                    } top-0 right-0 left-0  w-screen h-screen`}
                >
                    <ul
                        className={`${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black"
                        } flex flex-col items-center py-24  text-lg`}
                    >
                        {pageType === "streaming" ? (
                            <>
                                <Link
                                    to="/"
                                    className="border-b-2  w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/shop"
                                    className="border-b-2  w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    Shop
                                </Link>
                                <Link
                                    to="/news"
                                    className="border-b-2  w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    News
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/shop"
                                    className="border-b-2 border-gray-900 hover:text-white w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/"
                                    className="border-b-2 border-gray-900  hover:text-white w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    Anime Shows
                                </Link>
                                <Link
                                    to="/contactus"
                                    className="border-b-2 border-gray-900  hover:text-white w-64  h-16 py-6 text-center hover:bg-gray-900"
                                >
                                    Contact Us
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HambugerMenu;

import { useState } from "react";
import { Link } from "react-router-dom";

const HambugerMenu = ({ pageType }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden mt-2 relative z-50" onClick={toggleMenu}>
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
            {isOpen && (
                <div
                    className={`absolute ${
                        pageType === "streaming"
                            ? "bg-slate-800"
                            : "bg-slate-200"
                    } top-[4rem]  w-[350px] h-[200px] rounded-md`}
                >
                    <ul
                        className={`${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black"
                        } flex flex-col items-center py-4 text-lg`}
                    >
                        {pageType === "streaming" ? (
                            <>
                                <Link to="/streaming">Home</Link>
                                <Link to="/shop">Shop</Link>
                                <Link to="/news">News</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/shop">Home</Link>
                                <Link to="/streaming">Anime Shows</Link>
                                <Link to="/news">Contact Us</Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HambugerMenu;

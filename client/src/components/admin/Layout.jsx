import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flexflex-col md:flex-row">
            <div className="absolute top-9 left-8" onClick={toggleMenu}>
                <div
                    className={`h-1 w-8 bg-slate-900
                 rounded mb-2 transition-all duration-300 transform ${
                     isOpen ? "rotate-180 translate-y-1" : ""
                 }`}
                ></div>
                <div
                    className={`h-1 w-8  bg-slate-900
                rounded mb-2 transition-all duration-300 opacity-100 ${
                    isOpen ? "opacity-0" : ""
                }`}
                ></div>
                <div
                    className={`h-1 w-8 bg-slate-900
                 rounded mb-2 transition-all duration-300 transform ${
                     isOpen ? "-rotate-180 -translate-y-1" : ""
                 }`}
                ></div>
            </div>
            <Navbar isOpen={isOpen} />
            <main className="flex-1 p-4">
                <div className="flex items-center flex-col md:flex-row justify-between mb-4 p-4 mx-4">
                    <h1 className="text-3xl mb-10 ml-24">Overview</h1>
                    <div className="flex items-center">
                        <button className="search-button mr-2">
                            <BiSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-[250px] px-4 py-2 rounded-md border-b border-gray-300 focus:outline-none focus:border-blue-500 font-sans"
                        />
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

// Layout.js
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false); // Function to close the menu
  };
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Hamburger menu */}
      <div className="flex flex-col p-6" onClick={toggleMenu}>
        <div
          className={`h-1 w-8  bg-slate-800 rounded mb-2 transition-all duration-300 transform ${
            isOpen ? "rotate-180 translate-y-1" : ""
          }`}
        ></div>
        <div
          className={`h-1 w-8  bg-slate-800  rounded mb-2 transition-all duration-300 opacity-100 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`h-1 w-8  bg-slate-800  rounded mb-2 transition-all duration-300 transform ${
            isOpen ? "-rotate-180 -translate-y-1" : ""
          }`}
        ></div>
      </div>
      <Navbar isOpen={isOpen} closeMenu={closeMenu} />
      <main className="w-full h-full">
        <div className="flex items-center flex-col md:flex-row justify-between mb-4 p-4 mx-4">
          {(location.pathname.includes("/products") && (
            <h1 className="text-2xl font-bold"> Products</h1>
          )) ||
            (location.pathname.includes("/orders") && (
              <h1 className="text-2xl font-bold"> Orders</h1>
            )) ||
            (location.pathname.includes("/users") && (
              <h1 className="text-2xl font-bold"> Users</h1>
            )) ||
            (location.pathname.includes("/dashboard") && (
              <h1 className="text-2xl font-bold">Dashboard</h1>
            ))}
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

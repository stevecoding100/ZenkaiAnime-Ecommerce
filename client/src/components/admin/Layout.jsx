// Layout.js
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <main className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl">Overview</h1>
          <div className="flex items-center">
            <button className="search-button mr-2">
              <BiSearch />
            </button>
            <input type="text" placeholder="Search here..." />
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

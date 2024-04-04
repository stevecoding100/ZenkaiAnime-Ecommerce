import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
const Layout = () => {
  return (
    <div>
      <main className="flex flex-row">
        <Navbar />
        <section className="w-screen">
          <div className="flex justify-between">
            <h1 className="text-3xl">Overview</h1>
            <div className="flex item-center">
              <button className="search-button">
                <BiSearch className="mr-2" />
              </button>
              <input type="text" placeholder="Search here..." />
            </div>
          </div>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;

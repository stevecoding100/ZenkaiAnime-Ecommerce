import React from "react";
import Navbar from "./SideBar";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

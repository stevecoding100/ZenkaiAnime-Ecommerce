import React from "react";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTag, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  return (
    <aside className="w-[300px] h-100vh text-white bg-[#343a40] border-r border-slate-500">
      <main className="text-center">
        <header className="my-2 text-3xl">
          <h1 className=" decoration-indigo-200">Zenkai</h1>
        </header>
        <nav className="flex flex-col justify-between items-center text-white p-4 h-screen">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RxDashboard className="text-2xl" />
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineTag className="text-2xl" />
              <Link to="/dashboard/products">Products</Link>
            </div>
            <div className="flex items-center space-x-2">
              <MdOutlineReceiptLong className="text-2xl" />
              <Link to="/dashboard/orders">Orders</Link>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineUser className="text-2xl" />
              <Link to="/dashboard/users">Users</Link>
            </div>
          </div>
          <div>
            <div className="mt-auto">
              <div className="flex items-center space-x-2">
                <AiOutlineSetting className="text-2xl" />
                <Link to="/dashboard/settings">Settings</Link>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <BiLogOut className="text-2xl" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </nav>
      </main>
    </aside>
  );
};

export default Navbar;

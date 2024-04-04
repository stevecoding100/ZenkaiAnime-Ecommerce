import React from "react";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTag, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center py-6">
          <h1 className="text-2xl font-bold">Zenkai</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <RxDashboard className="text-xl" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <AiOutlineTag className="text-xl" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <MdOutlineReceiptLong className="text-xl" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <AiOutlineUser className="text-xl" />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/settings"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <AiOutlineSetting className="text-xl" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center space-x-2 hover:text-gray-300">
                <BiLogOut className="text-xl" />
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;

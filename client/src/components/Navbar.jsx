// import React from "react";
// import { RxDashboard } from "react-icons/rx";
// import { AiOutlineTag, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
// import { MdOutlineReceiptLong } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { BiLogOut } from "react-icons/bi";
// const Navbar = () => {
//   return (
//     <aside className="bg-gray-800 text-white w-64 min-h-screen">
//       <div className="flex flex-col h-full">
//         <div className="flex items-center justify-center py-6">
//           <h1 className="text-2xl font-bold">Zenkai</h1>
//         </div>
//         <nav className="flex-1 px-4 py-6">
//           <ul className="space-y-4">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center space-x-2 hover:text-gray-300"
//               >
//                 <RxDashboard className="text-xl" />
//                 <span>Dashboard</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/products"
//                 className="flex items-center space-x-2 hover:text-gray-300"
//               >
//                 <AiOutlineTag className="text-xl" />
//                 <span>Products</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/orders"
//                 className="flex items-center space-x-2 hover:text-gray-300"
//               >
//                 <MdOutlineReceiptLong className="text-xl" />
//                 <span>Orders</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/users"
//                 className="flex items-center space-x-2 hover:text-gray-300"
//               >
//                 <AiOutlineUser className="text-xl" />
//                 <span>Users</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <div className="px-4 py-6">
//           <ul className="space-y-4">
//             <li>
//               <Link
//                 to="/dashboard/settings"
//                 className="flex items-center space-x-2 hover:text-gray-300"
//               >
//                 <AiOutlineSetting className="text-xl" />
//                 <span>Settings</span>
//               </Link>
//             </li>
//             <li>
//               <button className="flex items-center space-x-2 hover:text-gray-300">
//                 <BiLogOut className="text-xl" />
//                 <span>Log out</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Navbar; (edited)

import { Link } from "react-router-dom";
import HambugerMenu from "./HambugerMenu";
import SignInSingnUpBtn from "./SignInSingnUpBtn";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
const Navbar = ({ pageType, searchProducts, token, setShowCart, logout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };
    return (
        <div>
            <nav className="flex flex-col md:flex-row md:justify-between sticky top-0 ">
                <div className="flex justify-between items-center w-full p-6 md:w-auto">
                    <Link
                        className={`text-xl md:text-2xl font-bold ${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-black"
                        }`}
                        to={pageType === "streaming" ? "/" : "/shop"}
                    >
                        ZenKaiAnime
                    </Link>
                    <div>
                        {token && pageType === "merchandise" && (
                            <div className="text-black ml-4 cursor-pointer flex items-center mx-auto md:hidden">
                                <FaShoppingCart
                                    size={32}
                                    className="mr-12"
                                    onClick={toggleCart}
                                />
                                <FaRegBell size={32} className="mr-4" />
                                <div>
                                    <div className="w-[50px] h-[50px]">
                                        <img
                                            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg"
                                            alt="profile picture"
                                            onClick={logout}
                                            className="cursor-pointer w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!token && <SignInSingnUpBtn pageType={pageType} />}
                </div>
                <div
                    className={`md:flex md:flex-row justify-between md:items-center md:w-full ${
                        showMenu ? "block" : "hidden"
                    }`}
                >
                    <input
                        onChange={searchProducts}
                        type="text"
                        className="w-[220px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder={`${
                            pageType === "streaming"
                                ? "Search movies..."
                                : "Search products..."
                        }`}
                    />
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
                    {token && pageType === "merchandise" && (
                        <div className="text-black mt-4 cursor-pointer md:flex items-center mx-12 hidden">
                            <FaShoppingCart
                                size={28}
                                className="mr-12"
                                onClick={toggleCart}
                            />
                            <FaRegBell size={28} className="mr-4" />
                            <div>
                                <div className="w-[50px] h-[50px]">
                                    <img
                                        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg"
                                        alt="profile picture"
                                        className="w-full cursor-pointer h-full rounded-full object-cover"
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

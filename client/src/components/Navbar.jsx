import { Link } from "react-router-dom";
import HambugerMenu from "./HambugerMenu";
import SignInSingnUpBtn from "./SignInSingnUpBtn";
const Navbar = ({ pageType }) => {
    return (
        <div>
            <div className="container mx-auto px-4 py-4 border-b-2 ">
                <nav className="flex items-center justify-between h-16 flex-col md:flex-row">
                    <div className="flex justify-between py-6 px-4 items-center w-full md:w-0">
                        {/* Small screens hamburger menu */}
                        <HambugerMenu pageType={pageType} />
                        <Link
                            className={`text-2xl font-bold ${
                                pageType === "streaming"
                                    ? "text-white"
                                    : "text-black"
                            }`}
                            to={pageType === "streaming" ? "/" : "/shop"}
                        >
                            ZenKaiAnime
                        </Link>
                        <SignInSingnUpBtn pageType={pageType} />
                    </div>
                    <div className="flex flex-row justify-evenly w-full">
                        <div>
                            <input
                                type="text"
                                className="w-[350px] mt-6 md:mt-0 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder={`${
                                    pageType === "streaming"
                                        ? "Search movies..."
                                        : "Search products..."
                                }`}
                            />
                        </div>

                        <ul
                            className={`md:flex items-center space-x-4  ${
                                pageType === "streaming"
                                    ? "text-white"
                                    : "text-black"
                            } hidden md:display`}
                        >
                            {pageType === "streaming" ? (
                                <>
                                    <Link to="/">Home</Link>
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
                    <ul className="md:flex items-center space-x-4 md:diplay w-[250px] hidden">
                        <button
                            className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 ${
                                pageType === "streaming"
                                    ? "text-white"
                                    : "text-slate-900"
                            } text-white rounded-md transition duration-300`}
                        >
                            Sign in
                        </button>
                        <button
                            className={`px-4 py-2 border-2 border-blue-500 hover:bg-blue-600 ${
                                pageType === "streaming"
                                    ? "text-white"
                                    : "text-slate-900"
                            } rounded-md transition duration-300`}
                        >
                            Sign up
                        </button>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;

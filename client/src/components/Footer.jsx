import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ pageType }) => {
    return (
        <footer
            className={`static bottom-0 ${
                pageType === "streaming"
                    ? "bg-gradient-to-r from-neutral-900 to-zinc-590"
                    : "bg-gray-500"
            } ${
                pageType === "streaming" ? "text-white" : "text-gray-100"
            } py-8`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mr-4">ZenKaiAnime</h1>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    to={pageType ? "/streaming" : "/shop"}
                                    className="hover:text-gray-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={pageType ? "/shop" : "/streaming"}
                                    className="hover:text-gray-300"
                                >
                                    {pageType ? "Shop" : "Anime Shows"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className="hover:text-gray-300"
                                >
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="#" className="text-white hover:text-gray-300">
                            <FaFacebook />
                        </Link>
                        <Link to="#" className="text-white hover:text-gray-300">
                            <FaTwitter />
                        </Link>
                        <Link to="#" className="text-white hover:text-gray-300">
                            <FaInstagram />
                        </Link>
                    </div>
                </div>
                <p className="mt-4 text-sm">
                    &copy; 2024 ZenKaiAnime. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

// Navbar.js
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTag, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isOpen, closeMenu }) => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const handleLinkClick = () => {
    closeMenu();
  };
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logout");
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    // Navigate to shop page
    navigate("/shop");
  };
  return (
    <aside
      className={`bg-gray-800 text-white w-full md:w-60 min-h-screen ${
        isOpen ? "inline-block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-bold">Zenkai</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={handleLinkClick}
            >
              <RxDashboard className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/products"
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={handleLinkClick}
            >
              <AiOutlineTag className="text-xl" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={handleLinkClick}
            >
              <MdOutlineReceiptLong className="text-xl" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={handleLinkClick}
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
              onClick={handleLinkClick}
            >
              <AiOutlineSetting className="text-xl" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={logout}
            >
              <BiLogOut className="text-xl" />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;

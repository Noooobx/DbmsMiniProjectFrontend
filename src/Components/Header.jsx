// Header.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userToken = Cookies.get("token");
  const itemCount = useSelector((store) => {
    return store.cart.totalItemCount;
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const fetchCartCount = async (id) => {
    const result = await axios.get(`${BASE_URL}/cart/count/${id}`, {
      withCredentials: true,
    });

    console.log(result.data.itemCount);
    dispatch(addItem(result.data.itemCount));
  };

  useEffect(() => {
    if (userToken) {
      const [header, payload, signature] = userToken.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      fetchCartCount(decodedPayload._id);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md">
      <div className="flex justify-between items-center px-6 lg:px-52 py-4">
        {/* Left: Logo */}
        <a
          href="/"
          className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition duration-300"
        >
          DineTime
        </a>

        {/* Center: Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="/"
            className="text-lg text-white hover:text-orange-400 transition"
          >
            Contact Us
          </a>
          <a
            href="/about-us"
            className="text-lg text-white hover:text-orange-400 transition"
          >
            About Us
          </a>
          <a
            href="/menu"
            className="text-lg text-white hover:text-orange-400 transition"
          >
            Menu
          </a>
        </nav>

        {/* Right: Cart and User Icon */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="text-lg text-white hover:text-orange-400 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5 21h14l-2-8m-7-4h8"
                />
              </svg>
              {/* Badge for itemCount */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {userToken && (
            <button
              onClick={() => navigate("/profile")}
              className="text-lg text-white hover:text-green-400 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 18.364A9 9 0 0112 15a9 9 0 016.879 3.364M12 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Component */}
      <HamburgerMenu
        closeMobileMenu={closeMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </header>
  );
};

export default Header;

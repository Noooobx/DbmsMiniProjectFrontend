import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userToken = Cookies.get("token");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
          <button
            onClick={() => navigate("/cart")}
            className="text-lg text-white hover:text-orange-400 transition flex items-center"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5 21h14l-2-8m-7-4h8"
              />
            </svg>
          </button>
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

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMobileMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-6 text-center mt-8">
          <a
            href="/"
            className="text-lg text-white hover:text-orange-400 transition"
            onClick={closeMobileMenu}
          >
            Contact Us
          </a>
          <a
            href="/about-us"
            className="text-lg text-white hover:text-orange-400 transition"
            onClick={closeMobileMenu}
          >
            About Us
          </a>
          <a
            href="/menu"
            className="text-lg text-white hover:text-orange-400 transition"
            onClick={closeMobileMenu}
          >
            Menu
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

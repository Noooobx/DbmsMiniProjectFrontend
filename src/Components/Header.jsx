import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // To manage cookies

const Header = () => {
  const navigate = useNavigate();

  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is logged in by looking for a user token in cookies
  const userToken = Cookies.get("token");

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 bg-opacity-100 shadow fixed top-0 left-0 w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-white"
              onClick={toggleMobileMenu} // Toggle menu on click
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              DineTime
            </a>
          </div>

          {/* Always visible Menu (for larger screens) */}
          <nav className="hidden lg:flex flex-grow justify-end space-x-4 mr-4">
            <a
              href="/menu"
              className="text-orange-500 text-lg font-bold hover:text-white transition duration-200"
            >
              Menu
            </a>

            <a
              href="/about-us"
              className="text-white w-20 text-lg hover:text-orange-500 transition duration-200"
            >
              About Us
            </a>

            <a
              href="/contact-us"
              className="text-white w-22 text-lg hover:text-orange-500 transition duration-200"
            >
              Contact Us
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {userToken && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-orange-500 text-lg font-bold hover:text-white transition duration-200"
              >
                Dashboard
              </button>
            )}
            {userToken && (
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center justify-center w-8 h-8 text-gray-300 hover:text-orange-500 transition duration-200"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H21M7 13l-1.35 5M17 13l1.35 5M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
              </button>
            )}
            {userToken && (
              <button
                onClick={() => navigate("/profile")}
                className="relative flex items-center justify-center w-8 h-8 text-gray-300 hover:text-orange-500 transition duration-200"
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
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 18c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v1H6v-1z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Only visible on small screens, toggled with state) */}
      <div
        className={`lg:hidden fixed top-0 left-0 bg-gray-900 text-white w-64 h-full transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`} // Mobile menu sliding effect
      >
        {/* Close button inside mobile menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMobileMenu} // Close the menu
            className="text-white text-2xl"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu header */}
        <div className="text-center text-white text-2xl font-bold py-4 border-b border-gray-700">
          DineTime
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col items-center space-y-4 py-4 flex-grow">
          <a
            href="/menu"
            className="text-lg font-bold hover:text-orange-500 transition duration-200"
          >
            Menu
          </a>
          <a
            href="/about-us"
            className="text-lg hover:text-orange-500 transition duration-200"
          >
            About Us
          </a>
          <a
            href="/contact-us"
            className="text-lg hover:text-orange-500 transition duration-200"
          >
            Contact Us
          </a>
        </nav>

        {/* Copyright Section at the Bottom */}
        <div className="flex flex-col justify-between py-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 ">
            © 2024 DineTime, All rights reserved
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

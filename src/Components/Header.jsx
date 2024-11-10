import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // To manage cookies

const Header = () => {
  const navigate = useNavigate();

  // Check if user is logged in by looking for a user token in cookies
  const userToken = Cookies.get("token");

  return (
    <header className="bg-gray-900 bg-opacity-100 shadow fixed top-0 left-0 w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              DineTime
            </a>
          </div>

          {/* Always visible Menu */}
          <nav className="flex flex-grow justify-center md:justify-end space-x-4 mr-4">
            <a
              href="/menu"
              className="text-orange-500 text-lg font-bold hover:text-white transition duration-200"
            >
              Menu
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dashboard Button (Only visible if user is logged in) */}
            {userToken && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-orange-500 text-lg font-bold hover:text-white transition duration-200"
              >
                Dashboard
              </button>
            )}

            {/* Cart Button */}
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
            
            {/* Profile Button */}
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

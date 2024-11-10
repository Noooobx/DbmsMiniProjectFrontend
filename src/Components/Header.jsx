import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "../utils/store";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const token = Cookies.get("token");
  console.log(token)
  // Replace with actual user ID logic
  const userId = useSelector((store) => store.login.user_id);
  console.log(userId,cartItemCount)

  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3004/cart/count/${userId}`,
        { withCredentials: true }
      );
      setCartItemCount(response.data.itemCount);
    } catch (error) {
      console.error("Failed to fetch cart item count:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartItemCount();
    }
  }, [userId]);

  return (
    <header className="bg-gray-900 bg-opacity-100 shadow fixed top-0 left-0 w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              DineTime
            </a>
          </div>
          <nav className="hidden md:flex flex-grow justify-end space-x-4 mr-3">
            <a
              href="/"
              className="text-gray-300 hover:text-orange-500 transition duration-200"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-orange-500 transition duration-200"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-orange-500 transition duration-200"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* User Icon */}
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

            {/* Cart Icon */}
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
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {
              !userId &&  <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
            >
              Login
            </button>
            }

            {userId && (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

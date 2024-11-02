import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) => state.cart.totalItemCount);

  return (
    <header className="bg-gray-900 bg-opacity-75 shadow fixed top-0 left-0 w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              FoodApp
            </a>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex flex-grow justify-end space-x-4">
            <a href="/" className="text-gray-300 hover:text-orange-500 transition duration-200">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-orange-500 transition duration-200">
              About Us
            </a>
            <a href="/contact" className="text-gray-300 hover:text-orange-500 transition duration-200">
              Contact
            </a>
          </nav>

          {/* Cart Icon and Login Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon with Count */}
            <button
              onClick={() => navigate('/cart')}
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

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({ closeMobileMenu, isMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-lg lg:hidden`}
    >
      {/* Header Section with DineTime branding */}
      <div className="flex justify-evenly items-center p-4 border-b border-gray-700">
        <span className="text-2xl font-bold text-orange-500">DineTime</span>
      </div>

      {/* Mobile Navigation Links */}
      <nav className="flex flex-col space-y-6 text-center mt-8 px-4">
        <a
          href="/"
          className="text-lg text-white hover:text-orange-400 transition duration-200"
          onClick={closeMobileMenu}
        >
          Contact Us
        </a>
        <a
          href="/about"
          className="text-lg text-white hover:text-orange-400 transition duration-200"
          onClick={closeMobileMenu}
        >
          About Us
        </a>
        <a
          href="/menu"
          className="text-lg text-white hover:text-orange-400 transition duration-200"
          onClick={closeMobileMenu}
        >
          Menu
        </a>
      </nav>

      {/* Footer Section */}
      
    </div>
  );
};

export default HamburgerMenu;

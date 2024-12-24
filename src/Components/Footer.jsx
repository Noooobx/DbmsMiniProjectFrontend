import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-10 px-6">
        {/* Logo and About Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">DineTime</h2>
          <p className="text-base text-gray-400 max-w-sm leading-relaxed">
            Explore exquisite dining experiences with us. Enjoy exceptional
            food, a cozy ambiance, and memories to cherish.
          </p>
        </div>

        {/* General Links Section */}
        <div className="flex flex-wrap md:flex-nowrap gap-12">
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Services
            </h3>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              Catering
            </a>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              Private Dining
            </a>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              Event Hosting
            </a>
            <a href="#" className="hover:text-orange-400 text-sm">
              Delivery
            </a>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold text-orange-500 mb-3">
              Company Info
            </h3>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              About Us
            </a>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              Contact
            </a>
            <a href="#" className="hover:text-orange-400 text-sm mb-2">
              Careers
            </a>
            <a href="#" className="hover:text-orange-400 text-sm">
              Press
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-end space-x-5">
            <a href="#" className="hover:text-orange-400 text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-orange-400 text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-400 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-400 text-2xl">
              <FaYoutube />
            </a>
            <a href="mailto:info@example.com" className="hover:text-orange-400 text-2xl">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com" className="hover:text-orange-400 text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} <span className="text-orange-500">DineTime</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

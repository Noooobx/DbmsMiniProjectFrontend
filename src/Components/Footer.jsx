import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-900 text-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo and About Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2 text-orange-500">DineTime</h2>
          <p className="text-sm text-gray-400">
            Discover a variety of exquisite dining options with us. Exceptional food and a cozy atmosphere.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-orange-500 mb-4">Menu</span>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">Appetizers</a>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">Main Courses</a>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">Desserts</a>
            <a href="#" className="link link-hover text-sm text-gray-400">Beverages</a>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold text-orange-500 mb-4">Quick Links</span>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">About Us</a>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">Contact</a>
            <a href="#" className="link link-hover text-sm text-gray-400 mb-2">FAQs</a>
            <a href="#" className="link link-hover text-sm text-gray-400">Reservations</a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-left mt-8 md:mt-0">
          <span className="text-xl font-semibold text-orange-500 mb-4 block">Follow Us</span>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" className="text-white hover:text-orange-500">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="mailto:info@example.com" className="text-white hover:text-orange-500">
              <FaEnvelope className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com" className="text-white hover:text-orange-500">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm text-gray-400">&copy; 2024 DineTime. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomePageBG } from "../utils/constants";
import Header from "./Header";
import LoadingSpinner from './LoadingSpinner';

function Homepage() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (e.g., 2 seconds)
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div>
      <Header />
      {/* If loading, show the loading spinner */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
          {/* Fullscreen Hero Section with Background Image */}
          <section
            className="flex-grow flex flex-col items-center justify-center text-center text-white bg-cover bg-center relative h-screen"
            style={{
              backgroundImage: `url(${HomePageBG})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40"></div>
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl text-orange-500 font-bold mb-4">
                Welcome to Wsiggy
              </h2>
              <div className="bg-black bg-opacity-50 p-4 rounded-md shadow-md max-w-md">
                <p className="text-white text-shadow-md">
                  Experience our exquisite dining options. Log in to explore our
                  menu, make reservations, and enjoy more features.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-4 bg-gray-900 text-center text-gray-300">
            <p>&copy; 2024 RestaurantName. All rights reserved.</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Homepage;

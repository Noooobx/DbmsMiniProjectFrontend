import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HomePageBG } from "../utils/constants";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the cookie on initial load
  
  useEffect(() => {
    const userLoggedIn = Cookies.get("token"); // Check if the cookie exists
    setIsLoggedIn(Boolean(userLoggedIn)); // If cookie exists, set logged-in state to true
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <section
        className="flex-grow flex flex-col items-center justify-center text-center text-white bg-cover bg-center relative h-screen"
        style={{
          backgroundImage: `url(${HomePageBG})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10"></div>
        <div className="relative z-20">
          <h2 className="text-4xl text-orange-500 font-bold mb-4">
            Welcome to Wsiggy
          </h2>
          <div className="bg-black bg-opacity-50 p-4 rounded-md shadow-md max-w-md mx-auto">
            <p className="text-white text-shadow-md">
              Experience our exquisite dining options. Log in to explore our
              menu, make reservations, and enjoy more features.
            </p>
          </div>
        </div>
        {!isLoggedIn && (
          <div className="mt-6 relative z-20">
            <Link to="/login">
              <button className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200">
                <span className="text-lg uppercase tracking-wide">
                  Login / Sign Up
                </span>
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Homepage;

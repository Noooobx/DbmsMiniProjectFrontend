import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HomePageBG } from "../utils/constants";
import { Spinner } from "react-bootstrap"; // Assuming you're using react-bootstrap for the spinner

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state

  useEffect(() => {
    const userLoggedIn = Cookies.get("token"); // Check if the cookie exists
    setIsLoggedIn(Boolean(userLoggedIn)); // If cookie exists, set logged-in state to true
  }, []);

  // Function to handle when the background image has loaded
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50  text-gray-800">
      <section
        className="flex-grow flex flex-col md:flex-row items-center md:px-36 justify-center text-center text-white bg-cover bg-center relative h-screen"
        style={{
          backgroundImage: `url(${HomePageBG})`,
        }}
        onLoad={handleImageLoad} // Handle image load event
      >
        {/* Show loader until the image is loaded */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Spinner animation="border" variant="light" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10"></div>

        <div className="flex flex-col md:flex-row w-full justify-center items-center px-4 md:px-8">
          {/* Content on the left */}
          <div className="relative z-20 md:w-1/2 text-left px-4 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-7xl font-extrabold text-gray-300 mb-4 text-center md:text-left leading-tight">
              Savor the Best of Dining with{" "}
              <span className="text-orange-500 hover:text-blue-600 transition duration-200">
                Wsiggy
              </span>
            </h2>
            <div className="bg-black bg-opacity-20 rounded-md shadow-md  md:w-[35rem]">
              <p className="text-gray-300 text-base md:text-lg font-normal leading-relaxed">
                Indulge in a world of flavors. Log in to explore our curated
                menu, book exclusive reservations, and enjoy personalized
                experiences. Discover new dishes and enjoy a seamless dining
                experience at your fingertips.
              </p>
            </div>
          </div>

          {/* Login Button on the right */}
          {!isLoggedIn && (
            <div className="mt-6 md:mt-0 relative z-20 md:w-1/2 text-center md:text-right flex items-end justify-center flex-col pr-16">
              <Link to="/login">
                <button className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 mb-4">
                  <span className="text-lg tracking-wide">Login / Sign Up</span>
                </button>
              </Link>
              <Link to="/menu">
                <button className="px-6 py-3 font-semibold mb-4 border border-gray-300 bg-white text-black rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                  Browse as Guest
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Homepage;

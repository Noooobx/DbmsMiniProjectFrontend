import { Link } from "react-router-dom";
import { HomePageBG } from "../utils/constants";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-transparent text-white shadow-md z-10">
        <h1 className="text-2xl font-bold text-orange-500">Wsiggy</h1>
        <nav className="flex space-x-4 items-center">
          <a href="#about" className="hover:text-amber-500">
            About
          </a>
          <a href="#contact" className="hover:text-amber-500">
            Contact
          </a>
          <Link to="/login">
            <button className="px-5 py-2 rounded bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-colors duration-200 shadow-lg">
              Login
            </button>
          </Link>
        </nav>
      </header>

      {/* Fullscreen Hero Section with Background Image */}
      <section
        className="flex-grow flex flex-col items-center justify-center text-center text-white bg-cover bg-center relative h-screen"
        style={{
          backgroundImage: `url(${HomePageBG})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40"></div> {/* Adjusted opacity here */}

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Welcome to Wsiggy</h2>
          <p className="max-w-md">
            Experience our exquisite dining options. Log in to explore our menu,
            make reservations, and enjoy more features.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-gray-900 text-center text-gray-300">
        <p>&copy; 2024 RestaurantName. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen py-20 flex flex-col items-center justify-center bg-white text-gray-900">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl px-8 mx-auto">
          Welcome to the perfect blend of innovation and dining. Explore our app crafted to offer seamless reservations, intuitive ordering, and a personalized experience that elevates the way you enjoy food.
        </p>
      </div>

      {/* Content Section */}
      <div className=" px-4 max-w-4xl text-center space-y-16">
        {/* Our Vision Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-orange-500">Our Vision</h2>
          <p className="text-lg text-gray-800 leading-relaxed max-w-2xl mx-auto">
            We aim to revolutionize dining by connecting people and restaurants in the most efficient way possible. Whether it’s reserving a table, ordering your favorite dishes, or enjoying a fine-dining experience, we’ve got you covered.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-orange-500">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-gray-800 space-y-4 mx-auto max-w-3xl">
            <li className="flex items-start">
              <span className="mr-3 text-blue-500">&#10003;</span>
              Simple and intuitive user interface for all your dining needs.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-500">&#10003;</span>
              Reserve tables and manage orders with just a few clicks.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-500">&#10003;</span>
              Discover top-rated restaurants and exclusive offers.
            </li>
          </ul>
        </div>

        {/* Get Started Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

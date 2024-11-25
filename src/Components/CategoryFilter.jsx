import React from "react";

const CategoryFilter = ({ categories, onSearch, onCategorySelect, searchQuery }) => {
  return (
    <div className="categories w-full mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search items..."
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <button
            onClick={() => onCategorySelect("All")}
            className="px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className="px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;

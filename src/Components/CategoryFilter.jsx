const CategoryFilter = ({
  categories,
  onSearch,
  onCategorySelect,
}) => {
  return (
    <div className="categories w-full flex justify-center mb-8 px-4">
      <div className="flex flex-col w-full max-w-5xl gap-8 items-center">
        <div className="flex flex-col items-center w-full">
          {/* Search Bar */}
          <input
            type="text"
            onChange={onSearch}
            //onBlur={handleBlur}
            placeholder="Search items..."
            className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
          />

        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 w-full justify-center sm:justify-start">
          <button
            onClick={() => onCategorySelect("All")}
            className="flex-1 min-w-[120px] px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className="flex-1 min-w-[120px] px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
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

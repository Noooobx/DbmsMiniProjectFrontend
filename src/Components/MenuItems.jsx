import React from "react";

const MenuItems = ({
  items,
  quantities,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToCart,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {items.map((item) => (
        <div
          key={item.name}
          className="card flex flex-col bg-white shadow-lg border border-gray-300 rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg"
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-bold text-orange-500">
                ${parseFloat(item.price).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onDecreaseQuantity(item.name)}
                  className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  -
                </button>
                <span className="text-lg font-semibold">
                  {quantities[item.name] || 1}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(item.name)}
                  className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onAddToCart(item)}
                className="px-4 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const fetchMenuData = async () => {
    try {
      const result = await axios.get("http://localhost:3004/menu/view", {
        withCredentials: true,
      });
      setMenuItems(result.data);

      // Initialize quantities with 1 for each item
      const initialQuantities = {};
      result.data.forEach(item => {
        initialQuantities[item.name] = 1; // Use item name as the key
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleAddToCart = async (item) => {
    const quantity = quantities[item.name] || 1; // Use item name to get quantity
    try {
      await axios.post("http://localhost:3004/cart/add", {
        name: item.name, // Send name
        quantity: quantity,
        price: parseFloat(item.price).toFixed(2), // Send price as a number
      }, { withCredentials: true });
      console.log("Added to cart:", { item, quantity });
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  const increaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 1) + 1, // Access quantity by name
    }));
  };

  const decreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: Math.max((prevQuantities[itemName] || 1) - 1, 1), // Access quantity by name
    }));
  };

  return (
    <div>
      <Header />
      <div
        className="min-h-screen pt-16 bg-cover bg-center"
        style={{
          background: "linear-gradient(to right, #ff7e5f, #ffcc00, #007bff)", // Bright orange, yellow, and blue gradient
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Our Menu
          </h1>

          <div className="flex flex-col w-full max-w-6xl px-4 space-y-6">
            {menuItems.map((item) => (
              <div
                key={item.name} // Use name as the key
                className="card flex flex-row bg-white bg-opacity-90 shadow-lg border border-gray-300 rounded-lg p-6"
              >
                <img
                  src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg" // Static image for each item
                  alt="Heart-shaped arrangement of fruits and vegetables"
                  className="w-1/3 h-48 object-cover rounded-lg mr-4" // Adjust height to match the card
                />
                <div className="flex-1">
                  <h2 className="card-title text-2xl font-bold text-purple-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-bold text-purple-800">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => decreaseQuantity(item.name)} // Use name for quantity
                      className="px-3 py-1 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg font-semibold">
                      {quantities[item.name] || 1} {/* Display quantity */}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.name)} // Use name for quantity
                      className="px-3 py-1 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleAddToCart(item)} // Pass the item to the function
                      className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md hover:bg-gradient-to-l transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

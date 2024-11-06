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
        initialQuantities[item.name] = 1;
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
    const quantity = quantities[item.name] || 1;
    try {
      await axios.post("http://localhost:3004/cart/add", {
        name: item.name,
        quantity: quantity,
        price: parseFloat(item.price).toFixed(2),
      }, { withCredentials: true });
      console.log("Added to cart:", { item, quantity });
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  const increaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 1) + 1,
    }));
  };

  const decreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: Math.max((prevQuantities[itemName] || 1) - 1, 1),
    }));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl mt-8 font-bold text-center mb-6 text-orange-500">
            Our Menu
          </h1>

          <div className="flex flex-col w-full max-w-6xl px-4 space-y-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="card flex flex-row bg-white shadow-lg border border-gray-300 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src="data:image/jpeg;base64,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"
                  alt={item.name}
                  className="w-60 h-40 object-cover rounded-lg mr-6" // Adjusted size for better alignment
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

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg font-semibold">
                        {quantities[item.name] || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200"
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

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Cookies from "js-cookie";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // Track if the user is logged in
  const [showModal, setShowModal] = useState(false);    // Modal visibility state
  const [modalMessage, setModalMessage] = useState("");  // Modal message content

  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      const result = await axios.get("http://localhost:3004/menu/view", {
        withCredentials: true,
      });
      setMenuItems(result.data);
      setFilteredItems(result.data);

      const initialQuantities = {};
      result.data.forEach((item) => {
        initialQuantities[item.name] = 1;
      });
      setQuantities(initialQuantities);

      // Extract categories dynamically from the menu data
      const uniqueCategories = [
        ...new Set(result.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenuData();
    const userToken = Cookies.get("token"); // Check if the user has a valid token
    if (!userToken) {
      setIsLoggedIn(false); // Set the user as not logged in if no token exists
    }
  }, []);

  // Handle adding item to cart
  const handleAddToCart = async (item) => {
    const quantity = quantities[item.name] || 1;

    // Check if the user is logged in by looking for a cookie (assuming a session or auth token exists)
    const userToken = Cookies.get("token"); // Adjust cookie name as needed

    if (!userToken) {
      // User is not logged in, show the login modal
      setModalMessage("You need to be logged in to add items to the cart.");
      setShowModal(true); // Show modal with message
      return;
    }

    // User is logged in, proceed with adding to the cart
    try {
      await axios.post(
        "http://localhost:3004/cart/add",
        {
          name: item.name,
          quantity: quantity,
          price: parseFloat(item.price).toFixed(2),
        },
        { withCredentials: true }
      );
      setModalMessage("Item added to your cart!");
      setShowModal(true); // Show modal with success message
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (category === "All") {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  // Increase item quantity
  const increaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 1) + 1,
    }));
  };

  // Decrease item quantity
  const decreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: Math.max((prevQuantities[itemName] || 1) - 1, 1),
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal when user clicks close button
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 pb-16 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl mt-8 font-bold text-center mb-6 text-orange-500">
            Our Menu
          </h1>

          {/* Category Buttons */}
          <div className="categories overflow-x-auto mb-8">
            <div className="flex space-x-4">
              <button
                onClick={() => handleCategorySelect("All")}
                className="px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="px-6 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 ease-in-out"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col w-full max-w-6xl px-4 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.name}
                className="card flex flex-col md:flex-row bg-white shadow-lg border border-gray-300 rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg"
                  alt={item.name}
                  className="w-full md:w-60 h-40 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
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

                  <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {quantities[item.name] || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(item)}
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

      {/* Modal for Login/Cart Status */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h3 className="font-bold text-lg text-black">{modalMessage}</h3>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="btn bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;

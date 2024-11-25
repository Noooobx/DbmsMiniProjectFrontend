import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Cookies from "js-cookie";
import CategoryFilter from "./CategoryFilter";
import MenuItems from "./MenuItems";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    const userToken = Cookies.get("token");
    if (!userToken) {
      setIsLoggedIn(false);
    }
  }, []);

  // Handlers
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleCategorySelect = (category) => {
    if (category === "All") {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const handleAddToCart = async (item) => {
    const quantity = quantities[item.name] || 1;
    const userToken = Cookies.get("token");

    if (!userToken) {
      setModalMessage("You need to be logged in to add items to the cart.");
      setShowModal(true);
      return;
    }

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
      setShowModal(true);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 pb-16 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-4xl mt-8 font-bold text-center mb-6 text-orange-500">
            Our Menu
          </h1>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
            searchQuery={searchQuery}
          />

          {/* Menu Items */}
          <MenuItems
            items={filteredItems}
            quantities={quantities}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h3 className="font-bold text-lg text-black">{modalMessage}</h3>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
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

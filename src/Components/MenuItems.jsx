import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import CartSuccesModal from "./modals/CartSuccesModal";
import Pagination from "@mui/material/Pagination";
import { addItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const MenuItems = ({ items, fetchMenuData, offset, setOffset, setPage }) => {
  const [quantities, setQuantities] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const onAddToCart = async (item) => {
    const quantity = quantities[item.name] || 1;
    const userToken = Cookies.get("token");

    if (!userToken) {
      setModalMessage("You need to be logged in to add items to the cart.");
      setShowModal(true);
      return;
    }
    console.log(quantities);

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

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const itemCount = useSelector((store) => {
    return store.cart.totalItemCount;
  });

  const onIncreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 1) + 1,
    }));
    dispatch(addItem(itemCount + 1));
  };

  const onDecreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: Math.max((prevQuantities[itemName] || 1) - 1, 1),
    }));
  };

  const handlePageChange = (value) => {
    setOffset((value - 1) * 10);
    setPage(value);
    console.log("Page changed to:", value);
  };

  useEffect(() => {
    handlePageChange(1);
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl lg:max-w-7xl">
      {items.map((item) => (
        <div
          key={item.item_id}
          className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Image Section */}
          <img
            src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg"
            alt={item.name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0"
          />

          {/* Content Section */}
          <div className="flex flex-col md:w-2/3 md:pl-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-lg font-semibold text-orange-500 mb-4">
              ${parseFloat(item.price).toFixed(2)}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onDecreaseQuantity(item.name)}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-300"
                >
                  -
                </button>
                <span className="text-xl font-semibold">
                  {quantities[item.name] || 1}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(item.name)}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onAddToCart(item)}
                className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      {showModal && <CartSuccesModal handleCloseModal={handleCloseModal} />}
      <div className="flex items-center justify-center w-full mt-24 my-4">
        <Pagination
          onChange={(e, value) => handlePageChange(value)}
          className="text-orange-400"
          count={10}
          color="primary"
        />
      </div>
    </div>
  );
};

export default MenuItems;

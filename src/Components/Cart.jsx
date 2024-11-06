import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3004/cart/view', { withCredentials: true });
      setCartItems(response.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Could not fetch cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (name) => {
    console.log(`Removing item: ${name}`);
    await axios.post(BASE_URL + "/cart/delete", { name }, { withCredentials: true });
    fetchCartItems();
  };

  const handleClearCart = async () => {
    console.log("Clearing all items from cart");
    // Add logic here to clear all items from the cart
    await axios.post(BASE_URL + "/cart/clear", {}, { withCredentials: true });
    fetchCartItems();
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return acc + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-gray-900 bg-opacity-75 shadow fixed top-0 left-0 w-full z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-orange-500">
                FoodApp
              </a>
            </div>
            <nav className="hidden md:flex flex-grow justify-end space-x-4">
              <a href="/" className="text-gray-300 hover:text-orange-500 transition duration-200">
                Home
              </a>
              <a href="/about" className="text-gray-300 hover:text-orange-500 transition duration-200">
                About Us
              </a>
              <a href="/contact" className="text-gray-300 hover:text-orange-500 transition duration-200">
                Contact
              </a>
            </nav>
            <div className="flex items-center ml-4">
              <button
                onClick={() => navigate('/order')}
                className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow mt-16 p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading cart items...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Your cart is empty!</p>
            <button
              onClick={() => navigate('/menu')}
              className="mt-4 px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => {
              const price = parseFloat(item.price);
              const quantity = item.quantity || 1;
              const totalItemPrice = (isNaN(price) ? 0 : price) * quantity;

              return (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Price: ${isNaN(price) ? 'N/A' : price.toFixed(2)} x {quantity}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-800">${totalItemPrice.toFixed(2)}</span>
                    <button
                      onClick={() => handleRemoveItem(item.name)}
                      className="px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Total Price:</h3>
              <span className="font-bold text-gray-800">${formattedTotalPrice}</span>
            </div>
            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={handleClearCart}
                className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-4 bg-gray-900 text-center text-gray-300">
        <p>&copy; 2024 RestaurantName. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");
  const [reservedTables, setReservedTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cart/view`, {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (err) {
        setError("Could not fetch cart items. Please try again later.");
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/reservations`, {
          withCredentials: true,
        });
        setReservedTables(response.data);
      } catch (err) {
        setError("Could not fetch reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllReservations();
  }, []);

  const handleProceedToCheckout = async () => {
    if (!selectedTable) {
      alert("Please select a reserved table before proceeding.");
      return;
    }

    try {
      for (const item of cartItems) {
        const orderData = {
          item_name: item.name,
          quantity: item.quantity,
          table_number: selectedTable,
        };
        await axios.post(`${BASE_URL}/order/place`, orderData, {
          withCredentials: true,
        });
      }
      navigate("/Orders");
    } catch (error) {
      console.log(error);
      alert("Failed to place order. Item unavailable in the menu. Please try again.");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-6">Checkout</h2>
        {loading ? (
          <p className="text-center">Loading cart items...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Your Cart Items:</h3>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between border-b py-2">
                  <span>
                    {item.name} - Quantity: {item.quantity}
                  </span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </h4>

            <h3 className="text-2xl font-semibold mt-6">Select a Reserved Table:</h3>
            <select
              className="w-full p-2 border rounded-lg mt-2"
              value={selectedTable}
              onChange={(e) => {
                const value = e.target.value;
                const numberPart = value.match(/\d+/)?.[0];
                setSelectedTable(numberPart || "");
              }}
            >
              <option value="">-- Select a Table --</option>
              {reservedTables.map((table) => (
                <option key={table.id} value={table.id}>
                  {`Table ${table.table_number} - Reserved`}
                </option>
              ))}
            </select>

            <button
              onClick={handleProceedToCheckout}
              className="mt-6 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600"
              disabled={!selectedTable}
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link to="/reserve/table" className="text-blue-600 hover:underline">
                Haven't reserved a table? Click here!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

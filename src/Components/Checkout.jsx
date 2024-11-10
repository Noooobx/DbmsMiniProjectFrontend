import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");
  const [reservedTables, setReservedTables] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3004/cart/view", {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Could not fetch cart items. Please try again later.");
      }
    };
    fetchCartItems();
  }, []);

  // Fetch all reservation IDs for the current user from the backend
  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const response = await axios.get("http://localhost:3004/reserve/all", {
          withCredentials: true,
        });

        const reservationIds = response.data.reservation_ids;

        if (reservationIds && reservationIds.length > 0) {
          setReservedTables(reservationIds.map(id => ({ id, isReserved: true })));
        } else {
          setError("No reservations found for the current user.");
        }
      } catch (err) {
        console.error("Error fetching reservations:", err);
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
      // Loop through each cart item and place orders one by one
      for (const item of cartItems) {
        const orderData = {
          item_name: item.name, // Using item name as required
          quantity: item.quantity,
          table_number: selectedTable,
        };

        console.log("Placing order:", orderData);

        // Make a POST request to place the order
        const response = await axios.post("http://localhost:3004/order/place", orderData, {
          withCredentials: true,
        });

        // Alert for each successful order
        //alert(response.data.message);
      }

      // Navigate to a confirmation page after all orders are placed
      navigate("/Orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.Item Unavailabe in the menu.Please try again.");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #FFA500, #007BFF)",
        }}
      >
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
                    <span>{item.name} - Quantity: {item.quantity}</span>
                    <span>${parseFloat(item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold">
                Total Price: ${totalPrice.toFixed(2)}
              </h4>

              <h3 className="text-2xl font-semibold mt-6">
                Select a Reserved Table:
              </h3>
              <select
                className="w-full p-2 border rounded-lg mt-2"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              >
                <option value="">-- Select a Table --</option>
                {reservedTables.map((table) => (
                  <option key={table.id} value={table.id} className="text-red-500">
                    {`Table ${table.id} - Reserved`}
                  </option>
                ))}
              </select>

              <button
                onClick={handleProceedToCheckout}
                className="mt-6 w-full px-6 py-3 rounded-lg shadow transition duration-200 bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600"
                disabled={!selectedTable}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link to="/reserve/table" className="text-blue-600 hover:underline">
                  Haven't reserved a different table? Click here!
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

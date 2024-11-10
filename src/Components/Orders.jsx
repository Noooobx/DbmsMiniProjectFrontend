import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for cancellation
  const userId = useSelector((store) => store.login.user_id); // Get user_id from Redux store

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get("http://localhost:3004/order/view", {
        withCredentials: true,
      });
      setOrders(ordersResponse.data.result); // Adjust based on actual structure
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("Failed to fetch orders.");
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    console.log(orderId)
    setLoading(true); // Start loading spinner or indication
    try {
      const response = await axios.post(
        `http://localhost:3004/order/cancel/${userId}/${orderId}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message); // Show success message
      fetchOrders(); // Refresh the orders list after cancellation
    } catch (err) {
      console.error(err); // Log error for debugging
      setError("Failed to cancel the order.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          background: "linear-gradient(to right, #ff7e5f, #ffcc00)", // Bright gradient background
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 p-6">
          <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Your Orders
          </h1>
          {error && (
            <div className="p-2 text-sm text-red-600 text-center">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            <div className="w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-purple-800">Your Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">No orders placed yet.</p>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={index} // Use index as key if no unique id is available
                    className="border-b border-gray-300 mb-4 pb-2"
                  >
                    <p className="text-lg font-semibold">
                      Order Date:{" "}
                      <strong>
                        {new Date(order.order_date).toLocaleDateString()}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold">
                      Status:{" "}
                      <strong className="text-green-600">{order.status}</strong>
                    </p>
                    <p className="text-lg font-semibold">
                      Total Amount:{" "}
                      <strong>
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold">
                      Quantity: <strong>{order.quantity}</strong>
                    </p>

                    {/* Cancel Order Button */}
                    {order.status !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(order.order_id)} // Pass order_id to cancelOrder
                        className="mt-4 w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
                      >
                        {loading ? "Cancelling..." : "Cancel Order"}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

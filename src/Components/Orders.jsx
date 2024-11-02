import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get(
        "http://localhost:3004/order/view",
        { withCredentials: true }
      );
      setOrders(ordersResponse.data.result); // Adjust based on actual structure
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1199795/pexels-photo-1199795.jpeg?cs=srgb&dl=pexels-pixabay-1199795.jpg&fm=jpg')`,
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 p-6">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Your Orders
          </h1>
          {error && (
            <div className="p-2 text-sm text-red-600 text-center">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            <div className="w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                Your Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">No orders placed yet.</p>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={index} // Use index as key if no unique id is available
                    className="border-b border-gray-300 mb-4 pb-2"
                  >
                    <p className="text-lg">
                      Order Date:{" "}
                      <strong>
                        {new Date(order.order_date).toLocaleDateString()}
                      </strong>
                    </p>
                    <p>
                      Status:{" "}
                      <strong className="text-green-600">{order.status}</strong>
                    </p>
                    <p>
                      Total Amount:{" "}
                      <strong>
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </strong>
                    </p>
                    <p>
                      Quantity: <strong>{order.quantity}</strong>
                    </p>
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

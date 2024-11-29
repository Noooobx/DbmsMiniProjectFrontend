import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((store) => store.login.user_id); // Get user_id from Redux store

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get(
        "http://localhost:3004/order/view",
        {
          withCredentials: true,
        }
      );
      console.log(ordersResponse.data.result);
      const groupedResults = ordersResponse.data.result.reduce((acc, order) => {
        if (!acc[order.table_number]) {
          acc[order.table_number] = [];
        }
        acc[order.table_number].push(order);
        return acc;
      }, {});
      console.log(groupedResults);
      setOrders(groupedResults);
      // Adjust based on actual structure
    } catch (err) {
      console.error(err); // Log the error for debugging
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    console.log(orderId);
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
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center mt-20">
    {/* Center the content vertically and horizontally */}
    <div className="w-full max-w-6xl bg-gray-200 rounded-lg p-8">
      {/* White background and padding */}
      <h1 className="text-5xl font-bold text-center mb-6 text-orange-500">
        Your Orders
      </h1>
  
      {/* Check if there are orders */}
      <div className="flex flex-col gap-6">
        {Object.keys(orders).length === 0 ? ( // Check if there are no orders
          <p className="text-gray-500 text-center">No orders placed yet.</p>
        ) : (
          Object.keys(orders).map((tableNumber) => (
            <div
              key={tableNumber}
              className="mb-8 p-6 rounded-lg shadow-md bg-gray-50" // Table section background
            >
              <h3 className="text-3xl font-bold text-orange-500 mb-4 border-b-2 border-orange-300 pb-2 text-center">
                Table ID: {tableNumber}
              </h3>
  
              {/* Orders for each table */}
              {orders[tableNumber].map((order, index) => (
                <div
                  key={index} // Unique key for each order in the array
                  className="flex flex-col sm:flex-row items-center border-b border-gray-300 mb-4 pb-4 last:border-b-0"
                >
                  {/* Left side - Order details */}
                  <div className="flex-1 pr-6 mb-4 sm:mb-0">
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Item Name:</span>{" "}
                      {order.item_name}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Order Date:</span>{" "}
                      {new Date(order.order_date).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Status:</span>{" "}
                      <strong
                        className={`${
                          order.status === "Cancelled"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {order.status}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Total Amount:</span>{" "}
                      <strong>
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      <span className="font-bold">Quantity:</span>{" "}
                      {order.quantity}
                    </p>
  
                    {/* Cancel Order Button */}
                    {order.status !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(order.order_id)} // Pass order_id to cancelOrder
                        className="mt-4 w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
  
                  {/* Right side - Image */}
                  <div className="w-32 h-32 sm:w-48 sm:h-48 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                      alt="Food Item"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  


  );
};

export default Orders;

import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get(
        "http://localhost:3004/order/view",
        {
          withCredentials: true,
        }
      );
      const groupedResults = ordersResponse.data.result.reduce((acc, order) => {
        if (!acc[order.table_number]) {
          acc[order.table_number] = [];
        }
        acc[order.table_number].push(order);
        return acc;
      }, {});
      setOrders(groupedResults);
    } catch (err) {
      console.error(err); 
    }
  };

  // Cancel order
  const cancelOrder = async () => {
    try {
      await axios.post(
        `http://localhost:3004/order/cancel/${selectedOrder.item_name}`,
        {},
        { withCredentials: true }
      );
      setShowCancelModal(false); // Close the cancel confirmation modal
      setShowSuccessModal(true); // Show success modal
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center mt-20">
      <div className="w-full max-w-6xl bg-gray-200 rounded-lg p-8">
        <h1 className="text-5xl font-bold text-center mb-6 text-orange-500">
          Your Orders
        </h1>

        <div className="flex flex-col gap-2">
          {Object.keys(orders).length === 0 ? (
            <p className="text-gray-500 text-center">No orders placed yet.</p>
          ) : (
            Object.keys(orders).map((tableNumber) => (
              <div
                key={tableNumber}
                className="mb-8 p-6 rounded-lg shadow-md bg-gray-50"
              >
                <h3 className="text-3xl font-bold text-orange-500 mb-4 border-b-2 border-orange-300 pb-2 text-center">
                  Table ID: {tableNumber}
                </h3>

                {orders[tableNumber].map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center border-b border-gray-300 mb-4 pb-4 last:border-b-0"
                  >
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

                      {order.status !== "Cancelled" && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order); // Set the selected order
                            setShowCancelModal(true); // Show confirmation modal
                          }}
                          className="mt-4 w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>

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

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-center mb-4">Cancel Order</h3>
            <p className="mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-evenly">
              <button
                onClick={() => setShowCancelModal(false)} // Close modal without canceling
                className="px-4 py-2 bg-blue-500 rounded-md text-white"
              >
                No
              </button>
              <button
                onClick={cancelOrder} // Confirm cancellation
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-center mb-4 text-green-600">Success</h3>
            <p className="mb-4">Your order has been successfully canceled!</p>
            <button
              onClick={() => setShowSuccessModal(false)} // Close success modal
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [reservedTables, setReservedTables] = useState([]); // This will hold the reserved tables

  const navigate = useNavigate();

  // Dummy data for cart items
  const dummyCartItems = [
    { id: 1, name: 'Spaghetti Bolognese', quantity: 2, price: 12.99 },
    { id: 2, name: 'Margherita Pizza', quantity: 1, price: 10.49 },
    { id: 3, name: 'Caesar Salad', quantity: 1, price: 8.99 },
  ];

  // Dummy data for reserved tables
  const dummyReservedTables = [
    { id: 1, isReserved: true },
    { id: 2, isReserved: true },
    { id: 3, isReserved: false }, // Example of an available table
  ];

  // Simulate fetching cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Simulate API call
        setCartItems(dummyCartItems);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Could not fetch cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Simulate fetching reserved tables
  useEffect(() => {
    const fetchReservedTables = async () => {
      try {
        // Simulate API call
        setReservedTables(dummyReservedTables);
      } catch (error) {
        console.error("Error fetching reserved tables:", error);
        setError("Could not fetch reserved tables. Please try again later.");
      }
    };

    fetchReservedTables();
  }, []);

  const handleProceedToReserve = () => {
    if (!selectedTable) {
      alert("Please select a reserved table before proceeding.");
      return;
    }

    const table = reservedTables.find(t => t.id === parseInt(selectedTable));
    
    if (table.isReserved) {
      alert(`Proceeding with reservation for Table ${selectedTable}!`);
      navigate('/confirmation'); // Navigate to a confirmation page
    } else {
      navigate(`/reserve-table/${selectedTable}`); // Navigate to the table reservation component
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #FFA500, #007BFF)' }}>
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
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between border-b py-2">
                  <span>{item.name} - Quantity: {item.quantity}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</h4>

            <h3 className="text-2xl font-semibold mt-6">Select a Reserved Table:</h3>
            <select
              className="w-full p-2 border rounded-lg mt-2"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <option value="">-- Select a Table --</option>
              {reservedTables.map(table => (
                <option key={table.id} value={table.id} className={table.isReserved ? 'text-red-500' : 'text-green-500'}>
                  {table.isReserved ? `Table ${table.id} - Reserved` : `Table ${table.id} - Available`}
                </option>
              ))}
            </select>

            <button
              onClick={handleProceedToReserve}
              className="mt-6 w-full px-6 py-3 rounded-lg shadow transition duration-200 bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600"
              disabled={!selectedTable}
            >
              Proceed with Selected Table
            </button>

            {/* Add a link to the reservation page */}
            <div className="mt-4 text-center">
              <Link to="/reserve/table" className="text-blue-600 hover:underline">
                Haven't reserved a different table? Click here!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

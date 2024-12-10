import React, { useState } from "react";
import axios from "axios"; // Import Axios
import AvailableTableLists from "./AvailableTableLists";
import { Bars } from "react-loader-spinner"; // Import Loader component

const TableReservation = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("10:00");
  const [people, setPeople] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [tableType, setTableType] = useState(""); // State for table type dropdown
  const [tableInfo, setTableInfo] = useState([]); // To store the fetched table information
  const [loading, setLoading] = useState(false); // Loading state

  const handleReserve = (e) => {
    e.preventDefault();
    console.log("Reservation made:", {
      name,
      date,
      time,
      people,
      specialRequests,
    });
  };

  const fetchTableInfo = async (tableinfo) => {
    setLoading(true); // Start loading
    try {
      // Simulate a delay of 3 seconds
      setTimeout(async () => {
        try {
          const result = await axios.get(`http://localhost:3004/tableinfo?tableType=${tableinfo}`, {
            withCredentials: true,
          });
          setTableInfo(result.data); // Update the table info state with fetched data
          console.log(result.data);
        } catch (error) {
          console.error("Error fetching table info:", error);
        } finally {
          setLoading(false); // Stop loading after the delay
        }
      }, 1000); // Delay of 3 seconds before making the actual API call
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Stop loading in case of an error
    }
  };

  // Filter tables based on selected type
  const filteredTables = tableType
    ? tableInfo.filter((table) => table.type === tableType)
    : tableInfo;

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gray-200">
      {/* Main Container */}
      <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg">
        {/* Heading Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Table Reservation</h1>
          <p className="mt-2 text-lg text-gray-600">Reserve your table and enjoy a great time!</p>
        </div>

        {/* Flexbox Layout for Form and Available Tables */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Form Section (Left side) */}
          <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow-md space-y-6">
            <form onSubmit={handleReserve} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Type your name"
                  className="w-full p-3 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Number of People */}
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="w-full p-3 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Table Type Dropdown */}
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">
                  Select Table Location
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={tableType}
                  onChange={(e) => setTableType(e.target.value)}
                >
                  <option value="window_side">Window Side</option>
                  <option value="corner">Corner</option>
                  <option value="middle">Middle</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="side_near_kitchen">Side Near Kitchen</option>
                  <option value="near_entrance">Near Entrance</option>
                  <option value="center">Center</option>
                  <option value="balcony">Balcony</option>
                  <option value="rooftop">Rooftop</option>
                </select>
              </div>

              {/* Button to fetch and show tables */}
              <button
                type="button" // Button type is "button" to avoid form submission
                onClick={() => fetchTableInfo(tableType)} // Fetch table info on click
                className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
              >
                Show Tables
              </button>
            </form>
          </div>

          {/* Available Tables Section (Right side) */}
          <div className="flex-1 p-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Bars
                  height="80"
                  width="80"
                  color="orange"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              <AvailableTableLists filteredTables={tableInfo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;

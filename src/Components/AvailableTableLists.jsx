import React from "react";
import { Bars } from "react-loader-spinner"; // Import a loading spinner component

const AvailableTableLists = ({ filteredTables, loading }) => {
  console.log(filteredTables);

  // Show loading spinner when data is being fetched or filtered
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <Bars height="50" width="50" color="orange" ariaLabel="loading" />
      </div>
    );
  }

  // Show available tables when there are results
  return filteredTables.length > 0 ? (
    <div className="mt-6 h-[27rem] overflow-hidden">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Available Tables
      </h3>

      <div className="grid grid-cols-1 p-4 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto   no-scrollbar">
        {filteredTables.map((table) => (
          <div
            key={table.table_id}
            className="p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <h4 className="text-lg font-semibold text-gray-900">
              Table #{table.table_id}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Type:</strong> {table.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Capacity:</strong> {table.seating_capacity} people
            </p>

            {/* Reserve Button */}
            <button
              onClick={() => alert(`Reserving Table ${table.table_id}`)} // Just a simple alert for now
              className="mt-4 w-full py-1.5 text-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
            >
              Reserve Table
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    // Show a message if no tables are available or filtered out
    <div className="mt-6 flex flex-col items-center justify-center">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Let's Find Your Ideal Table!
      </h2>

      {/* Instructions with Icons */}
      <div className="mt-6 flex flex-col items-center justify-center space-y-6 text-gray-600">
        {/* First section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-blue-200 rounded-full mr-2">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zM9 4a1 1 0 112 0v5.586l3.707 3.707-1.414 1.414L10 10.414V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm">Choose a Table Type</p>
        </div>

        {/* Second section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-green-200 rounded-full mr-2">
            <svg
              className="h-6 w-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zM9 4a1 1 0 112 0v5.586l3.707 3.707-1.414 1.414L10 10.414V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm">View Available Tables</p>
        </div>

        {/* Third section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-blue-200 rounded-full mr-2">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zM9 4a1 1 0 112 0v5.586l3.707 3.707-1.414 1.414L10 10.414V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm">Choose a Table Type</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="p-3 bg-blue-200 rounded-full mr-2">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zM9 4a1 1 0 112 0v5.586l3.707 3.707-1.414 1.414L10 10.414V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm">Choose a Table Type</p>
        </div>
      </div>
    </div>
  );
};

export default AvailableTableLists;

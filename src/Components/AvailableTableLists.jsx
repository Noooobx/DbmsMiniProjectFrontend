import React from 'react';

const AvailableTableLists = ({ filteredTables }) => {
  console.log(filteredTables);

  return (
    filteredTables.length > 0 && (
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Tables</h3>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto scrollbar-none">
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <div
                key={table.table_id}
                className="p-6 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-gray-900">Table Number: {table.table_id}</h4>
                <p className="text-gray-600 mt-2">
                  <strong>Type:</strong> {table.description}
                </p>
                <p className="text-gray-600">
                  <strong>Capacity:</strong> {table.seating_capacity} people
                </p>

                {/* Reserve Button */}
                <button
                  onClick={() => alert(`Reserving Table ${table.table_id}`)} // Just a simple alert for now
                  className="mt-4 w-full py-2 text-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
                >
                  Reserve Table
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No tables found for the selected filter.</p>
          )}
        </div>
      </div>
    )
  );
};

export default AvailableTableLists;

import React from "react";
import dayjs from "dayjs"; // Import the dayjs library
import { Bars } from "react-loader-spinner"; // Import a loading spinner component
import EventSeatIcon from "@mui/icons-material/EventSeat"; // Icon for seating capacity
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"; // Icon for table type
import SearchIcon from "@mui/icons-material/Search"; // Icon for searching tables
import EventAvailableIcon from "@mui/icons-material/EventAvailable"; // Icon for date and time

const AvailableTableLists = ({ filteredTables, loading, name, dateTime, people, tableType, handleReserve }) => {

  const handleReservation = (table_id) => {
    const formattedDate = dateTime.format("YYYY-MM-DD");
    const formattedTime = dateTime.format("HH:mm");
  
    console.log("Handling Reservation for Table ID:", table_id);
    console.log("Name:", name);
    console.log("Date:", formattedDate);
    console.log("Time:", formattedTime);
    console.log("Number of People:", people);
    handleReserve(event,table_id);


  };
  
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
    <div className="mt-6 h-[35rem] overflow-hidden">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Available Tables
      </h3>

      <div className="grid grid-cols-1 p-4 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto no-scrollbar">
        {filteredTables.map((table) => (
          <div
            key={table.table_id}
            className="p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {/* Table ID without black background and hash */}
            <div className="text-lg font-bold text-gray-900 mb-4">
              Table {table.table_id}
            </div>

            {/* Table Type with Icon (using TableRestaurantIcon) */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <TableRestaurantIcon className="text-blue-500" />
              <span>{table.description}</span> {/* No "Type" label, just description */}
            </div>

            {/* Capacity with Icon */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <EventSeatIcon className="text-green-500" />
              <span>{table.seating_capacity} people</span> {/* No "Capacity" label, just the number */}
            </div>

            {/* Reserve Button */}
            <button
              onClick={(()=>{handleReservation(table.table_id)})} 
              className="mt-4 w-full p-2 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Let's Find Your Ideal Table!
      </h2>

      <div className="mt-6 flex flex-col items-center justify-center space-y-6 text-gray-600">
        {/* First section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-blue-200 rounded-full mr-2">
            <SearchIcon className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm">Choose a Table Type</p>
        </div>

        {/* Second section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-green-200 rounded-full mr-2">
            <SearchIcon className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm">View Available Tables</p>
        </div>

        {/* Third section */}
        <div className="flex items-center justify-center">
          <div className="p-3 bg-blue-200 rounded-full mr-2">
            <EventAvailableIcon className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm">Choose a Date and Number of People</p>
        </div>
      </div>
    </div>
  );
};

export default AvailableTableLists;

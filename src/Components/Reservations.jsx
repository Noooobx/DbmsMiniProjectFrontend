import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Reservations = () => {
  const [tables, setTables] = useState(null);

  const fetchTableInfo = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/reservations`, {
        withCredentials: true,
      });
      setTables(result.data);
    } catch (error) {
      console.error("Error in fetchTableInfo:", error);
    }
  };

  const handleCancel = async (tableID) => {
    try {
      const result = await axios.get(
        `${BASE_URL}/reservations/remove/${tableID}`,
        {
          withCredentials: true,
        }
      );
      setTables(result.data.data);
    } catch (error) {
      console.error("Error in fetchTableInfo:", error);
    }
  };

  useEffect(() => {
    fetchTableInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 text-gray-800 mt-16">
      {/* Header Section */}
      <header className="py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-400">
          Table Reservations
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow mx-4 lg:mx-20 my-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                    Table ID
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Date</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Time</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                    No. of People
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tables &&
                  tables.map((reservation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all border-b"
                    >
                      <td className="py-2 px-3 sm:py-3 sm:px-4">
                        {reservation.table_number}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">
                        {reservation.date}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">
                        {reservation.time}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">
                        {reservation.no_of_people}
                      </td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => {
                            handleCancel(reservation.table_number);
                          }}
                          className="bg-red-600 text-white px-3 sm:px-5 py-2 rounded-md font-medium shadow hover:bg-red-700 transition"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Add Reservation Button */}
          <div className="flex justify-center mt-6">
            <Link to="/reserve/table">
              <button className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-md shadow hover:shadow-lg transform hover:scale-105 transition">
                + Make a Reservation
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservations;

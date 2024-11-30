import React from "react";
import { Link } from "react-router-dom";

const Reservations = () => {
  const dummyData = [
    { tableNumber: 1, date: "2024-12-01", time: "18:00", people: 4 },
    { tableNumber: 2, date: "2024-12-01", time: "19:00", people: 2 },
    { tableNumber: 3, date: "2024-12-01", time: "20:30", people: 6 },
    { tableNumber: 4, date: "2024-12-01", time: "21:00", people: 3 },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-200 text-gray-800 mt-16">
      {/* Header Section */}
      <header className="py-8">
        <h1 className="text-5xl font-bold text-center text-orange-400">
          Table Reservations
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-x-auto mx-4 lg:mx-20 my-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-3 px-4 border-b">Table Number</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Time</th>
                <th className="py-3 px-4 border-b">No. of People</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((reservation, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all border-b"
                >
                  <td className="py-3 px-4">{reservation.tableNumber}</td>
                  <td className="py-3 px-4">{reservation.date}</td>
                  <td className="py-3 px-4">{reservation.time}</td>
                  <td className="py-3 px-4">{reservation.people}</td>
                  <td className="py-3 px-4 flex gap-4">
                    <button className="flex items-center justify-center gap-2 btn bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-600 transform hover:scale-105 transition-all">
                      <span className="material-icons">edit</span>
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 btn bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transform hover:scale-105 transition-all">
                      <span className="material-icons">delete</span>
                      <span>Cancel</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Reservation Button */}
          <div className="flex justify-center mt-8">
            <Link to="/reserve/table">
              <button className="btn text-lg px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-lg transform hover:scale-105 transition-all">
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

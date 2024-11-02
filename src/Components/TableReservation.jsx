import axios from "axios";
import { useState } from "react";
import Header from "./Header";

const TableReservation = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  const handleReserve = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:3004/reserve/table",
      { date, time, people },
      {
        withCredentials: true,
      }
    );
    console.log(result);
    console.log("Reservation made:", {
      name,
      date,
      time,
      people,
      specialRequests,
    });
  };

  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')`,
        }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Reserve Your Table 🍽️
          </h2>
          <form onSubmit={handleReserve} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reservation Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reservation Time
              </label>
              <input
                type="time"
                required
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People
              </label>
              <input
                type="number"
                min="1"
                required
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Requests
              </label>
              <textarea
                placeholder="Any special requests?"
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
            >
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;

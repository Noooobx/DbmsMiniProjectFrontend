import { useState } from "react";

const TableReservation = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);
  const [error, setError] = useState('');

  const handleReserve = (e) => {
    e.preventDefault();
    if (!name || !date || !time) {
      setError('Please fill out all fields.');
    } else {
      setError('');
      // Logic for handling reservation
      console.log('Reservation made:', { name, date, time, people });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')`,
      }}
    >
      <div className="w-full max-w-lg p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-2">
          Reserve Your Table 🍽️
        </h2>
        <p className="text-center text-lg text-gray-600 mb-4">
          Experience the taste of culinary excellence!
        </p>
        {error && <div className="p-2 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleReserve} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-md transition duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:shadow-lg hover:shadow-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Reservation Date
            </label>
            <input
              type="date"
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-md transition duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:shadow-lg hover:shadow-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Reservation Time
            </label>
            <input
              type="time"
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-md transition duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:shadow-lg hover:shadow-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Number of People
            </label>
            <input
              type="number"
              min="1"
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-md transition duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:shadow-lg hover:shadow-lg"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:bg-gradient-to-l transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Reserve Table
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableReservation;

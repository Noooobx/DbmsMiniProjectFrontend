import React, { useState } from "react";
import axios from "axios"; // Import Axios
import AvailableTableLists from "./AvailableTableLists";
import { ThreeDots } from "react-loader-spinner"; // Import ThreeDots loader component
import { BASE_URL, LoginPageBG } from "../utils/constants"; // Assuming constants
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Ensure dayjs is available
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material"; // Import MUI components

const TableReservation = () => {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(dayjs()); // State to hold date and time as a dayjs object
  const [people, setPeople] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [tableType, setTableType] = useState(""); // State for table type dropdown
  const [tableInfo, setTableInfo] = useState([]); // To store the fetched table information
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/reserve",
        {
          name,
          date: dateTime.format("YYYY-MM-DD"),
          time: dateTime.format("HH:mm"),
          people,
          specialRequests,
        },
        { withCredentials: true }
      );
      console.log("Reservation successful!", response.data);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.log("Reservation failed.", error.response?.data?.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  const fetchTableInfo = async (tableinfo, people) => {
    if (!tableinfo) return; // Don't fetch if no table type is selected
    console.log(people, tableInfo);
    setLoading(true);

    try {
      // Adding a 1-second delay before making the actual API request
      setTimeout(async () => {
        try {
          const result = await axios.get(
            `${BASE_URL}/tableinfo?tableType=${tableinfo}&seating_capacity=${people}`,
            {
              withCredentials: true,
            }
          );
          console.log(result);
          setTableInfo(result.data);
        } catch (error) {
          console.error("Error fetching table info:", error);
          setError("Failed to fetch table information.");
        } finally {
          setLoading(false);
        }
      }, 500); // 1000 ms delay (1 second)
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${LoginPageBG})`,
      }}
    >
      <div className="flex w-full max-w-4xl py-8 pl-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="w-full flex flex-col">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Reserve Your Table
          </h2>

          <p className="text-center text-lg text-gray-700 mb-6">
            Please fill out the details below to reserve your table.
          </p>

          {/* Reservation Form */}
          <form onSubmit={handleReserve} className="space-y-6">
            {/* Name (Updated to use TextField) */}
            <div>
              <TextField
                id="name-input"
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </div>

            {/* Date and Time (Updated to take full width) */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={dateTime}
                  onChange={setDateTime}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      className="mt-1 "
                      variant="outlined"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {/* Number of People (Using MUI TextField for Number Input) */}
            <div>
              <TextField
                label="Number of People"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 1, // Ensures the number cannot be less than 1
                  },
                }}
                fullWidth
                variant="outlined"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
              />
            </div>

            {/* Table Type (Using Material UI Select dropdown) */}
            <div>
              <FormControl fullWidth>
                <InputLabel id="table-type-label">Table Type</InputLabel>
                <Select
                  labelId="table-type-label"
                  id="table-type-select"
                  value={tableType}
                  label="Table Type"
                  onChange={(e) => setTableType(e.target.value)}
                >
                  <MenuItem value="window_side">Window Side</MenuItem>
                  <MenuItem value="corner">Corner</MenuItem>
                  <MenuItem value="middle">Middle</MenuItem>
                  <MenuItem value="outdoor">Outdoor</MenuItem>
                  <MenuItem value="side_near_kitchen">Near Kitchen</MenuItem>
                  <MenuItem value="near_entrance">Near Entrance</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="balcony">Balcony</MenuItem>
                  <MenuItem value="rooftop">Rooftop</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Button to fetch and show available tables */}
            <button
              type="button"
              onClick={() => fetchTableInfo(tableType, people)} // Fetch table info on click
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md shadow-md hover:bg-gradient-to-l transition duration-200"
            >
              Show Available Tables
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-center text-red-600">{error}</div>
            )}
          </form>
        </div>

        {/* Available Tables Section */}
        <div className="w-full flex px-10 flex-col mt-6">
        {loading ? (
  <div className="flex justify-center items-center w-full h-full">
    <ThreeDots height="80" width="80" color="orange" ariaLabel="loading" />
  </div>
) : (
  <AvailableTableLists filteredTables={tableInfo} loading={loading} />
)}

        </div>
      </div>
    </div>
  );
};

export default TableReservation;

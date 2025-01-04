import { useState } from "react";
import axios from "axios";
import AvailableTableLists from "./AvailableTableLists";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL, LoginPageBG } from "../utils/constants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material"; // Import MUI components
import { useNavigate } from "react-router-dom";
import ReservationSuccessModal from "./modals/ReservationSuccessModal"; // Import the modal component

const TableReservation = () => {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(dayjs());
  const [people, setPeople] = useState(1);
  const [tableType, setTableType] = useState("");
  const [tableInfo, setTableInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleReserve = async (e, tablenumber) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/reserve/table",
        {
          tablenumber,
          name,
          date: dateTime.format("YYYY-MM-DD"),
          time: dateTime.format("HH:mm"),
          people,
        },
        { withCredentials: true }
      );
      console.log("Reservation successful!", response.data);
      setOpenModal(true); // Open modal on successful reservation
    } catch (error) {
      console.log("Reservation failed.", error.response?.data?.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  const fetchTableInfo = async (tableinfo, people) => {
    if (!tableinfo) return; // Don't fetch if no table type is selected
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
          setTableInfo(result.data);
        } catch (error) {
          console.error("Error fetching table info:", error);
          setError("Failed to fetch table information.");
        } finally {
          setLoading(false);
        }
      }, 500); // 500 ms delay
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-evenly items-center px-4 w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${LoginPageBG})`,
      }}
    >
      <div className="flex mt-16 flex-col md:flex-row w-full md:max-w-4xl py-8 px-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="w-full flex flex-col">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Reserve Your Table
          </h2>

          {/* Reservation Form */}
          <form
            onSubmit={handleReserve}
            className="space-y-6 flex flex-col justify-evenly h-full"
          >
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

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={dateTime}
                  onChange={(newDate) => setDateTime(newDate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      className="mt-1"
                      variant="outlined"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

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
              <ThreeDots
                height="80"
                width="80"
                color="orange"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <AvailableTableLists
              filteredTables={tableInfo}
              loading={loading}
              name={name}
              dateTime={dateTime}
              people={people}
              tableType={tableType}
              handleReserve={handleReserve}
            />
          )}
        </div>
      </div>

      {/* Reservation Success Modal */}
      <ReservationSuccessModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          navigate("/reservations"); // Navigate to /reservations when modal is closed
        }}
      />
    </div>
  );
};

export default TableReservation;

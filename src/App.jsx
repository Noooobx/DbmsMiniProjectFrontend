import "./App.css";
import MenuPage from "./Components/MenuPage";
import TableReservation from "./Components/TableReservation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserve/table" element={<TableReservation />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;

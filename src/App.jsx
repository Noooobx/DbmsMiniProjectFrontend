import "./App.css";
import Login from "./Components/Login";
import MenuPage from "./Components/MenuPage";
import TableReservation from "./Components/TableReservation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reserve/table" element={<TableReservation />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;

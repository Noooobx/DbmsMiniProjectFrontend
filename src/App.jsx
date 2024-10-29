import "./App.css";
import MenuPage from "./Components/MenuPage";
import TableReservation from "./Components/TableReservation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route path="/reserve/table" element={<TableReservation />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;

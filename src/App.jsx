import "./App.css";
import MenuPage from "./Components/MenuPage";
import TableReservation from "./Components/TableReservation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Orders from "./Components/Orders";
import Cart from "./Components/Cart";
import { Provider } from "react-redux";
import store from "./utils/store";
import Checkout from "./Components/Checkout";
import Profile from "./Components/Profile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Reservations from "./Components/Reservations";

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Add bg-gray-300 to the root container */}
        <div className="bg-gray-200 min-h-screen">
          <Header />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reserve/table" element={<TableReservation />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

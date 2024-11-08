import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LoginPageBG } from "../utils/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { toggleIsLoggedIn, setEmail, setUserId } from "../utils/loginSlice"; // Import setEmail here

const Login = () => {
  const [email, setEmailState] = useState(""); // Renamed state variable to avoid conflict
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Log the user in with the entered details.
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful!", response.data.data[0].email);

      // Dispatch actions to update Redux store with login status and email
      dispatch(toggleIsLoggedIn()); // Toggling login status
      console.log(response.data.data[0].user_id)
      dispatch(setEmail(response.data.data[0].email)); // Setting the email
      dispatch(setUserId(response.data.data[0].user_id))

      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.log("Login failed.", error.response.data.message);
      setError(error.response.data.message); // Set the error message from the server response
    }
  };

  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${LoginPageBG})`,
        }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Welcome Back!
          </h2>

          <p className="text-center text-lg text-gray-700">
            Please log in to your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Email"
                className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmailState(e.target.value)} // Set email state value
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Password"
                className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              {error}
            </div>
          )}

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LoginPageBG } from "../utils/constants";
import Header from "./Header";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // Sign in the user with the credentials/
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          userName,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
      console.log("Signup successful!", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Signup failed." + error);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${LoginPageBG})`,
        }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <p className="text-center text-lg text-gray-700">
            Join us for an exclusive dining experience!
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your Name"
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Create new password"
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                required
                className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select your role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

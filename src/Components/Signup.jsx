import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [userName, setUserName] = useState(""); // Changed to userName
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(userName, email, password, role);

    try {
      const response = await axios.post("http://localhost:3004/signup", {
        userName, // Changed to userName
        email,
        password,
        role,
      });

      console.log("Signup successful!", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503591099259-a96e250e0a67?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMHRhYmxlfGVufDB8fDB8fHww')`,
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-85 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Create Your Account
        </h2>
        <p className="text-center text-lg text-gray-600">
          Join us for an exclusive dining experience!
        </p>
        {error && <div className="p-2 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter your username"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={userName} // Changed to userName
              onChange={(e) => setUserName(e.target.value)} // Changed to userName
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john.doe@example.com"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

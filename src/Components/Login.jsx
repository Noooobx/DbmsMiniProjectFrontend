import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || "Login failed. Please try again.");
    } else {
      // Handle successful login (e.g., redirect to homepage)
      console.log("Login successful!");
      // Add your redirection logic here
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
          Welcome to DineSpot
        </h2>
        <p className="text-center text-lg text-gray-600">
          Your culinary adventure awaits!
        </p>
        {error && <div className="p-2 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john.doe@example.com"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              style={{ backgroundColor: "white" }}
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
              style={{ backgroundColor: "white" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Do not have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

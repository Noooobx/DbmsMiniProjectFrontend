import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Ensure this library is installed for cookie management
import axios from 'axios'; // Import Axios

const Profile = () => {
  const navigate = useNavigate();

  // Dummy user information
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield, USA"
  };

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await axios.post('http://localhost:3004/logout', {}, { withCredentials: true });
      console.log("Logout Response:", response.data); // Log the server response

      // Log the current state of cookies for debugging
      console.log('Removing user cookie:', Cookies.get('user'));
      Cookies.remove('user'); // Remove the user cookie or any other relevant data
      
      // Ensure the token name and path are correct
      console.log('Removing token cookie:', Cookies.get('token'));
      Cookies.remove('token', { path: '/' }); // Clear the authentication token with the correct path

      // Redirect to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error.response ? error.response.data : error.message);
      alert("Logout failed. Please try again."); // Alert user about logout failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <p className="text-lg">{userInfo.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <p className="text-lg">{userInfo.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone:</label>
          <p className="text-lg">{userInfo.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <p className="text-lg">{userInfo.address}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 mt-4 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow hover:bg-gradient-to-l transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

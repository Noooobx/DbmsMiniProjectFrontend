import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setEmail } from "../utils/loginSlice";
import Header from "./Header";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const islogged = useSelector((state) => state.login.isLoggedIn);
  const email = useSelector((store) => store.login.email);

  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUserInfo = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/users?email=${email}`, { withCredentials: true });
      if (result.data && result.data.length > 0) {
        const user = result.data.data[0];
        setUsername(user.username);
        setPhone(user.phone || "");
        setProfileImageUrl(user.image_url || "");
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  const handleLogout = async () => {
    try {
      // Send a request to logout route on server to clear the cookies server-side
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      
      // Alternatively, if cookies need to be deleted client-side:
      document.cookie = "your_cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      dispatch(setEmail(null)); // Clear Redux store
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        username,
        profileImageUrl,
        phone,
      };

      const result = await axios.put(`${BASE_URL}/users/${email}`, updatedData, { withCredentials: true });
      dispatch(setEmail(result.data.email));
      alert("Profile updated successfully");
    } catch (error) {
      console.log("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${BASE_URL}/path-to-your-background-image.jpg)`,
        }}
      >
        <div className="flex w-full max-w-4xl p-8 space-x-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <div className="w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Edit Your Profile
            </h2>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={profileImageUrl}
                  onChange={(e) => setProfileImageUrl(e.target.value)}
                  placeholder="Enter Profile Image URL"
                />
                {profileImageUrl && (
                  <img src={profileImageUrl} alt="Profile" className="mt-2 w-32 h-32 rounded-full" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={email}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
              >
                Save Changes
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow hover:bg-gradient-to-l transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Your Profile</h2>
            <div className="flex flex-col items-center space-y-4">
              {profileImageUrl && (
                <img src={profileImageUrl} alt="Profile" className="w-32 h-32 rounded-full shadow-md" />
              )}
              <div className="text-lg font-medium text-gray-700">
                Name: <span className="font-normal">{username}</span>
              </div>
              <div className="text-lg font-medium text-gray-700">
                Email: <span className="font-normal">{email}</span>
              </div>
              <div className="text-lg font-medium text-gray-700">
                Phone: <span className="font-normal">{phone || "Not provided"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

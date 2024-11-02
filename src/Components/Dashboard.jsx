import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6"
        style={{
          background: "linear-gradient(to bottom right, #FFA500, #007BFF)",
        }}
      >
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Savor Your Experience!
        </h1>
        <p className="text-lg text-center text-white mb-6">
          What would you like to do today?
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/reserve/table")}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
          >
            View Menu
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
          >
            Your Orders
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
          >
            Your Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

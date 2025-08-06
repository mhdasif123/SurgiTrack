import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Add this
import { AuthContext } from "../contexts/AuthContext";

const UsersDisplay = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // 👈 Create navigate function

  const handleLogout = () => {
    logout();           // 1. Perform logout
    navigate("/");      // 2. Redirect to login page
  };

  return (
    <div>
      {user ? (
        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-md text-center">
          <p>Logged in as: {user.name} ({user.role})</p>
          <button
            onClick={handleLogout}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-md">Guest</p>
      )}
    </div>
  );
};

export default UsersDisplay;

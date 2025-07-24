import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/* Displaying the user logged in, Log out button once logged in, and a default text when nobody is logged in */

const UsersDisplay = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-4 bg-gray-100 rounded">
      {user ? (
        <>
          <p className="text-green-600">Logged in as: {user.name} ({user.role})</p>
          <button
            onClick={logout}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-gray-600">No user is logged in.(Could display Guest as well)</p>
      )}
    </div>
  );
};

export default UsersDisplay;

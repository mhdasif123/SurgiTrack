import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // =========================
  // Guest View
  // =========================
  if (!user) {
    return (
      <header className="bg-gradient-to-tr from-blue-600 to-blue-400 w-full">
        <nav className="w-full shadow-md px-4 py-4 flex items-center justify-between">
          {/* Logo on the left */}
          <Link to="/" className="text-2xl font-bold text-primary-blue">
            <img
              src="surgiTrack_logo.png"
              alt="SurgiTrack Logo"
              className="w-36 md:w-48"
            />
          </Link>

          {/* Date & Time centered */}
          <div className="flex gap-3 mx-auto">
            <span
              className="px-4 py-2 rounded-md text-lg font-semibold text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.17)" }}
            >
              {date}
            </span>
            <span
              className="px-4 py-2 rounded-md text-lg font-semibold text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.17)" }}
            >
              {time}
            </span>
          </div>

          {/* Empty placeholder for balance */}
          <div className="w-36 md:w-48" />
        </nav>
      </header>
    );
  }

  // =========================
  // Logged-in View
  // =========================
  const isAdmin = user.role?.toLowerCase() === "admin";
  const isStaff = user.role?.toLowerCase() === "surgical";

  const openPublicDashboard = () => {
    window.open("/waiting-room", "_blank");
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-gradient-to-tr from-blue-600 to-blue-400 w-full">
      <nav className="w-full shadow-md px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Logo + Role */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold text-primary-blue">
              <img
                src="surgiTrack_logo.png"
                alt="SurgiTrack Logo"
                className="w-36 md:w-48"
              />
            </Link>
            <div className="hidden sm:block">
              <span className="px-4 py-2 ml-6 bg-white/20 text-white rounded-md text-md font-semibold">
                {user.role} - {user.name}
              </span>
            </div>
          </div>

          {/* Center - Date & Time */}
          <div className="flex gap-3">
            <span
              className="px-4 py-2 rounded-md text-lg font-semibold text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.17)" }}
            >
              {date}
            </span>
            <span
              className="px-4 py-2 rounded-md text-lg font-semibold text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.17)" }}
            >
              {time}
            </span>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center space-x-3">
            {isAdmin && (
              <Link
                to="/Dashboard"
                className="px-4 py-2 text-white rounded-md text-xl font-semibold hover:bg-white/17 transition-colors"
              >
                🏥 Dashboard
              </Link>
            )}

            {!isStaff && (
              <button
                onClick={openPublicDashboard}
                className="px-4 py-2 bg-blue-800 text-white rounded-md text-md font-semibold shadow-md hover:bg-blue-900 transition-colors"
              >
                Public Dashboard
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-(--color-danger) text-white rounded-md text-md font-semibold shadow-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>

            <div className="sm:hidden">
              <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold shadow-md">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

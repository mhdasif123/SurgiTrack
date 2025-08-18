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
  // Guest View (Mobile-first responsive)
  // =========================
  if (!user) {
    return (
      <header className="bg-gradient-to-tr from-blue-600 to-blue-400 w-full">
        <nav className="w-full shadow-md px-4 py-4">
          {/* Mobile Layout: Just Logo Centered */}
          <div className="flex items-center justify-center md:hidden">
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary-blue">
              <img
                src="surgiTrack_logo.png"
                alt="SurgiTrack Logo"
                className="w-32"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop Layout: Logo + Date/Time + Empty Space */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo on the left */}
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary-blue">
              <img
                src="surgiTrack_logo.png"
                alt="SurgiTrack Logo"
                className="w-36 lg:w-48"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Date & Time centered */}
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

            {/* Empty placeholder for balance */}
            <div className="w-36 lg:w-48" />
          </div>
        </nav>
      </header>
    );
  }

  // =========================
  // Logged-in View (Mobile-first responsive)
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
        {/* Mobile Layout: Logo Centered, Buttons Stacked Below */}
        <div className="md:hidden">
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary-blue">
              <img
                src="surgiTrack_logo.png"
                alt="SurgiTrack Logo"
                className="w-32"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>
          
          {/* User Info */}
          <div className="flex justify-center mb-3">
            <span className="px-3 py-1 bg-white/20 text-white rounded-md text-sm font-semibold">
              {user.role} - {user.name}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {isAdmin && (
              <Link
                to="/Dashboard"
                className="px-3 py-1 text-white rounded-md text-sm font-semibold hover:bg-white/17 transition-colors"
              >
                🏥 Dashboard
              </Link>
            )}

            {!isStaff && (
              <button
                onClick={openPublicDashboard}
                className="px-3 py-1 bg-blue-800 text-white rounded-md text-sm font-semibold shadow-md hover:bg-blue-900 transition-colors"
              >
                Public Dashboard
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold shadow-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Desktop Layout: Original Three Column Layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left Side - Logo + Role */}
          <div className="flex items-center space-x-2">
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary-blue">
              <img
                src="surgiTrack_logo.png"
                alt="SurgiTrack Logo"
                className="w-36 lg:w-48"
                loading="eager"
                decoding="async"
              />
            </Link>
            <div>
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
              className="px-4 py-2 bg-red-500 text-white rounded-md text-md font-semibold shadow-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
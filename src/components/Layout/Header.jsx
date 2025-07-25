import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SurgiTrack
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm text-gray-600 hover:underline">
            Staff Dashboard
          </Link>
          <span className="text-gray-600 text-sm">
            Current Time: {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Link to the main page */}
        <Link to="/" className="text-2xl font-bold text-primary-blue">
          SurgiTrack
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/waiting-room" className="text-sm text-gray-700 hover:text-primary-blue">
            Waiting Room
          </Link>
          <Link to="/dashboard" className="text-sm text-gray-700 hover:text-primary-blue">
            Staff Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
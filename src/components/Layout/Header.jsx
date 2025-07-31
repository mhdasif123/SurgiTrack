import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date: "Jul 31, 2025"
      const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      // Format time: "10:45 AM"
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-tr from-blue-600 to-blue-400 w-full relative">
      <nav className="w-full shadow-md px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary-blue">
          <img src="surgiTrack_logo.png" alt="SurgiTrack Logo" className="w-36 md:w-48" />
        </Link>

        {/* Centered Date & Time */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-3">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-md">
            {date}
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-md">
            {time}
          </span>
        </div>

        {/* Empty div to preserve spacing on the right */}
        <div className="w-24 md:w-32"></div>
      </nav>
    </header>
  );
};

export default Header;

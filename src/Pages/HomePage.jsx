import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary-blue mb-4">Welcome to SurgiTrack</h1>
      <p className="mb-8">Your real-time surgical status tracker.</p>

      <div className="p-6 border rounded-lg max-w-md mx-auto bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Navigation Links</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/waiting-room" className="text-blue-600 hover:underline">View Public Waiting Room Dashboard</Link>
          <Link to="/status/A312F2" className="text-blue-600 hover:underline">View Guest Status Page (Example)</Link>
          <Link to="/dashboard" className="text-blue-600 hover:underline">View Staff Dashboard</Link>
          <Link to="/admin/add-patient" className="text-blue-600 hover:underline">View Admin: Add Patient</Link>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
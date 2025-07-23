import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // useNavigate is a hook to programmatically navigate after login
  const navigate = useNavigate();

  const handleGuestLogin = (e) => {
    e.preventDefault();
    // In the future, you'll get the ID from the form input
    const mockPatientId = 'A312F2';
    navigate(`/status/${mockPatientId}`);
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary-blue">SurgiTrack</h1>
        <p className="text-gray-600">Real-Time Surgical Status Tracker</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Guest Login Card */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Family & Friends</h2>
          <form onSubmit={handleGuestLogin}>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Patient ID
            </label>
            <input
              type="text"
              id="patientId"
              placeholder="e.g., A312F2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-primary-blue text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              View Status
            </button>
          </form>
        </div>

        {/* Staff Login Card */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Hospital Staff</h2>
          <form onSubmit={handleStaffLogin}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
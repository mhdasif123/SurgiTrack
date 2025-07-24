import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your page components
import LoginPage from '../Pages/LoginPage.jsx'; //
import PublicDashboardPage from '../Pages/PublicDashboardPage';
import GuestStatusPage from '../Pages/GuestStatusPage';
import StaffDashboardPage from '../Pages/StaffDashboardPage';
// ... other imports

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} /> {/* <-- THIS IS THE MAIN CHANGE */}
      <Route path="/waiting-room" element={<PublicDashboardPage />} />
      <Route path="/status/:patientId" element={<GuestStatusPage />} />

      {/* Staff & Admin Routes */}
      <Route path="/dashboard" element={<StaffDashboardPage />} />
      {/* ... other routes */}
    </Routes>
  );
};

export default AppRoutes;
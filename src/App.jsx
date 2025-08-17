import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import LoginPage from "./Pages/LoginPage";
import PublicDashboardPage from "./Pages/PublicDashboardPage";
import GuestStatusPage from "./Pages/GuestStatusPage";
import StaffDashboardPage from "./Pages/StaffDashboardPage";
import SearchPatientPage from "./Pages/SearchPatientPage";
import UpdatePatientStatusPage from "./Pages/UpdatePatientStatusPage";
import AddPatientPage from "./Pages/admin/AddPatientPage";
import EditPatientPage from "./Pages/admin/EditPatientPage";
import Footer from "./components/Layout/Footer";
import ErrorPage from "./Pages/ErrorPage";
import ChatbotIcon from "./components/UI/ChatbotIcon";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import AuthProvider from "./contexts/AuthProvider"; // Add this import
import { PatientProvider } from "./contexts/PatientProvider"; // Add this import
import PrivateRoute from "./components/PrivateRoute";
import SurgicalUpdatePage from "./Pages/surgicalUpdatePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <ChatbotProvider>
          <div className="min-h-screen bg-blue-100 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/waiting-room" element={<PublicDashboardPage />} />
                <Route path="/status/:patientId" element={<GuestStatusPage />} />
                <Route path="/search-patient" element={<SearchPatientPage />} />

                {/* Protected routes - Fixed to include "surgical" role */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute allowedRoles={["surgical", "admin"]}>
                      <StaffDashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/update-status"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <UpdatePatientStatusPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/surgical-update"
                  element={
                    <PrivateRoute allowedRoles={["surgical"]}>
                      <SurgicalUpdatePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/add-patient"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <AddPatientPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/edit-patient"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <EditPatientPage />
                    </PrivateRoute>
                  }
                />

                {/* Catch all */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
            <ChatbotIcon />
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </ChatbotProvider>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
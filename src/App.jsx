import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import LoginPage from './Pages/LoginPage';
import PublicDashboardPage from './Pages/PublicDashboardPage';
import GuestStatusPage from './Pages/GuestStatusPage';
import StaffDashboardPage from './Pages/StaffDashboardPage';
import SearchPatientPage from './Pages/SearchPatientPage'; 
import AddPatientPage from './Pages/admin/AddPatientPage';
import EditPatientPage from './Pages/admin/EditPatientPage';
import Footer from './components/Layout/Footer'
import ErrorPage from './Pages/ErrorPage'
import ChatbotIcon from './components/UI/ChatbotIcon';
import { ChatbotProvider } from './contexts/ChatbotContext';


function App() {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/waiting-room" element={<PublicDashboardPage />} />
            <Route path="/status/:patientId" element={<GuestStatusPage />} />
            <Route path="/dashboard" element={<StaffDashboardPage />} />
            <Route path="/search-patient" element={<SearchPatientPage />} />
            <Route path="/admin/add-patient" element={<AddPatientPage />} />
            <Route path="/admin/edit-patient/" element={<EditPatientPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotIcon />
      </div>
    </ChatbotProvider>
  );
}

export default App;
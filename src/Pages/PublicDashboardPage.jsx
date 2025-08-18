import React from 'react';
import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../contexts/PatientContext";

const statusStyles = {
  "Checked In": "bg-blue-100 text-blue-600",
  "Pre-Procedure": "bg-yellow-100 text-yellow-600",
  "In-Progress": "bg-green-100 text-green-600",
  "Recovery": "bg-purple-100 text-purple-600",
  "Complete": "bg-gray-100 text-gray-600",
};

const PublicDashboardPage = () => {
  const { patients } = useContext(PatientContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const pageSize = 12;

  // Handle screen resize for responsive grid
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive grid columns based on screen width
  const getGridColumns = () => {
    if (screenWidth >= 2000) return 'repeat(6, minmax(0, 1fr))';
    if (screenWidth >= 1024) return 'repeat(4, minmax(0, 1fr))';
    if (screenWidth >= 768) return 'repeat(2, minmax(0, 1fr))';
    return '1fr';
  };

  if (!patients) {
    return (
      <div className="min-h-screen bg-blue-50 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Public Waiting Room Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Status display for waiting room
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-600">Loading patients...</div>
          </div>
        </div>
      </div>
    );
  }

  const activePatients = patients.filter(p => p.currentStatus !== "Dismissal");
  const totalPages = Math.ceil(activePatients.length / pageSize);

  useEffect(() => {
    if (totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 20000); // Always 20 seconds regardless of patient count
    
    return () => clearInterval(interval);
  }, [totalPages]);

  const visiblePatients = activePatients.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-5/6 mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Public Waiting Room Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Status display for waiting room
        </p>

        {/* White container for grid */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Patient Cards Grid - Responsive for different screen sizes */}
          <div className="gap-6" 
               style={{display: 'grid', gridTemplateColumns: getGridColumns(), gap: '1.5rem'}}>
            {visiblePatients.map((patient) => {
              return (
                <div
                  key={patient.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      ID: {patient.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[patient.currentStatus] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {patient.currentStatus}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-700 mb-1">
                      {patient.procedure}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(patient.lastUpdated).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}{" "}
                      {new Date(patient.lastUpdated).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    i === currentPage ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {activePatients.length === 0 && (
            <div className="bg-gray-50 rounded-lg shadow-md p-12 text-center mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Active Patients
              </h3>
              <p className="text-gray-500">
                The waiting room is currently empty
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicDashboardPage;
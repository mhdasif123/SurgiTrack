import React from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PatientContext } from "../contexts/PatientContext";
import { AuthContext } from "../contexts/AuthContext";

const statusStyles = {
  "Checked In": "bg-blue-100 text-blue-600",
  "Pre-Procedure": "bg-yellow-100 text-yellow-600",
  "In-Progress": "bg-green-100 text-green-600",
  "Recovery": "bg-purple-100 text-purple-600",
  "Complete": "bg-gray-100 text-gray-600",
};

const PublicDashboardPage = () => {
  const { patients } = useContext(PatientContext);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;

  if (!patients) {
    return (
      <div>
        <div className="min-h-screen bg-blue-50 px-4 py-10 relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Public Waiting Room Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Status display for waiting room
            </p>
            <div className="text-center py-10 text-gray-600">Loading patients...</div>
          </div>
        </div>
      </div>
    );
  }

  // Filter out dismissed patients
  const activePatients = patients.filter(p => p.currentStatus !== "Dismissal");
  
  // Calculate pagination
  const totalPages = Math.ceil(activePatients.length / pageSize);
  
  // Auto-cycle through pages every 20 seconds
  useEffect(() => {
    if (totalPages <= 1) return; // Don't set interval if only one page or no pages
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 20000);
    return () => clearInterval(interval);
  }, [totalPages]);
  
  // Get visible patients for current page
  const visiblePatients = activePatients.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div>
      <div className="min-h-screen bg-blue-50 px-4 py-10 relative">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Public Waiting Room Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Status display for waiting room
          </p>
          
          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePatients.map((patient, index) => {
              const patientNumber = (currentPage * pageSize) + index + 1;
              
              return (
                <div key={patient.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Patient #{patientNumber}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[patient.currentStatus] || "bg-gray-100 text-gray-600"
                    }`}>
                      {patient.currentStatus}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-base font-medium text-gray-700 mb-1">
                      {patient.procedure}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(patient.lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })} {new Date(patient.lastUpdated).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
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
                    i === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {activePatients.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Patients</h3>
              <p className="text-gray-500">The waiting room is currently empty</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default PublicDashboardPage;
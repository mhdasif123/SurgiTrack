import React from 'react';
import { mockPatients } from '../data/mockData';

const PublicDashboardPage = () => {
  const getStatusColor = (status) => {
    const colors = {
      'Checked In': 'bg-blue-100 text-blue-800',
      'Pre-Procedure': 'bg-yellow-100 text-yellow-800',
      'In-Progress': 'bg-green-100 text-green-800',
      'Recovery': 'bg-purple-100 text-purple-800',
      'Complete': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Public Waiting Room Dashboard</h1>
      <p className="mb-6 text-gray-600">Anonymized patient status display for waiting room monitor.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockPatients.map((patient, index) => (
          <div key={patient.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">Patient #{index + 1}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.currentStatus)}`}>
                {patient.currentStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600">{patient.procedure}</p>
            <p className="text-xs text-gray-500 mt-2">Last updated: {patient.lastUpdated}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicDashboardPage;
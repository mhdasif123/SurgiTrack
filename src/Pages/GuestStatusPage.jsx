import React from 'react';
import { useParams } from 'react-router-dom';
import { mockPatients } from '../data/mockData';

const GuestStatusPage = () => {
  const { patientId } = useParams();
  const patient = mockPatients.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Patient Not Found</h1>
        <p className="mt-4">Patient ID "{patientId}" not found in our system.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'Checked In': 'bg-blue-500',
      'Pre-Procedure': 'bg-yellow-500',
      'In-Progress': 'bg-green-500',
      'Recovery': 'bg-purple-500',
      'Complete': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Patient Status</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{patient.name}</h2>
          <p className="text-gray-600">Patient ID: {patient.id}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium text-gray-700">Procedure:</h3>
          <p className="text-lg">{patient.procedure}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium text-gray-700">Current Status:</h3>
          <div className="flex items-center mt-2">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(patient.currentStatus)} mr-2`}></div>
            <span className="text-lg font-medium">{patient.currentStatus}</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Last Updated:</h3>
          <p className="text-sm text-gray-600">{patient.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default GuestStatusPage;
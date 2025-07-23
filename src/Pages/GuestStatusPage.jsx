import React from 'react';
import { useParams } from 'react-router-dom';

const GuestStatusPage = () => {
  const { patientId } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">Patient Status</h1>
      <p className="mt-4">Displaying status for Patient ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{patientId}</span></p>
    </div>
  );
};

export default GuestStatusPage;
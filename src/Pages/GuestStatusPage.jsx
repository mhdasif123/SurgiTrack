import React from 'react';
import { useParams } from 'react-router-dom';

const GuestStatusPage = () => {
  const { patientId } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">Patient Status Page</h1>
      <p className="mt-2">Showing status for Patient ID: {patientId}</p>
    </div>
  );
};

export default GuestStatusPage;
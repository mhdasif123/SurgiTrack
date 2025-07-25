import React from 'react';
import { useParams } from 'react-router-dom';

const StatusHistoryPage = () => {
  const { patientId } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">Status History Page</h1>
      <p className="mt-2">Showing history for Patient ID: {patientId}</p>
    </div>
  );
};

export default StatusHistoryPage;
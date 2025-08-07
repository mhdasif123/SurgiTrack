import React from 'react';
import { useParams } from 'react-router-dom';
import { mockPatients } from '../../data/mockData';

const EditPatientPage = () => {
  const { patientId } = useParams();

 const patient = mockPatients.find(p => p.id === patientId);
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin: Edit Patient Page</h1>
      <p className="mt-2">Editing information for Patient ID: {patientId}</p>
    </div>
  );
};

export default EditPatientPage;
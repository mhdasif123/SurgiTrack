import React from 'react';
import { usePatientUpdate } from './Hooks/usePatientUpdate';
import { PatientInfoDisplay } from '../components/PatientInfoDisplay';
import { StatusSelect } from '../components/StatusSelect';
import { PatientNotFound } from '../components/PatientNotFound';

const UpdatePatientStatusComponent = () => {
  const {
    patient,
    patientName,
    newStatus,
    setNewStatus,
    allowedStatuses,
    isSubmitting,
    handleSubmit,
    goBack
  } = usePatientUpdate();

  if (!patient) {
    return <PatientNotFound onGoBack={goBack} />;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center p-3">
        Update Patient Status   
      </h1>
      
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <PatientInfoDisplay 
            patient={patient} 
            patientName={patientName} 
          />
          
          <StatusSelect
            value={newStatus}
            onChange={setNewStatus}
            options={allowedStatuses}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`block mx-auto w-full text-lg font-medium text-white py-4 rounded-md transition ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Status'}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePatientStatusComponent;
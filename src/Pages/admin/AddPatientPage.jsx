import React from 'react';
import { usePatientForm } from "../../components/Hooks/usePatientForm";
import { PatientForm } from "../../components/PatientForm";


const AddPatientPage = () => {
  const formHook = usePatientForm({
    redirectPath: '/dashboard',
    isEditMode: false
  });

  return (
    <PatientForm 
      title="Add New Patient"
      {...formHook}
    />
  );
};

export default AddPatientPage;
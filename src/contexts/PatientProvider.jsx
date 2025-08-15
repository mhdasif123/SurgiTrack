import { useEffect } from 'react';
import { mockPatients } from '../data/mockData.js';
import { PatientContext } from './PatientContext';
import LocalStorageHook from '../components/Hooks/LocalStorageHook.jsx';

export const PatientProvider = ({ children }) => {
  // Get patients from localStorage or initialize with mock data
  const [patients, setPatients] = LocalStorageHook("patients", mockPatients);

  useEffect(() => {
    // Initialize localStorage if empty
    if (!patients || patients.length === 0) {
      setPatients(mockPatients);
    }
  }, [patients, setPatients]);

  const addPatient = (patientObj) => {
    const newPatient = {
      ...patientObj,
      lastUpdated: new Date().toISOString()
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id, updateInfo) => {
    setPatients(prev => {
      if (!prev) return prev;

      return prev.map(p =>
        p.id === id ? { ...p, ...updateInfo, lastUpdated: new Date().toISOString() } : p
      );
    });
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

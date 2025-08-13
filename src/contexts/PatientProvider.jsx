import { useEffect } from 'react';
import {mockPatients} from '../data/mockData.js'
import { PatientContext } from './PatientContext'
import LocalStorageHook from '../components/Hooks/LocalStorageHook.jsx';


export const PatientProvider = ({ children }) => {
  // Using the hook to get the info from storage
    const [patients, setPatients] = LocalStorageHook("patients", null);

    useEffect(() => {
      if (!patients || patients === 0) {
        setPatients(mockPatients);  
      }
      ;
    }, [setPatients, patients])

    const addPatient = (patientObj) => {
      const newPatient = {
          ...patientObj,
          lastUpdated: new Date().toISOString()
      };
      setPatients(prev => [...prev, newPatient]);
    };

    const updatePatient = (id, updateInfo) => {
      setPatients(prev => (prev || []).map(p => (p.id === id ? {...p, ...updateInfo} : p)))
    }

  return (
    <PatientContext.Provider value={{patients, addPatient, updatePatient}}>
        {children}
    </PatientContext.Provider>
  )
}

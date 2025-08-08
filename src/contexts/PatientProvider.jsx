import { useEffect, useState } from 'react';
import {mockPatients} from '../data/mockData.js'
import { PatientContext } from './PatientContext'


export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        setPatients(mockPatients);
    }, [])

    const addPatient = (patientObj) => {
        const newPatient = {
            ...patientObj,
            lastUpdated: new Date().toISOString()
        };
        setPatients(prev => [...prev, newPatient]);
    };



    const updatePatient = (id, updateInfo) => {
        setPatients(prev => prev.map(p => (p.id === id ? {...p, ...updateInfo} : p)))
    }

  return (
    <PatientContext.Provider value={{patients, addPatient, updatePatient}}>
        {children}
    </PatientContext.Provider>
  )
}

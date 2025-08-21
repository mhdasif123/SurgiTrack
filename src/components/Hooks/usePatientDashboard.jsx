import { useContext, useState, useMemo } from 'react';
import { PatientContext } from "../../contexts/PatientContext";


import { AuthContext } from '../../contexts/AuthContext';

export const usePatientDashboard = () => {
  const { patients } = useContext(PatientContext);
  const { user } = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const isSurgical = useMemo(() => 
    user?.role?.toLowerCase() === "surgical", [user?.role]
  );

  const activePatients = useMemo(() => 
    patients?.filter(p => p.currentStatus !== "Dismissal") || [], 
    [patients]
  );

  const totalPages = Math.ceil(activePatients.length / pageSize);

  const visiblePatients = useMemo(() => 
    activePatients.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    ), [activePatients, currentPage, pageSize]
  );

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => setCurrentPage(prev => Math.max(0, prev - 1));
  const goToNext = () => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));

  return {
    user,
    patients,
    isSurgical,
    activePatients,
    visiblePatients,
    currentPage,
    totalPages,
    goToPage,
    goToPrevious,
    goToNext,
    isLoading: !user || !patients
  };
};
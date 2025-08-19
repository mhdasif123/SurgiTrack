import { useState, useMemo, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PatientContext } from '../../contexts/PatientContext';
import { STATUSES } from '../../data/mockData';
import { getAllowedStatuses, parsePatientName } from '../utils/patientUtils';
import toast from 'react-hot-toast';

export const usePatientUpdate = () => {
  const { patients, updatePatient } = useContext(PatientContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [newStatus, setNewStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patientId = searchParams.get('id');
  const patient = patients?.find((p) => p.id === patientId);

  const allowedStatuses = useMemo(() => {
    if (!patient) return [];
    return getAllowedStatuses(patient.currentStatus, STATUSES);
  }, [patient]);

  const patientName = useMemo(() => {
    return parsePatientName(patient?.name);
  }, [patient?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newStatus) {
      toast.error('Please select a new status');
      return;
    }

    setIsSubmitting(true);
    
    try {
      updatePatient(patient.id, {
        currentStatus: newStatus,
        lastUpdated: new Date().toISOString(),
      });
      
      toast.success(`Patient status updated to ${newStatus}`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update patient status');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => navigate(-1);

  return {
    patient,
    patientName,
    newStatus,
    setNewStatus,
    allowedStatuses,
    isSubmitting,
    handleSubmit,
    goBack
  };
};
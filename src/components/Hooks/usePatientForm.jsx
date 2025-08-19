import { useReducer, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientContext } from "../../contexts/PatientContext";

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

const initialState = {
  id: "",
  firstName: '',
  lastName: '',
  phoneNum: '',
  emailAddress: '',
  country: '',
  city: '',
  street: '',
  procedure: '',
  currentStatus: 'Checked In',
  isSubmitting: false,
  errors: {}
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null } // Clear field error
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };
    case 'RESET_FORM':
      return { ...initialState };
    default:
      return state;
  }
};

export const usePatientForm = (options = {}) => {
  const { redirectPath = '/dashboard', isEditMode = false, initialData = {} } = options;
  const { addPatient, updatePatient } = useContext(PatientContext);
  const navigate = useNavigate();
  
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    ...initialData
  });

  const generatedId = useMemo(() => nanoid(6), []);

  const validateForm = () => {
    const errors = {};

    if (!state.firstName.trim()) errors.firstName = 'First name is required';
    if (!state.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!state.phoneNum.trim()) {
      errors.phoneNum = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(state.phoneNum)) {
      errors.phoneNum = 'Phone number must be at least 10 digits';
    }
    
    if (!state.emailAddress.trim()) {
      errors.emailAddress = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    
    if (!state.country.trim()) errors.country = 'Country is required';
    if (!state.city.trim()) errors.city = 'City is required';
    if (!state.street.trim()) errors.street = 'Street is required';
    if (!state.procedure.trim()) errors.procedure = 'Procedure is required';

    return errors;
  };

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handlePhoneChange = (value) => {
    const onlyNums = value.replace(/\D/g, '');
    setField('phoneNum', onlyNums);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      toast.error('Please fix the errors before submitting');
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', value: true });

    try {
      const patientData = {
        id: isEditMode ? state.id || generatedId : generatedId,
        name: `${state.firstName.trim()} ${state.lastName.trim()}`,
        phoneNum: state.phoneNum,
        emailAddress: state.emailAddress,
        country: state.country,
        city: state.city,
        street: state.street,
        procedure: state.procedure,
        currentStatus: isEditMode ? state.currentStatus || "Checked In" : "Checked In",
        lastUpdated: new Date().toISOString(),
      };

      if (isEditMode) {
        updatePatient(state.id, patientData);
        toast.success('Patient updated successfully');
      } else {
        addPatient(patientData);
        toast.success('Patient added successfully');
      }

      navigate(redirectPath);
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update patient' : 'Failed to add patient');
      console.error('Form submission error:', error);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return {
   formData: state,
    generatedId,
    setField,
    handlePhoneChange,
    handleSubmit,
    resetForm,
    isEditMode
  };
};

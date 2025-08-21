import React from 'react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { MedicalInfoSection } from './MedicalInfoSection';
import { FormSubmitButton } from './FormSubmitButton';

export const PatientForm = ({ 
  title,
  formData = {},        // default empty object
  setField,
  handlePhoneChange,
  handleSubmit,
  generatedId,
  errors = {},          // default empty object
  isSubmitting,
  isEditMode = false
}) => (
  <>
    <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center p-3">
      {title}
    </h1>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <form className="space-y-8" onSubmit={handleSubmit}>
     <PersonalInfoSection
  formData={formData}
  setField={setField}
  handlePhoneChange={handlePhoneChange}
  errors={errors}
/>
<MedicalInfoSection
  formData={formData}
  setField={setField}
  generatedId={generatedId}
  errors={errors}
/>


        <FormSubmitButton 
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
        />
      </form>
    </div>
  </>
);

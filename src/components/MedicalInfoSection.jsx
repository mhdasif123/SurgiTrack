import React from 'react';
import { ValidatedFormField } from './ValidatedFormField';

export const MedicalInfoSection = ({
  formData = {},
  setField,
  generatedId,
  errors = {},
  isEditMode = false
}) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Medical Information</h2>

    <div className="flex flex-wrap gap-6">
      <ValidatedFormField
        label={isEditMode ? "Patient ID" : "ID Generated"}
        value={isEditMode ? formData.id || '' : generatedId || ''}
        readOnly
      />
      <ValidatedFormField
        label="Procedure"
        value={formData.procedure || ''}
        onChange={(value) => setField('procedure', value)}
        required
        error={errors.procedure}
      />
    </div>
  </div>
);

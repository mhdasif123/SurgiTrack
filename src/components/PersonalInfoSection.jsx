import React from 'react';
import { ValidatedFormField } from './ValidatedFormField';

export const PersonalInfoSection = ({ formData = {}, setField, handlePhoneChange, errors = {} }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Personal Information</h2>

    <div className="flex flex-wrap gap-6">
      <ValidatedFormField
        label="First Name"
        value={formData.firstName || ''}
        onChange={(value) => setField('firstName', value)}
        required
        error={errors.firstName}
      />
      <ValidatedFormField
        label="Last Name"
        value={formData.lastName || ''}
        onChange={(value) => setField('lastName', value)}
        required
        error={errors.lastName}
      />
      <ValidatedFormField
        label="Phone Number"
        value={formData.phoneNum || ''}
        onChange={handlePhoneChange} // handlePhoneChange already formats value
        required
        error={errors.phoneNum}
      />
      <ValidatedFormField
        label="Email Address"
        value={formData.emailAddress || ''}
        onChange={(value) => setField('emailAddress', value)}
        required
        error={errors.emailAddress}
      />
      <ValidatedFormField
        label="Country"
        value={formData.country || ''}
        onChange={(value) => setField('country', value)}
        required
        error={errors.country}
      />
      <ValidatedFormField
        label="City"
        value={formData.city || ''}
        onChange={(value) => setField('city', value)}
        required
        error={errors.city}
      />
      <ValidatedFormField
        label="Street"
        value={formData.street || ''}
        onChange={(value) => setField('street', value)}
        required
        error={errors.street}
      />
    </div>
  </div>
);

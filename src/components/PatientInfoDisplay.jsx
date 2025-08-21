import { FormField } from "./Formfield";


export const PatientInfoDisplay = ({ patient, patientName }) => (
  <div className="space-y-6">
    {/* Personal Info Row */}
    <div className="flex flex-wrap gap-6">
      <FormField 
        label="First Name" 
        value={patientName.firstName} 
        readOnly 
      />
      <FormField 
        label="Last Name" 
        value={patientName.lastName} 
        readOnly 
      />
      <FormField 
        label="Current Status" 
        value={patient.currentStatus} 
        readOnly 
      />
    </div>

    {/* ID and Procedure Row */}
    <div className="flex flex-wrap gap-6">
      <FormField 
        label="Patient ID" 
        value={patient.id} 
        readOnly 
      />
      <FormField 
        label="Procedure" 
        value={patient.procedure} 
        readOnly 
      />
    </div>

    {/* Address Row */}
    <div className="flex flex-wrap gap-6">
      <FormField 
        label="Street" 
        value={patient.street} 
        readOnly 
        className="min-w-[150px]"
      />
      <FormField 
        label="City" 
        value={patient.city} 
        readOnly 
        className="min-w-[150px]"
      />
      <FormField 
        label="Country" 
        value={patient.country} 
        readOnly 
        className="min-w-[150px]"
      />
    </div>

    {/* Contact Row */}
    <div className="flex flex-wrap gap-6">
      <FormField 
        label="Telephone" 
        value={patient.phoneNum} 
        readOnly 
      />
      <FormField 
        label="Email" 
        value={patient.emailAddress} 
        readOnly 
      />
    </div>
  </div>
);
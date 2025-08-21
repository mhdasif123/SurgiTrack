import { StatusBadge } from './StatusBadge';
import { PatientActionButtons } from './PatientActionButtons';

export const MobilePatientCard = ({ patient, isSurgical }) => (
  <div className="flex-shrink-0 w-80 bg-white shadow-xl rounded-2xl p-6">
    <div className="mb-4">
      <div className="font-semibold text-gray-800">{patient.name}</div>
      <div className="text-xs text-gray-500">{patient.id}</div>
    </div>
    
    <div className="mb-3">
      <div className="text-sm font-medium text-gray-700">{patient.procedure}</div>
    </div>
    
    <div className="mb-3">
      <StatusBadge status={patient.currentStatus} />
    </div>
    
    <div className="text-xs text-gray-500 mb-4">
      {new Date(patient.lastUpdated).toLocaleString()}
    </div>
    
    <PatientActionButtons patient={patient} isSurgical={isSurgical} variant="mobile" />
  </div>
);
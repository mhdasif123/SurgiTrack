import { StatusBadge } from './StatusBadge';
import { PatientActionButtons } from './PatientActionButtons';

export const DesktopPatientTable = ({ visiblePatients, isSurgical }) => (
  <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
    <table className="w-full table-auto text-left">
      <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
        <tr>
          <th className="px-6 py-4">Patient</th>
          <th className="px-6 py-4">Procedure</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Last Updated</th>
          <th className="px-6 py-4">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm">
        {visiblePatients.map((patient) => (
          <tr key={patient.id} className="border-t">
            <td className="px-6 py-4">
              <div className="font-semibold">{patient.name}</div>
              <div className="text-xs text-gray-500">{patient.id}</div>
            </td>
            <td className="px-6 py-4">{patient.procedure}</td>
            <td className="px-6 py-4">
              <StatusBadge status={patient.currentStatus} />
            </td>
            <td className="px-6 py-4">
              {new Date(patient.lastUpdated).toLocaleString()}
            </td>
            <td className="px-6 py-4">
              <PatientActionButtons patient={patient} isSurgical={isSurgical} variant="desktop" />
            </td>
          </tr>
        ))}
        {visiblePatients.length === 0 && (
          <tr>
            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
              No active patients available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
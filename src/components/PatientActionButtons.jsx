import { Link } from 'react-router-dom';

export const PatientActionButtons = ({ patient, isSurgical, variant = "desktop" }) => {
  const baseEditClass = variant === "mobile" 
    ? "block text-center bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition"
    : "text-blue-600 hover:underline font-medium";
    
  const baseUpdateClass = variant === "mobile"
    ? "block text-center bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
    : "text-green-600 hover:underline font-medium";

  return (
    <div className={variant === "mobile" ? "space-y-2" : "space-x-3"}>
      {!isSurgical && (
        <Link
          to={`/admin/edit-patient?id=${patient.id}`}
          className={baseEditClass}
        >
          Edit
        </Link>
      )}
      <Link
        to={isSurgical ? `/surgical-update?id=${patient.id}` : `/update-status?id=${patient.id}`}
        className={baseUpdateClass}
      >
        Update Status
      </Link>
    </div>
  );
};
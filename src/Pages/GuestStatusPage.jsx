import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const GuestStatusPage = () => {
  const { patientId } = useParams();
  console.log("patient id:" , patientId);
  const location = useLocation();
  const patient = location.state?.patient;

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "pre-procedure":
        return "bg-blue-100 text-blue-800";
      case "recovery":
        return "bg-purple-100 text-purple-800";
      case "complete":
        return "bg-green-100 text-green-800";
      case "checked in":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-sky-100 px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Patient Status</h1>
      

      {patient ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-lg sm:max-w-3xl text-center">
          {/* Patient ID */}
          <p className="text-2xl xl:text-3xl text-(--color-text) mb-4">
            Patient ID   <span className="font-semibold">{ patientId}</span>
          </p>

          {/* Procedure */}
          <div className="mb-6">
            <p className="text-sm sm:text-base font-semibold text-gray-700">Procedure:</p>
            <p className="text-base sm:text-lg text-gray-600">{patient.procedure}</p>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            <p className="text-sm sm:text-base font-semibold text-gray-700">Status:</p>
            <span
              className={`inline-block px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium ${getStatusColor(
                patient.currentStatus
              )}`}
            >
              {patient.currentStatus}
            </span>
          </div>

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-500">
            Last Updated: {patient.lastUpdated}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-red-500 text-center text-sm sm:text-base">
          No patient details available — please search again.
        </p>
      )}
    </div>
  );
};

export default GuestStatusPage;

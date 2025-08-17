import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const GuestStatusPage = () => {
  const { patientId } = useParams();
  console.log("patient id:", patientId);
  const location = useLocation();
  const patient = location.state?.patient;

  // Remove the problematic overflow hidden that was hiding the footer
  useEffect(() => {
    // Reset any previous body styles to ensure proper scrolling
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "auto"; // Changed from "hidden" to "auto"
    
    return () => {
      // Clean up on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pre-procedure":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "recovery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "complete":
        return "bg-green-100 text-green-800 border-green-200";
      case "checked in":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "closing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "dismissal":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not available";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-6 sm:py-8 lg:py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Patient Status Dashboard
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
          Real-time updates for your loved one's care
        </p>
      </div>

      {patient ? (
        <div className="max-w-2xl mx-auto">
          {/* Main Status Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Patient ID Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 lg:p-8 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="text-lg sm:text-xl lg:text-2xl font-medium">
                  Patient ID:
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider bg-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-lg">
                  {patientId}
                </span>
              </div>
            </div>

            {/* Patient Details */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              
              {/* Procedure Information */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                  Procedure
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 bg-gray-50 p-3 sm:p-4 rounded-xl border">
                  {patient.procedure || "Not specified"}
                </p>
              </div>

              {/* Current Status */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
                  Current Status
                </h3>
                <div className="flex flex-col items-center">
                  <span
                    className={`inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold border-2 transition-all duration-300 hover:scale-105 ${getStatusColor(
                      patient.currentStatus
                    )}`}
                  >
                    {patient.currentStatus || "Status Unknown"}
                  </span>
                </div>
              </div>

              {/* Status Explanation */}
              <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-base sm:text-lg">
                  What does this status mean?
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {(() => {
                    switch (patient.currentStatus?.toLowerCase()) {
                      case "checked in":
                        return "Your loved one has arrived and completed the check-in process. They are waiting to be called for their procedure.";
                      case "pre-procedure":
                        return "Preparation for the procedure is underway. This includes final preparations and safety checks.";
                      case "in-progress":
                        return "The medical procedure is currently being performed. Updates will be provided as they become available.";
                      case "recovery":
                        return "The procedure has been completed successfully. Your loved one is now in the recovery phase.";
                      case "complete":
                        return "All medical care has been completed. Discharge preparations may be underway.";
                      case "closing":
                        return "Final steps are being completed before discharge.";
                      case "dismissal":
                        return "Your loved one has been cleared for discharge and may be ready to go home.";
                      default:
                        return "Status information is being updated. Please check back shortly for more details.";
                    }
                  })()}
                </p>
              </div>

              {/* Last Updated */}
              <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-base sm:text-lg">
                  Last Updated
                </h4>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-600">
                  {formatDateTime(patient.lastUpdated)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  Status updates are provided in real-time as they become available
                </p>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* Error State */
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 text-center border border-red-200">
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">
              ❌
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-3 sm:mb-4">
              Patient Information Not Available
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              We couldn't find the patient details for ID: <strong>{patientId}</strong>
            </p>
            <div className="bg-red-50 p-4 sm:p-6 rounded-2xl border border-red-200 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-red-700 font-medium">
                This might happen if:
              </p>
              <ul className="text-sm sm:text-base text-red-600 mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-left">
                <li>• The patient ID was entered incorrectly</li>
                <li>• The patient information hasn't been updated yet</li>
                <li>• There was a technical issue loading the data</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-600 transition-colors shadow-lg"
              >
                Go Back & Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/search-patient'}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-600 transition-colors shadow-lg"
              >
                Search Another Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestStatusPage;
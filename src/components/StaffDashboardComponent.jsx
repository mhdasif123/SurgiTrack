import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PatientContext } from "../contexts/PatientContext";
import { AuthContext } from "../contexts/AuthContext";

const statusStyles = {
  "Checked In": "bg-blue-100 text-blue-600",
  "Pre-Procedure": "bg-yellow-100 text-yellow-600",
  "In-Progress": "bg-green-100 text-green-600",
  "Recovery": "bg-purple-100 text-purple-600",
  "Complete": "bg-gray-100 text-gray-600",
};

const StaffDashboardComponent = () => {
  const { patients } = useContext(PatientContext);
  const { user } = useContext(AuthContext);

  // Add debugging
  console.log("Current user:", user);
  console.log("Patients data:", patients);
  console.log("User role:", user?.role);
  console.log("Is surgical?", user?.role?.toLowerCase() === "surgical");

  // Wait until user and patients are loaded
  if (!user) {
    console.log("No user found - showing loading");
    return <div className="text-center py-10 text-gray-600">Loading user...</div>;
  }

  if (!patients) {
    console.log("No patients found - showing loading");
    return <div className="text-center py-10 text-gray-600">Loading patients...</div>;
  }

  const isSurgical = user.role?.toLowerCase() === "surgical";
  console.log("isSurgical calculated as:", isSurgical);

  // Filter out dismissed patients
  const activePatients = patients.filter(p => p.currentStatus !== "Dismissal");
  console.log("Active patients:", activePatients);
  console.log("Active patients count:", activePatients.length);

  // Pagination state - manual only
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(activePatients.length / pageSize);

  const visiblePatients = activePatients.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  console.log("Visible patients:", visiblePatients);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className=" w-[90%] 0 px-4 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Staff Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Interactive patient management for hospital staff
        </p>

        {/* Mobile: Horizontal scroll container */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex space-x-4 px-4">
              {activePatients.map((patient) => (
                <div key={patient.id} className="flex-shrink-0 w-80 bg-white shadow-xl rounded-2xl p-6">
                  <div className="mb-4">
                    <div className="font-semibold text-gray-800">{patient.name}</div>
                    <div className="text-xs text-gray-500">{patient.id}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700">{patient.procedure}</div>
                  </div>
                  <div className="mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[patient.currentStatus] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {patient.currentStatus}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    {new Date(patient.lastUpdated).toLocaleString()}
                  </div>
                  <div className="space-y-2">
                    {!isSurgical && (
                      <Link
                        to={`/admin/edit-patient?id=${patient.id}`}
                        className="block text-center bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                    )}
                    <Link
                      to={`/update-status?id=${patient.id}`}
                      className="block text-center bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
                    >
                      Update Status
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Table with pagination */}
        <div className="hidden md:block">
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusStyles[patient.currentStatus] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {patient.currentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(patient.lastUpdated).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      {!isSurgical && (
                        <Link
                          to={`/admin/edit-patient?id=${patient.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                      )}
                      <Link
                        to={`/update-status?id=${patient.id}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        Update Status
                      </Link>
                    </td>
                  </tr>
                ))}
                {visiblePatients.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No active patients available
                      <div className="text-sm text-gray-400 mt-2">
                        Debug: Total patients: {patients?.length || 0}, Active: {activePatients.length}, Visible: {visiblePatients.length}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls - Desktop Only */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow border'
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      i === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow border'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === totalPages - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow border'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {!isSurgical && (
        <div className="max-w-6xl mx-auto mt-6 flex justify-end">
          <Link
            to="/admin/add-patient"
            className="bg-blue-500 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-900 transition"
          >
            <span className="text-2xl">+</span>
            <span className="font-semibold text-sm">Add patient</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StaffDashboardComponent;
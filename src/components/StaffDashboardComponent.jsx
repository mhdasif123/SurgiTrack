import { useContext, useEffect, useState } from "react";
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

  // Pagination state (optional)
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(activePatients.length / pageSize);

  useEffect(() => {
    if (totalPages <= 1) return; // Don't set interval if only one page or no pages
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 20000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visiblePatients = activePatients.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  console.log("Visible patients:", visiblePatients);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Staff Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Interactive patient management for hospital staff
        </p>

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
import { Link } from 'react-router-dom';
import { usePatientDashboard } from  "../components/Hooks/usePatientDashboard";
import { MobilePatientCard } from './MobilePatientCard';
import { DesktopPatientTable } from './DesktopPatientTable';
import { Pagination } from './Pagination';

const StaffDashboardComponent = () => {
  const {
    user,
    isSurgical,
    activePatients,
    visiblePatients,
    currentPage,
    totalPages,
    goToPage,
    goToPrevious,
    goToNext,
    isLoading
  } = usePatientDashboard();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-[90%] px-4 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Staff Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Interactive patient management for hospital staff
        </p>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex space-x-4 px-4">
              {activePatients.map((patient) => (
                <MobilePatientCard 
                  key={patient.id} 
                  patient={patient} 
                  isSurgical={isSurgical} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <DesktopPatientTable 
            visiblePatients={visiblePatients} 
            isSurgical={isSurgical} 
          />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
          />
        </div>
      </div>

      {/* Add Patient Button */}
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
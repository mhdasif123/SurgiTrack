export const PatientNotFound = ({ onGoBack }) => (
  <div className="p-6 text-center">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Not Found</h2>
      <p className="text-gray-600 mb-6">
        The patient you're looking for doesn't exist or has been removed.
      </p>
      <button
        onClick={onGoBack}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium"
      >
        Go Back
      </button>
    </div>
  </div>
);

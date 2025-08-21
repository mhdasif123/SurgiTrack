export const Pagination = ({ currentPage, totalPages, goToPage, goToPrevious, goToNext }) => {
  if (totalPages <= 1) return null;

  return (
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
  );
};
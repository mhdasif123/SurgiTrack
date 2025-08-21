export const FormSubmitButton = ({ 
  isSubmitting, 
  isEditMode = false, 
  className = "" 
}) => (
  <button 
    type="submit"
    disabled={isSubmitting}
    className={`block mx-auto w-full text-lg font-medium text-white py-4 rounded-md transition ${
      isSubmitting
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600'
    } ${className}`}
  >
    {isSubmitting 
      ? (isEditMode ? 'Updating...' : 'Adding...') 
      : (isEditMode ? 'Update Patient' : 'Add Patient')
    }
  </button>
);
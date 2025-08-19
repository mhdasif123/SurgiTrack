export const FormField = ({ 
  label, 
  value, 
  type = "text", 
  readOnly = false,
  required = false,
  className = "",
  ...props 
}) => (
  <div className={`flex-1 min-w-[200px] ${className}`}>
    <label className="block text-xl font-bold mb-3">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value || ""}
      readOnly={readOnly}
      required={required}
      className={`w-full border-2 border-gray-300 px-3 py-3 rounded-lg ${
        readOnly ? 'cursor-not-allowed bg-gray-50' : 'focus:border-blue-500 focus:outline-none'
      }`}
      {...props}
    />
  </div>
);
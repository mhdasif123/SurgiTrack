export const ValidatedFormField = ({ 
  label, 
  value, 
  onChange,
  type = "text", 
  required = false,
  error,
  className = "",
  readOnly = false,
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
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
      required={required}
      className={`w-full border-2 px-3 py-3 rounded-lg transition-colors ${
        error 
          ? 'border-red-500 focus:border-red-600' 
          : 'border-gray-300 focus:border-blue-500'
      } ${
        readOnly 
          ? 'cursor-not-allowed bg-gray-50' 
          : 'focus:outline-none'
      }`}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
    )}
  </div>
);
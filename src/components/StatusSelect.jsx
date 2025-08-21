const STATUS_COLORS = {
  "Checked In": "var(--status-checked-in)",
  "Pre-Procedure": "var(--status-pre-procedure)",
  "In-Progress": "var(--status-in-progress)",
  "Recovery": "var(--status-recovery)",
  "Complete": "var(--status-complete)",
  "Closing": "var(--status-closing)",
  "Dismissal": "var(--status-dismissal)",
};

export const StatusSelect = ({ value, onChange, options, required = true }) => (
  <div className="flex-1 min-w-[200px]">
    <label className="block text-xl font-bold mb-3">
      New Status
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg focus:border-blue-500 focus:outline-none"
    >
      <option value="">-- Select New Status --</option>
      {options.map((status) => (
        <option
          key={status}
          value={status}
          style={{
            backgroundColor: STATUS_COLORS[status] || "white",
            color: "#000",
          }}
        >
          {status}
        </option>
      ))}
    </select>
  </div>
);
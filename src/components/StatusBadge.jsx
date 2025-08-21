const statusStyles = {
  "Checked In": "bg-blue-100 text-blue-600",
  "Pre-Procedure": "bg-yellow-100 text-yellow-600",
  "In-Progress": "bg-green-100 text-green-600",
  "Recovery": "bg-purple-100 text-purple-600",
  "Complete": "bg-gray-100 text-gray-600",
};

export const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      statusStyles[status] || "bg-gray-100 text-gray-500"
    }`}
  >
    {status}
  </span>
);
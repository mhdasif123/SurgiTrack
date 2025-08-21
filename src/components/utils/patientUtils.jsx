export const parsePatientName = (fullName) => {
  if (!fullName) return { firstName: "", lastName: "" };
  
  const nameParts = fullName.trim().split(/\s+/);
  const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : "";
  const firstName = nameParts.length > 1 
    ? nameParts.slice(0, nameParts.length - 1).join(" ") 
    : nameParts[0] || "";
    
  return { firstName, lastName };
};

export const getAllowedStatuses = (currentStatus, allStatuses) => {
  const idx = allStatuses.indexOf(currentStatus);
  const options = [];
  if (idx > 0) options.push(allStatuses[idx - 1]); // previous
  if (idx < allStatuses.length - 1) options.push(allStatuses[idx + 1]); // next
  return options;
};
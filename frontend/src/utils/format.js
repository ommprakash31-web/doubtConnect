export const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'Not available');

export const subjectsFromText = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

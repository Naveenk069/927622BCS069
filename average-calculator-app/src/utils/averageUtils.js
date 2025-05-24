export const calculateAverage = (arr) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / arr.length).toFixed(2));
};
 

// 'use server'
export const formatDate = (isoString: string):string => {
  console.log(isoString);
  
  const d = new Date(isoString);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
};

// Usage
// formatDate('2025-11-24T12:28:25.020Z'); // → "11/24/25"


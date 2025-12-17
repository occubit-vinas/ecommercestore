export function cleanFilters(filters: any[]) {
  const arr = Array.isArray(filters) ? filters : [];

  return arr.map(f => ({
    name: f.name ?? "",
    type: f.type ?? "SELECT",
    options: Array.isArray(f.options) ? f.options : [],
    isRequired: !!f.isRequired,
  }));
}


export function cleanAttributes(attributes: any[]) {
  const arr = Array.isArray(attributes) ? attributes : [];

  return arr.map(a => ({
    name: a.name ?? "",
    type: a.type ?? "TEXT",
    options: Array.isArray(a.options) ? a.options : [],
    default_value: a.default_value ?? "",
    isRequired: !!a.isRequired,
  }));
}

export function calculatePercentage({total_c, use_c}:{total_c:number,use_c:number}):number{
  
  if (total_c === 0) {
    return 0; // Avoid division by zero
  }
  
  const percentage = (use_c / total_c) * 100;
  return Number(percentage.toFixed(2));
}
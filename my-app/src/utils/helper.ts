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

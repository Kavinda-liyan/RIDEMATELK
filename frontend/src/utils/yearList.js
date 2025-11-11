const currentYear = new Date().getFullYear();
const startYear = 2000;

export const yearsArr = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
).reverse();

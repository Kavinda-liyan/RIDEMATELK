const currentYear = new Date().getFullYear();
const startYear = 2000;

const yearsArr = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
).reverse();

const transmissionTypesArr = ["Automatic", "Manual"];

const fuelTypeArr = ["Petrol", "Diesel", "Electric", "Hybrid"];

export { yearsArr, transmissionTypesArr, fuelTypeArr };

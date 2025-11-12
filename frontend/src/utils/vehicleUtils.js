import { useGetManufacturerQuery } from "../app/api/manufacturerSlice";
import { useGetVehicleByFilterQuery } from "../app/api/vehiclesApiSlice";

export const vehicleUtils = () => {
  const {
    data: ManufacturerData,
    isLoading: ManufacturerLoading,
    isError: ManufacturerError,
  } = useGetManufacturerQuery();
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const ManufacturerArr = ManufacturerData
    ? ManufacturerData?.map((manufacturer) => manufacturer.manufacturer)
    : [];

  const yearsArr = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const transmissionTypesArr = ["Automatic", "Manual"];

  const fuelTypeArr = ["petrol", "diesel", "electric", "hybrid"];

  const infoTagsArr = ["ikman", "riyasewana", "other"];

  return {
    ManufacturerArr,
    yearsArr,
    transmissionTypesArr,
    fuelTypeArr,
    ManufacturerLoading,
    ManufacturerError,
    infoTagsArr,
  };
};

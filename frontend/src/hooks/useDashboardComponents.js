import { useGetVehicleByFilterQuery } from "../app/api/vehiclesApiSlice";

export const useDashboardComponents = () => {
  const {
    data: vehicleData = [],
    isLoading: loadingVehicle,
    isError: errorVehicle,
  } = useGetVehicleByFilterQuery({});

  const AllVehicles = Array.isArray(vehicleData) ? vehicleData.length : 0;

  //Cal fuel Types
  const AvailableFuelTypes = Array.isArray(vehicleData)
    ? [...new Set(vehicleData.map((v) => v["Fuel Type"].toLowerCase()))]
    : [];

  const VehicleDataArray = AvailableFuelTypes.map((fuel) => ({
    constName: `${fuel}Vehicles`,
    filterKey: fuel,
  }));

  const vehicleCounts = {};

  VehicleDataArray.forEach(({ constName, filterKey }) => {
    vehicleCounts[constName] = Array.isArray(vehicleData)
      ? vehicleData.filter(
          (vehicle) => vehicle["Fuel Type"].toLowerCase() === filterKey
        ).length
      : 0;
  });


  return {
    vehicleData,
    loadingVehicle,
    errorVehicle,
    AllVehicles,
    ...vehicleCounts,
    AvailableFuelTypes,
  };
};

import { useGetVehicleByFilterQuery } from "../app/api/vehiclesApiSlice";

export const useDashboardComponents = () => {
  const {
    data: vehicleData = [],
    isLoading: loadingVehicle,
    isError: errorVehicle,
  } = useGetVehicleByFilterQuery({});

  const AllVehicles = Array.isArray(vehicleData) ? vehicleData.length : 0;

  //Cal fuel Types

  //getting each fuel types
  const AvailableFuelTypes = Array.isArray(vehicleData)
    ? [...new Set(vehicleData.map((v) => v["Fuel Type"].toLowerCase()))]
    : [];

  const vehicleCounts = {};

  AvailableFuelTypes.forEach((fuel) => {
    vehicleCounts[fuel] = Array.isArray(vehicleData)
      ? vehicleData.filter(
          (vehicle) => vehicle["Fuel Type"].toLowerCase() === fuel
        ).length
      : 0;
  });

  console.log("Vehicle Counts by Fuel Type:", vehicleCounts);
  const fuelTypePieData = Object.entries(vehicleCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));

  //   //Cal Body Types
  //   const AvailableBodyTypes = Array.isArray(vehicleData)
  //     ? [...new Set(vehicleData.map((v) => v["Body Type"].toLowerCase()))]
  //     : [];

  return {
    vehicleData,
    loadingVehicle,
    errorVehicle,
    AllVehicles,
    ...vehicleCounts,
    AvailableFuelTypes,
    fuelTypePieData,
  };
};

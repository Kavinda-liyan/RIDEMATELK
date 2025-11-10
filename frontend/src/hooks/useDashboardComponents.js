import { useGetVehicleByFilterQuery } from "../app/api/vehiclesApiSlice";
import { useGetAllUsersQuery } from "../app/api/usersApiSlice";

export const useDashboardComponents = () => {
  const {
    data: vehicleData = [],
    isLoading: loadingVehicle,
    isError: errorVehicle,
  } = useGetVehicleByFilterQuery({});

  const { data: userData = [] } = useGetAllUsersQuery();

  const AllUsers = Array.isArray(userData)
    ? userData.filter((user) => user.isAdmin === false).length
    : 0;

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

  const fuelTypePieData = Object.entries(vehicleCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));

  //getting each vehicle Manufacturer
  const AvailableManufacturers = Array.isArray(vehicleData)
    ? [...new Set(vehicleData.map((v) => v["Manufacturer"].toLowerCase()))]
    : [];

  console.log(AvailableManufacturers);
  const manufacturerCounts = {};

  AvailableManufacturers.forEach((manu) => {
    manufacturerCounts[manu] = Array.isArray(vehicleData)
      ? vehicleData.filter(
          (vehicle) => vehicle["Manufacturer"].toLowerCase() === manu
        ).length
      : 0;
  });

  const manufacturerBarData = Object.entries(manufacturerCounts).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
    })
  );

  console.log(manufacturerCounts);

  return {
    vehicleData,
    loadingVehicle,
    errorVehicle,
    AllVehicles,
    fuelTypePieData,
    manufacturerBarData,
    AllUsers,
  };
};

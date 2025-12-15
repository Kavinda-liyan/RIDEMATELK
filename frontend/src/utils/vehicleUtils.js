import { useGetManufacturerQuery } from "../app/api/manufacturerSlice";
import { useGetVehicleByFilterQuery } from "../app/api/vehiclesApiSlice";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import all from "../assets/Purpose/all.svg";
import tourism from "../assets/Purpose/travel.svg";
import heavyduty from "../assets/Purpose/transport.svg";
import personal from "../assets/Purpose/personal.svg";
import { icon } from "@fortawesome/fontawesome-svg-core";

export const vehicleUtils = () => {
  const {
    data: ManufacturerData,
    isLoading: ManufacturerLoading,
    isError: ManufacturerError,
  } = useGetManufacturerQuery({});

  const {
    data: bodyTypeData,
    isLoading: loadingBodyType,
    isError: errorBodyType,
  } = useGetBodyTypesQuery();

  const { data: vehicleData = [] } = useGetVehicleByFilterQuery();
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const ManufacturerArr = ManufacturerData
    ? ManufacturerData?.map((manufacturer) => manufacturer.manufacturer)
    : [];

  const bodyTypesArr = bodyTypeData ? bodyTypeData : [];

  const AvailableManufacturers = Array.isArray(vehicleData)
    ? [...new Set(vehicleData.map((v) => v["Manufacturer"].toLowerCase()))]
    : [];

  const yearsArr = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const transmissionTypesArr = ["Automatic", "Manual"];

  const fuelTypeArr = ["petrol", "diesel", "electric", "hybrid"];

  const infoTagsArr = ["ikman", "riyasewana", "other"];
  const seatingCapacityArr = ["2", "4", "5", "7", "8", "10", "12", "15"];

  const purposeArr = [
    {
      lable: "Tourism / Transport",
      icon: tourism,
    },
    {
      lable: "Personal Use",
      icon: personal,
    },
    {
      lable: "Heavy Duty / Pickup",
      icon: heavyduty,
    },
    {
      lable: "Not Specified",
      icon: all,
    },
  ];

  return {
    ManufacturerArr,
    yearsArr,
    transmissionTypesArr,
    fuelTypeArr,
    ManufacturerLoading,
    ManufacturerError,
    infoTagsArr,
    AvailableManufacturers,
    bodyTypesArr,
    loadingBodyType,
    errorBodyType,
    seatingCapacityArr,
    purposeArr,
  };
};

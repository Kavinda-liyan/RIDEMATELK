import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../app/api/vehiclesApiSlice";

export const useEditVehicle = () => {
  const { id } = useParams();

  const {
    data: vehicle,
    isLoading: loadVehicle,
    isError: errorVehicle,
  } = useGetVehicleByIdQuery(id);

  return {
    vehicle,
    loadVehicle,
    errorVehicle,
  };
};

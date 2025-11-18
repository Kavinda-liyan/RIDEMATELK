import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../app/api/vehiclesApiSlice";

export const useViewRecommendedVehicle = () => {
  const { id } = useParams();

  const {
    data: vehicleData,
    isLoading: vehicleLoading,
    isError: vehicleError,
  } = useGetVehicleByIdQuery(id);

  return { vehicleData, vehicleLoading, vehicleError };
};

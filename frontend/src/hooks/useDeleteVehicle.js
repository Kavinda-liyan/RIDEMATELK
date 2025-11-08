import { useState } from "react";

export const useDeleteVehicle = () => {
  const [showDeleteVehicleModal, setShowDeleteVehicleModal] = useState(false);

  return { setShowDeleteVehicleModal, showDeleteVehicleModal };
};

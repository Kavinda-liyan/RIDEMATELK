import { useState } from "react";
import { useDeleteVehicleMutation } from "../app/api/vehiclesApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeleteVehicle = () => {
  const [showDeleteVehicleModal, setShowDeleteVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteVehicle] = useDeleteVehicleMutation();

  const navigate = useNavigate();

  const VehicleTable = [
    {
      key: `${selectedVehicle?._id}-manufacturer`,
      head: "Manufacturer",
      data: selectedVehicle?.Manufacturer,
    },
    {
      key: `${selectedVehicle?._id}-model`,
      head: "Model",
      data: selectedVehicle?.Model,
    },
    {
      key: `${selectedVehicle?._id}-years`,
      head: "Year(s)",
      data: selectedVehicle?.Years || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-bodytype`,
      head: "Body Type",
      data: selectedVehicle?.["Body Type"] || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-seat`,
      head: "Seating Capacity",
      data: selectedVehicle?.["Seating Capacity"] || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-gc`,
      head: "Ground Clearance (mm)",
      data: selectedVehicle?.["Ground Clearance (range)"] || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-fueltype`,
      head: "Fuel Type",
      data: selectedVehicle?.["Fuel Type"] || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-eff`,
      head: `Efficiency ${
        selectedVehicle?.["Fuel Type"].toLowerCase() === "electric"
          ? "(km/kwh)"
          : "(km/l)"
      }`,
      data: selectedVehicle?.["EFF (km/l)/(km/kwh)"] || "N/A",
    },
    {
      key: `${selectedVehicle?._id}-link`,
      head: "Information Link(s)",
      data:
        selectedVehicle?.info_links?.length > 0
          ? selectedVehicle.info_links
              .map((item) => `${item.tag}: ${item.link}`)
              .join(", ")
          : "N/A",
    },
    {
      key: `${selectedVehicle?._id}-gallery`,
      head: "Gallery",
      data:
        selectedVehicle?.gallery_img?.length > 0
          ? selectedVehicle.gallery_img
              .map((item) => `${item.url} : ${item.year} : ${item.tag}`)
              .join(", \n")
          : "N/A",
    },
  ];
  const handleDeleteVehicle = async (selectedVehicle) => {
    try {
      await deleteVehicle(selectedVehicle._id).unwrap();
      setShowDeleteVehicleModal(false);
      navigate("/admin/allvehicles");
      toast.success(
        `Vehicle: ${selectedVehicle.Manufacturer} ${selectedVehicle.Model} deleted successfully!`
      );
      setSelectedVehicle(null);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Failed to delete the vehicle. Please try again later."
      );
      console.error("Delete vehicle error:", error);
      setSelectedVehicle(null);
    }
  };

  return {
    setShowDeleteVehicleModal,
    showDeleteVehicleModal,
    selectedVehicle,
    setSelectedVehicle,
    VehicleTable,
    handleDeleteVehicle,
  };
};

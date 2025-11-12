import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../app/api/vehiclesApiSlice";
import { useEffect, useState } from "react";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import { useUpdateVehicleMutation } from "../app/api/vehiclesApiSlice";
import { toast } from "react-toastify";
import { vehicleUtils } from "../utils/vehicleUtils";

export const useEditVehicle = () => {
  const { fuelTypeArr } = vehicleUtils();
  const [updateVehicle, { isLoading, isError }] = useUpdateVehicleMutation();
  const {
    data: bodyTypesData,
    isLoading: loadingBodyTypes,
    isError: errorBodyTypes,
  } = useGetBodyTypesQuery();
  const { id } = useParams();

  const {
    data: vehicle,
    isLoading: loadVehicle,
    isError: errorVehicle,
    refetch,
  } = useGetVehicleByIdQuery(id);

  const navigate = useNavigate();

  //Update Form States
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [yearsArr, setYearsArr] = useState([]);
  const [transmissionArr, setTransmissionArr] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodytype] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState();
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [groundClearance, setGroundClearance] = useState("");

  //Mutate States
  const [newYear, setNewYear] = useState("");
  const [newTransmission, setNewTransmission] = useState("");

  useEffect(() => {
    if (!vehicle) return;

    setManufacturer(vehicle.Manufacturer);
    setModel(vehicle.Model);
    setYearsArr(vehicle.years);
    setTransmissionArr(vehicle.transmission);
    setFuelType(vehicle["Fuel Type"]);
    setBodytype(vehicle["Body Type"]);
    setSeatingCapacity(vehicle["Seating Capacity"]);
    setFuelEfficiency(vehicle["Fuel Efficiency"]);
    setGroundClearance(vehicle["Ground Clearance (range)"]);
  }, [vehicle]);

  //Year Handlers
  const handleRemoveYear = (yearToRemove) => {
    setYearsArr(yearsArr.filter((y) => y !== yearToRemove));
  };
  const handleAddYear = () => {
    try {
      if (newYear && !yearsArr.includes(newYear)) {
        setYearsArr([...yearsArr, newYear]);
        setNewYear("");
      }
    } catch (error) {
      console.error("Error adding year:", error);
    }
  };

  //Transmission Handlers
  const handleRemoveTransmission = (transmissionToRemove) => {
    setTransmissionArr(
      transmissionArr.filter((t) => t !== transmissionToRemove)
    );
  };

  const handleAddTransmission = () => {
    try {
      if (newTransmission && !transmissionArr.includes(newTransmission)) {
        setTransmissionArr([...transmissionArr, newTransmission]);
        setNewTransmission("");
      }
    } catch (error) {
      console.error("Error adding transmission:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();

    // formData.append("Manufacturer", manufacturer);
    // formData.append("Model", model);
    // formData.append("Body type", bodyType);
    // formData.append("Seating Capacity", Number(seatingCapacity));
    // formData.append("Fuel Type", fuelType);
    // formData.append("Fuel Efficiency", fuelEfficiency);
    const updateData = {
      Manufacturer: manufacturer,
      Model: model,
      years: yearsArr,
      transmission: transmissionArr,
      "Fuel Type": fuelType,
      "Body Type": bodyType,
      "Seating Capacity": Number(seatingCapacity),
      "Fuel Efficiency": fuelEfficiency,
      "Ground Clearance (range)": Number(groundClearance),
    };

    try {
      await updateVehicle({ id: vehicle._id, body: updateData }).unwrap();
      toast.success("Vehicle updated successfully!");
      refetch();
    } catch (error) {
      toast.error(`Update failed: ${error?.data?.message || error.message}`);
    }
  };

  return {
    vehicle,
    loadVehicle,
    errorVehicle,
    yearsArr,
    handleRemoveYear,
    newYear,
    setNewYear,
    handleAddYear,
    transmissionArr,
    handleRemoveTransmission,
    handleAddTransmission,
    newTransmission,
    setNewTransmission,
    fuelTypeArr,
    setFuelType,
    fuelType,
    bodyTypesData,
    loadingBodyTypes,
    errorBodyTypes,
    bodyType,
    setBodytype,
    setManufacturer,
    manufacturer,
    model,
    setModel,
    fuelEfficiency,
    setFuelEfficiency,
    seatingCapacity,
    setSeatingCapacity,
    groundClearance,
    setGroundClearance,
    handleFormSubmit,
  };
};

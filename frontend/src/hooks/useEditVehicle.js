import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../app/api/vehiclesApiSlice";
import { useEffect, useState } from "react";

export const useEditVehicle = () => {
  const { id } = useParams();

  const {
    data: vehicle,
    isLoading: loadVehicle,
    isError: errorVehicle,
  } = useGetVehicleByIdQuery(id);

  const [yearsArr, setYearsArr] = useState([]);
  const [newYear, setNewYear] = useState("");

  const [transmissionArr, setTransmissionArr] = useState([]);
  const transmissionTypesArr = ["Manual", "Automatic"];
  const [newTransmission, setNewTransmission] = useState("");

  useEffect(() => {
    if (vehicle?.years) {
      setYearsArr(vehicle.years);
    }

    if (vehicle?.transmission) {
      setTransmissionArr(vehicle.transmission);
    }
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
    transmissionTypesArr,
    handleRemoveTransmission,
    handleAddTransmission,
    newTransmission,
    setNewTransmission,
  };
};

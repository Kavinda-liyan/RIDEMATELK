import { useEffect, useState } from "react";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import { useGetRecommendationsMutation } from "../app/api/recommendVehiclesApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { vehicleUtils } from "../utils/vehicleUtils";
export const useSetRecommendations = () => {
  const { bodyTypesArr } = vehicleUtils();
  const {
    data: bodyTypesData = [],
    isLoading: bodyTypesLoading,
    isError: bodyTypesError,
  } = useGetBodyTypesQuery();
  const navigate = useNavigate();

  const [
    getRecommendations,
    {
      data: recommendationData,
      isLoading: loadingRecommendations,
      isError: errorRecommendations,
    },
  ] = useGetRecommendationsMutation();

  //Form state
  const [bodyType, setBodyType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [roadCondition, setRoadCondition] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [trafficCondition, setTrafficCondition] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [bodyTypeDescription, setBodyTypeDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [purpose, setPurpose] = useState("");

  let bodyTypesList = [];
  if (Array.isArray(bodyTypesArr)) {
    if (purpose === "Not Specified" || !purpose) {
      bodyTypesList = bodyTypesArr;
    } else {
      bodyTypesList = bodyTypesArr.filter(
        (b) => b.Purpose && b.Purpose.includes(purpose)
      );
    }
  }

  const bodyTypeNames = bodyTypesList.map((b) => b.bodytype);

  useEffect(() => {
    if (bodyType) {
      const selectedBodyType = bodyTypesData.find(
        (b) => b.bodytype === bodyType
      );
      setBodyTypeDescription(selectedBodyType?.Description || "");
      setIcon(selectedBodyType?.icon || "");
    } else {
      setBodyTypeDescription("");
      setIcon("");
    }
  }, [bodyType, bodyTypesData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      bodyType === "" ||
      seatingCapacity === "" ||
      roadCondition === "" ||
      fuelType === "" ||
      trafficCondition === ""
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      const res = await getRecommendations({
        body: bodyType,
        seating: seatingCapacity,
        road: roadCondition,
        traffic: trafficCondition,
        fuel: fuelType,
      }).unwrap();

      setRecommendations(res.recommendations);
      navigate("/recommendations/result", {
        state: {
          recommendations: res.recommendations,
          inputs: {
            purpose,
            bodyType,
            seatingCapacity,
            roadCondition,
            fuelType,
            trafficCondition,
          },
        },
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  return {
    bodyType,
    setBodyType,
    seatingCapacity,
    setSeatingCapacity,
    roadCondition,
    setRoadCondition,
    fuelType,
    setFuelType,
    trafficCondition,
    setTrafficCondition,
    handleSubmit,
    recommendations,
    errorRecommendations,
    loadingRecommendations,
    bodyTypeDescription,
    purpose,
    setPurpose,
    icon,
    setIcon,
    bodyTypesList,
    bodyTypeNames,
  };
};

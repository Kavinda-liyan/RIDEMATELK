import { useState } from "react";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import { useGetRecommendationsMutation } from "../app/api/recommendVehiclesApiSlice";
export const useSetRecommendations = () => {
  const { data: bodyTypes, isLoading, isError } = useGetBodyTypesQuery();
  
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

  const seatingList = ["2", "4", "5", "6", "7", "8"];
  const roadConditionList = [
    "urban/highway",
    "suburban",
    "mid-offroad",
    "offroad/hilly",
  ];
  const fuelTypeList = ["petrol", "diesel", "electric", "hybrid"];
  const trafficConditionList = ["low", "medium", "high", "mixed"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getRecommendations({
        body: bodyType,
        seating: seatingCapacity,
        road: roadCondition,
        traffic: trafficCondition,
        fuel: fuelType,
      }).unwrap();

      console.log("Received recommendations:", res.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  return {
    bodyTypes,
    isLoading,
    isError,
    seatingList,
    roadConditionList,
    fuelTypeList,
    trafficConditionList,
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
    isLoading,
    isError,
    handleSubmit,
  };
};

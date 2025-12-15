import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";

export const recommendationUtils = () => {
  const {
    data: bodyTypesData,
    isLoading: loadingBt,
    isError: errorBt,
  } = useGetBodyTypesQuery();
  const roadConditionList = [
    { answer: "I live in a city with well-maintained roads.", value: "city" },
    {
      answer: "I live in a nearby town with moderately maintained roads.",
      value: "suburban",
    },
    {
      answer: "I often drive on rough or unpaved roads.",
      value: "mid off-road",
    },
    {
      answer: "I frequently drive in rocky or mountainous areas.",
      value: "off-road",
    },
  ];

  const trafficConditionList = [
    { answer: "Usually traffics are not heavy", value: "low" },
    { answer: "Usually traffics are heavy", value: "high" },
    { answer: "I often encounter mixed traffic conditions", value: "mixed" },
  ];

  const fuelTypeList = [
    { answer: "I prefer petrol vehicles.", value: "petrol" },
    { answer: "I prefer diesel vehicles.", value: "diesel" },
    { answer: "I prefer electric vehicles.", value: "electric" },
    { answer: "I prefer hybrid vehicles.", value: "hybrid" },
  ];

  const GcRecommendation = [
    {
      ground_clearance: "low",
      description: "Suitable for well-maintained urban roads.",
    },
    {
      ground_clearance: "medium",
      description: " Suitable for suburban and moderately maintained roads.",
    },
    {
      ground_clearance: "high",
      description:
        "Ideal for rough, unpaved roads and light off-road conditions.",
    },
    {
      ground_clearance: "very high",
      description:
        "Best for rocky, mountainous terrains and heavy off-roading.",
    },
  ];

  const bodyTypeRecommendation = bodyTypesData?.map((bt) => [
    { body_Type: bt.bodytype, description: bt.Description },
  ]);
  const transmissionRecommendation = [
    {
      transmisssion: "manual",
      description:
        "Offers greater control and is often preferred for off-road and performance driving.",
    },
    {
      transmisssion: "automatic",
      description:
        "Provides ease of use and convenience, especially in heavy traffic conditions.",
    },
  ];

  return {
    roadConditionList,
    trafficConditionList,
    fuelTypeList,
    GcRecommendation,
    bodyTypeRecommendation,
    loadingBt,
    errorBt,
    transmissionRecommendation,
  };
};

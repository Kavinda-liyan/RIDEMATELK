export const recommendationUtils = () => {
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
    { answer: "Usually traffics are moderate", value: "medium" },
    { answer: "Usually traffics are heavy", value: "high" },
    { answer: "I often encounter mixed traffic conditions", value: "mixed" },
  ];

  const fuelTypeList = [
    { answer: "I prefer petrol vehicles.", value: "petrol" },
    { answer: "I prefer diesel vehicles.", value: "diesel" },
    { answer: "I prefer electric vehicles.", value: "electric" },
    { answer: "I prefer hybrid vehicles.", value: "hybrid" },
    { answer: "I have no specific fuel type preference.", value: "any" },
  ];

  return {
    roadConditionList,
    trafficConditionList,
    fuelTypeList,
  };
};

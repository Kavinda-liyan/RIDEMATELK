import RecommendationForm from "./RecommendationForm";
import { useSetRecommendations } from "../../hooks/useSetRecommendations";
import NoRecommendations from "./NoRecommendations";
import InputWrapper from "../../components/Assets/InputWrapper";
import { vehicleUtils } from "../../utils/vehicleUtils";
import { recommendationUtils } from "../../utils/recommendationUtils";

const Recommendation = () => {
  const recommendationHook = useSetRecommendations();

  const { bodyTypesArr, loadingBodyType, errorBodyType, seatingCapacityArr } =
    vehicleUtils();

  const { roadConditionList, trafficConditionList, fuelTypeList } =
    recommendationUtils();

  console.log("Recommendations:", recommendationHook.recommendations);
  return (
    <section
      className="h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-[45px]"
      id="Recommendation"
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-[50%] bg-rmlk-dark-light  rounded-md shadow-md p-[16px]">
          <div className="text-white text-[18px] font-semibold mb-[16px] ">
            <h3 className="text-center">Find your vehicle here</h3>
          </div>
          <div className="w-full h-[2px] bg-rmlk-red"></div>
          <div className="w-full text-white font-rmlk-secondary ">
            <form
              onSubmit={recommendationHook.handleSubmit}
              className="my-[16px] h-[300px] overflow-y-scroll"
            >
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <label className="block mb-[8px]" htmlFor="bodyType">
                  What body type do you prefer?
                </label>
                {loadingBodyType ? (
                  <p>Loading body types...</p>
                ) : errorBodyType ? (
                  <p>Error loading body types</p>
                ) : (
                  <select
                    id="bodyType"
                    className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                      recommendationHook.bodyType === ""
                        ? "border border-rmlk-red"
                        : "border border-green-600"
                    }`}
                    value={recommendationHook.bodyType}
                    onChange={(e) =>
                      recommendationHook.setBodyType(e.target.value)
                    }
                  >
                    <option disabled={true} value={""}>
                      Select Body Type
                    </option>
                    {bodyTypesArr.map((bodyType) => (
                      <option key={bodyType} value={bodyType}>
                        {bodyType}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <label className="block mb-[8px]" htmlFor="bodyType">
                  What seating capacity do you need?
                </label>

                <select
                  id="bodyType"
                  className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                    recommendationHook.seatingCapacity === ""
                      ? "border border-rmlk-red"
                      : "border border-green-600"
                  }`}
                  value={recommendationHook.seatingCapacity}
                  onChange={(e) =>
                    recommendationHook.setSeatingCapacity(e.target.value)
                  }
                >
                  <option disabled={true} value={""}>
                    Select Seating Capacity
                  </option>
                  {seatingCapacityArr.map((seat) => (
                    <option key={seat} value={seat}>
                      {seat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <label className="block mb-[8px]" htmlFor="bodyType">
                  What road conditions do you usually travel on?
                </label>

                <select
                  id="bodyType"
                  className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                    recommendationHook.roadCondition === ""
                      ? "border border-rmlk-red"
                      : "border border-green-600"
                  }`}
                  value={recommendationHook.roadCondition}
                  onChange={(e) =>
                    recommendationHook.setRoadCondition(e.target.value)
                  }
                >
                  <option disabled={true} value={""}>
                    Select Road Condition
                  </option>
                  {roadConditionList.map(({ answer, value }, index) => (
                    <option key={index} value={value}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <label className="block mb-[8px]" htmlFor="bodyType">
                  What traffic conditions do you usually drive in?
                </label>

                <select
                  id="bodyType"
                  className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                    recommendationHook.trafficCondition === ""
                      ? "border border-rmlk-red"
                      : "border border-green-600"
                  }`}
                  value={recommendationHook.trafficCondition}
                  onChange={(e) =>
                    recommendationHook.setTrafficCondition(e.target.value)
                  }
                >
                  <option disabled={true} value={""}>
                    Select Road Traffic Condition
                  </option>
                  {trafficConditionList.map(({ answer, value }, index) => (
                    <option key={index} value={value}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <label className="block mb-[8px]" htmlFor="bodyType">
                  What fuel type do you prefer?
                </label>

                <select
                  id="bodyType"
                  className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                    recommendationHook.fuelType === ""
                      ? "border border-rmlk-red"
                      : "border border-green-600"
                  }`}
                  value={recommendationHook.fuelType}
                  onChange={(e) =>
                    recommendationHook.setFuelType(e.target.value)
                  }
                >
                  <option disabled={true} value={""}>
                    Select Fuel Type
                  </option>
                  {fuelTypeList.map(({ answer, value }, index) => (
                    <option key={index} value={value}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-[8px] text-[12px] w-full mb-[16px]">
                <button
                  type="submit"
                  className="w-full bg-rmlk-red text-white p-[10px] rounded-md hover:bg-rmlk-red-light transition duration-200 cursor-pointer "
                >
                  Get Recommendations
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;

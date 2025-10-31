import { useSetRecommendations } from "../../hooks/useSetRecommendations";
const Recommendation = () => {
  const setRecommendationsHook = useSetRecommendations();
  return (
    <section
      className="min-h-dvh bg-rmlk-dark pl-[60px] pr-[60px]"
      id="Recommendation"
    >
      <div className="pt-[45px]">
        <div className="Title text-[18px] text-white my-[8px]">
          <h3>Select factors that match your intrest</h3>
        </div>
        <div className="bg-rmlk-dark-light p-[16px] rounded-md shadow-md">
          <form
            className="flex justify-center"
            onSubmit={setRecommendationsHook.handleSubmit}
          >
            <div className="flex  justify-start gap-[48px]">
              <div className="text-white text-[12px] flex gap-[8px]  w-fit items-center">
                {setRecommendationsHook.isLoading ? (
                  <p>Loading body types...</p>
                ) : setRecommendationsHook.isError ? (
                  <p>Error loading body types!</p>
                ) : (
                  <select
                    id="bodyTypes"
                    name="bodyTypes"
                    value={setRecommendationsHook.bodyType}
                    onChange={(e) => {
                      setRecommendationsHook.setBodyType(e.target.value);
                    }}
                    className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md "
                  >
                    <option disabled={true} value={""}>
                      Body Type
                    </option>
                    {setRecommendationsHook.bodyTypes.map((bt) => (
                      <option
                        key={bt._id}
                        value={bt.bodytype}
                        className="p-[2px] rounded-md"
                      >
                        {bt.bodytype.charAt(0).toUpperCase() +
                          bt.bodytype.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                <select
                  id="seating"
                  name="seating"
                  value={setRecommendationsHook.seatingCapacity}
                  onChange={(e) => {
                    setRecommendationsHook.setSeatingCapacity(e.target.value);
                  }}
                  className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                >
                  <option disabled={true} value={""}>
                    Seating Capacity
                  </option>
                  {setRecommendationsHook.seatingList.map((seat) => (
                    <option
                      className="bg-rmlk-dark-light p-10"
                      key={seat}
                      value={seat}
                    >
                      {seat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                <select
                  id="seating"
                  name="seating"
                  value={setRecommendationsHook.roadCondition}
                  onChange={(e) => {
                    setRecommendationsHook.setRoadCondition(e.target.value);
                  }}
                  className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                >
                  <option disabled={true} value={""}>
                    Road Condition
                  </option>
                  {setRecommendationsHook.roadConditionList.map((road) => (
                    <option
                      className="bg-rmlk-dark-light p-10"
                      key={road}
                      value={road}
                    >
                      {road}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                <select
                  id="seating"
                  name="seating"
                  value={setRecommendationsHook.fuelType}
                  onChange={(e) => {
                    setRecommendationsHook.setFuelType(e.target.value);
                  }}
                  className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                >
                  <option disabled={true} value={""}>
                    Fuel Type
                  </option>
                  {setRecommendationsHook.fuelTypeList.map((fuel) => (
                    <option
                      className="bg-rmlk-dark-light p-10"
                      key={fuel}
                      value={fuel}
                    >
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                <select
                  id="seating"
                  name="seating"
                  value={setRecommendationsHook.trafficCondition}
                  onChange={(e) => {
                    setRecommendationsHook.setTrafficCondition(e.target.value);
                  }}
                  className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                >
                  <option disabled={true} value={""}>
                    Traffic Condition
                  </option>
                  {setRecommendationsHook.trafficConditionList.map(
                    (traffic) => (
                      <option
                        className="bg-rmlk-dark-light p-10"
                        key={traffic}
                        value={traffic}
                      >
                        {traffic}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                <button
                  className="px-[8px] py-[4px] bg-rmlk-red rounded-md shadow-md cursor-pointer hover:bg-rmlk-red-light duration-200"
                  type="submit"
                >
                  Recommend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;

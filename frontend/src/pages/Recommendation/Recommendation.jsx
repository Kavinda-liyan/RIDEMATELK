import { useGetBodyTypesQuery } from "../../app/api/bodyTypesApiSlice";

const Recommendation = () => {
  const { data: bodyTypes, isLoading, isError } = useGetBodyTypesQuery();

  const seating = ["2", "4", "5", "6", "7", "8"];
  const roadCondition = [
    "urban/highway",
    "suburban",
    "mid-offroad",
    "offroad/hilly",
  ];
  const fuelType = ["petrol", "diesel", "electric", "hybrid"];
  const trafficCondition = ["low", "medium", "high", "mixed"];
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
          <form className="flex justify-center">
            <div className="flex  justify-start gap-[48px]">
              <div className="text-white text-[12px] flex gap-[16px]  w-fit items-center">
                <label className="" htmlFor="bodyTypes">
                  Body Types :
                </label>

                {isLoading ? (
                  <p>Loading body types...</p>
                ) : isError ? (
                  <p>Error loading body types!</p>
                ) : (
                  <select
                    id="bodyTypes"
                    name="bodyTypes"
                    className="px-[8px] py-[4px] focus-visible:outline-0 hover:cursor-pointer"
                  >
                    {bodyTypes.map((bt) => (
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
              <div className="text-white text-[12px] flex gap-[16px] w-fit items-center">
                <label className="" htmlFor="seating">
                  Seating Capacity :
                </label>
                <select
                  id="seating"
                  name="seating"
                  className="px-[4px] py-[4px] border-[1.5px] border-rmlk-red rounded-md focus-visible:outline-0"
                >
                  {seating.map((seat) => (
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
              <div className="text-white text-[12px] flex gap-[16px] w-fit items-center">
                <label className="" htmlFor="seating">
                  Road Condition :
                </label>
                <select
                  id="seating"
                  name="seating"
                  className="px-[4px] py-[4px] border-[1.5px] border-rmlk-red rounded-md focus-visible:outline-0"
                >
                  {roadCondition.map((road) => (
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
              <div className="text-white text-[12px] flex gap-[16px] w-fit items-center">
                <label className="" htmlFor="seating">
                  Fuel Type :
                </label>
                <select
                  id="seating"
                  name="seating"
                  className="px-[4px] py-[4px] border-[1.5px] border-rmlk-red rounded-md focus-visible:outline-0"
                >
                  {fuelType.map((fuel) => (
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
              <div className="text-white text-[12px] flex gap-[16px] w-fit items-center">
                <label className="" htmlFor="seating">
                  Traffic Condition :
                </label>
                <select
                  id="seating"
                  name="seating"
                  className="px-[4px] py-[4px] border-[1.5px] border-rmlk-red rounded-md focus-visible:outline-0"
                >
                  {trafficCondition.map((traffic) => (
                    <option
                      className="bg-rmlk-dark-light p-10"
                      key={traffic}
                      value={traffic}
                    >
                      {traffic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;

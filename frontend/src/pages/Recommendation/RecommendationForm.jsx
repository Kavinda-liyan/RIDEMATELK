import VehicleCard from "../../components/VehicleCard";
import { useSetRecommendations } from "../../hooks/useSetRecommendations";
import { recommendationUtils } from "../../utils/recommendationUtils";
import { vehicleUtils } from "../../utils/vehicleUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetVehicleByFilterQuery } from "../../app/api/vehiclesApiSlice";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AverageRatingField from "./AverageRatingField";

const RecommendationForm = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [displayedVehicle, setDisplayedVehicle] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = userInfo && userInfo.isAdmin ? 6 : 8;

  const { recommendations, inputs } = location.state || { recommendations: [] };

  const {
    data: vehiclesData = [],
    isLoading: loadingVehicle,
    isError: errorVehicle,
  } = useGetVehicleByFilterQuery({});

  const setRecommendationsHook = useSetRecommendations();
  const { bodyTypesArr } = vehicleUtils();
  const {} = recommendationUtils();

  const loadMoreVehicles = () => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const nextBatch = recommendations.slice(start, end);

    if (nextBatch.length > 0) {
      setDisplayedVehicle((prev) => [...prev, ...nextBatch]);
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (recommendations.length > 0) {
      const firstBatch = recommendations.slice(0, itemsPerPage);
      setDisplayedVehicle(firstBatch);
      setPageNumber(2);
    }
  }, [recommendations]);

  useEffect(() => {
    const scrollContainer = document.getElementById("vehicleContainer");
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 50
      ) {
        loadMoreVehicles();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pageNumber, recommendations]);

  return (
    <>
      <div className="bg-rmlk-dark pt-[45px] px-[60px] min-h-[100dvh]">
        <div className="bg-rmlk-dark-light p-[8px] mb-[16px]">
          <form
            className="flex justify-center"
            onSubmit={setRecommendationsHook.handleSubmit}
          >
            <div className="flex justify-start gap-[48px]">
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                {setRecommendationsHook.isLoading ? (
                  <p>Loading body types...</p>
                ) : setRecommendationsHook.isError ? (
                  <p>Error loading body types!</p>
                ) : (
                  <select
                    id="bodyTypes"
                    name="bodyTypes"
                    value={setRecommendationsHook.bodyType}
                    onChange={(e) =>
                      setRecommendationsHook.setBodyType(e.target.value)
                    }
                    className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                  >
                    <option disabled value="">
                      {inputs.bodyType}
                    </option>
                    {bodyTypesArr.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="text-white text-[12px] flex gap-[8px] w-fit items-center">
                {setRecommendationsHook.isLoading ? (
                  <p>Loading body types...</p>
                ) : setRecommendationsHook.isError ? (
                  <p>Error loading body types!</p>
                ) : (
                  <select
                    id="bodyTypes"
                    name="bodyTypes"
                    value={setRecommendationsHook.bodyType}
                    onChange={(e) =>
                      setRecommendationsHook.setBodyType(e.target.value)
                    }
                    className="p-[8px] focus-visible:outline-0 hover:cursor-pointer bg-rmlk-dark-lighter rounded-md"
                  >
                    <option disabled value="">
                      {inputs.bodyType}
                    </option>
                    {bodyTypesArr.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                )}
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

        <div
          id="vehicleContainer"
          className={`p-[16px] grid  gap-[16px] overflow-y-auto h-[75vh] ${
            userInfo && userInfo.isAdmin ? "grid-cols-3" : "grid-cols-4"
          }`}
        >
          {loadingVehicle ? (
            <p className="text-white">Loading vehicles...</p>
          ) : errorVehicle ? (
            <p className="text-white">Error fetching vehicles!</p>
          ) : recommendations.length > 0 ? (
            displayedVehicle.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                Model={vehicle["Model"]?.toUpperCase()}
                Manufacturer={vehicle["Manufacturer"]?.toUpperCase()}
                bodytype={vehicle["Body Type"]}
                fueltype={vehicle["Fuel Type"]}
                imgPlaceholder={
                  vehicle["gallery_img"]?.length > 0
                    ? vehicle["gallery_img"][0].url
                    : imgPlaceholder
                }
                fuelEff={vehicle["EFF (km/l)/(km/kwh)"]}
                groundC={vehicle["Ground Clearance (range)"]}
                seats={vehicle["Seating Capacity"]}
                openVehicleFunc={() =>
                  navigate(`/recommendation/result/vehicle/${vehicle.id}`)
                }
                vid={vehicle.id}
              >
                
              </VehicleCard>
            ))
          ) : (
            <p className="text-white">No recommendations found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendationForm;

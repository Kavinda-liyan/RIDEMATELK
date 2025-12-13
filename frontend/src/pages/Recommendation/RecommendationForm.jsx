import VehicleCard from "../../components/VehicleCard";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import { useAllRecommendations } from "../../hooks/useAllRecommendations";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton";
import { useSetRecommendations } from "../../hooks/useSetRecommendations";
import { vehicleUtils } from "../../utils/vehicleUtils";
import { recommendationUtils } from "../../utils/recommendationUtils";

const RecommendationForm = () => {
  const {
    userInfo,
    displayedVehicle,
    recommendations,
    setRecommendations,
    inputs,
    favoriteIds,
    favoritsUserIds,
    handleAddFavorite,
    handleRemoveFavorite,
    navigate,
  } = useAllRecommendations();

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}
      <div className="bg-rmlk-dark py-[50px] px-[60px] min-h-[100dvh]">
        {recommendations.length > 0 ? (
          <div className="mt-[45px] text-white w-full bg-rmlk-dark-light rounded-sm shadow-md p-[16px] border border-rmlk-red">
            <div className="text-center my-[8px]">
              <h3>Your Recommendations</h3>
            </div>
            <div className="w-full flex items-center justify-center">
              <ul className="text-white text-[12px] flex gap-[20px] items-center">
                <li>
                  Body Type:{" "}
                  <span className="text-amber-500">{inputs.bodyType}</span>
                </li>
                <li>
                  Seating Capacity:{" "}
                  <span className="text-amber-500">
                    {inputs.seatingCapacity}
                  </span>
                </li>
                <li>
                  Fuel Type:{" "}
                  <span className="text-amber-500">{inputs.fuelType}</span>
                </li>
                <li>
                  Road Condition:{" "}
                  <span className="text-amber-500">{inputs.roadCondition}</span>
                </li>
                <li>
                  Traffic Condition:{" "}
                  <span className="text-amber-500">
                    {inputs.trafficCondition}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/recommendations")}
                    className=" px-[12px] py-[8px] bg-rmlk-red text-white rounded-sm shadow-md hover:bg-rmlk-red-lighter duration-200 text-[12px]"
                  >
                    Get New Recommendations
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {/* Vehicle Container */}
        <div
          id="vehicleContainer"
          className={`p-[16px] grid gap-[16px] overflow-y-auto h-[75vh] mt-[16px] grid-cols-4`}
        >
          {recommendations.length > 0 ? (
            displayedVehicle.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                Model={vehicle.Model?.toUpperCase()}
                Manufacturer={vehicle.Manufacturer?.toUpperCase()}
                bodytype={vehicle["Body Type"]}
                fueltype={vehicle["Fuel Type"]}
                imgPlaceholder={vehicle.gallery_img?.[0]?.url || imgPlaceholder}
                fuelEff={vehicle["EFF (km/l)/(km/kwh)"]}
                groundC={vehicle["Ground Clearance (range)"]}
                seats={vehicle["Seating Capacity"]}
                openVehicleFunc={() =>
                  navigate(`/recommendation/result/vehicle/${vehicle.id}`, {
                    state: { recommendations: displayedVehicle },
                  })
                }
                vid={vehicle.id}
                toggleFavourite={() =>
                  favoriteIds.includes(vehicle.id)
                    ? handleRemoveFavorite(vehicle.id)
                    : handleAddFavorite(vehicle.id)
                }
                isFavorite={favoriteIds.includes(vehicle.id)}
                userIdForFav={favoritsUserIds}
              />
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center col-span-4 font-rmlk-secondary">
              <div className="h-fit w-[50%] flex flex-col items-center justify-center border-2 border-rmlk-red rounded-sm shadow-md p-[16px]">
                <p className="text-white">No recommendations found.</p>
                <p className="text-white mt-[8px]">Your Selections were:</p>
                <ul className="text-white text-[12px]">
                  <li>
                    Body Type:{" "}
                    <span className="text-amber-500">{inputs.bodyType}</span>
                  </li>
                  <li>
                    Seating Capacity:{" "}
                    <span className="text-amber-500">
                      {inputs.seatingCapacity}
                    </span>
                  </li>
                  <li>
                    Fuel Type:{" "}
                    <span className="text-amber-500">{inputs.fuelType}</span>
                  </li>
                  <li>
                    Road Condition:{" "}
                    <span className="text-amber-500">
                      {inputs.roadCondition}
                    </span>
                  </li>
                  <li>
                    Traffic Condition:{" "}
                    <span className="text-amber-500">
                      {inputs.trafficCondition}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/recommendations")}
                  className="mt-[16px] px-[12px] py-[8px] bg-rmlk-red text-white rounded-sm shadow-md hover:bg-rmlk-red-lighter duration-200 text-[12px]"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendationForm;

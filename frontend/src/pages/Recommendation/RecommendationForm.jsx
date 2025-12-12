import VehicleCard from "../../components/VehicleCard";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import { useAllRecommendations } from "../../hooks/useAllRecommendations";
import { useSelector } from "react-redux";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton";

const RecommendationForm = () => {
  const {
    userInfo,
    loadingVehicle,
    errorVehicle,
    displayedVehicle,
    navigate,
    recommendations,
    handleAddFavorite,
    handleRemoveFavorite,
    favoriteIds,
    favoritsUserIds,
    inputs,
  } = useAllRecommendations();

  console.log("Displayed Vehicles:", inputs);

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}
      <div className="bg-rmlk-dark pt-[50px] px-[60px] min-h-[100dvh] ">
        <div
          id="vehicleContainer"
          className={`p-[16px] grid  gap-[16px] overflow-y-auto h-[75vh] mt-[45px] ${
            userInfo && userInfo.isAdmin ? "grid-cols-4" : "grid-cols-4"
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
                  navigate(`/recommendation/result/vehicle/${vehicle.id}`, {
                    state: { recommendations: displayedVehicle },
                  })
                }
                vid={vehicle.id}
                toggleFavourite={() => {
                  if (favoriteIds.includes(vehicle.id)) {
                    handleRemoveFavorite(vehicle.id);
                  } else {
                    handleAddFavorite(vehicle.id);
                  }
                }}
                isFavorite={favoriteIds.includes(vehicle.id)}
                userIdForFav={favoritsUserIds}
              ></VehicleCard>
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center col-span-4 font-rmlk-secondary">
              <div className="h-fit w-[50%] flex items-center justify-center border-2 rounded-sm border-rmlk-red shadow-md flex-col p-[16px]">
                <p className="text-white">No recommendations found.</p>
                <p className="text-white mt-[8px]">Your Selections were:</p>
                <ul className="text-white  text-[12px]">
                  <li>
                    Body Type:{" "}
                    <span className="text-amber-500">{inputs.bodyType}</span>{" "}
                  </li>
                  <li>
                    Seating Capacity:{" "}
                    <span className="text-amber-500">
                      {" "}
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
                    </span>{" "}
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

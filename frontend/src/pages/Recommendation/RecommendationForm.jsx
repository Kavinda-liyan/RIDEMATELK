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
  } = useAllRecommendations();

  console.log("Displayed Vehicles:", userInfo);

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}
      <div className="bg-rmlk-dark pt-[50px] px-[60px] min-h-[100dvh] ">
        <div
          id="vehicleContainer"
          className={`p-[16px] grid  gap-[16px] overflow-y-auto h-[75vh] mt-[45px] ${
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
            <p className="text-white">No recommendations found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendationForm;

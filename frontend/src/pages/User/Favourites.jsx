import { use } from "react";
import VehicleCard from "../../components/VehicleCard";
import { useViewFavourites } from "../../hooks/useViewFavourites";
import { useSelector } from "react-redux";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton";
import { useAllRecommendations } from "../../hooks/useAllRecommendations";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const { favouriteData, favouriteError, favouriteLoading, navigate } =
    useViewFavourites();
  const { userInfo } = useSelector((state) => state.auth);
  const { handleRemoveFavorite } = useAllRecommendations();

  return (
    <>
      {userInfo?.isAdmin && <AdminDashboardButton />}
      <div className="min-h-[100dvh] bg-rmlk-dark pt-[50px] px-[60px] pb-[16px] font-rmlk-secondary text-white max-sm-rmlk:px-[24px]">
        <div className="text-[24px] mt-[16px] px-[16px] py-[8px] w-full bg-rmlk-dark-light rounded-sm shadow-md">
          <h3>Favourites</h3>
        </div>

        {favouriteLoading ? (
          <p className="mt-[32px] text-center">Loading...</p>
        ) : favouriteError ? (
          <p className="mt-[32px] text-center text-red-500">
            Error loading favourites.
          </p>
        ) : favouriteData?.length > 0 ? (
          <div
            className={`grid ${
              userInfo?.isAdmin ? "grid-cols-4" : "grid-cols-3"
            } gap-[24px] mt-[32px] max-sm-rmlk:grid-cols-3 max-xs-rmlk:grid-cols-1`}
          >
            {favouriteData.map((vehicle) =>
              vehicle?.vehicleId ? (
                <VehicleCard
                  key={vehicle._id}
                  fueltype={vehicle.vehicleId["Fuel Type"]}
                  bodytype={vehicle.vehicleId["Body Type"]}
                  Manufacturer={vehicle.vehicleId["Manufacturer"]}
                  Model={vehicle.vehicleId["Model"]}
                  imgPlaceholder={
                    vehicle.vehicleId["gallery_img"]?.length > 0
                      ? vehicle.vehicleId["gallery_img"][0].url
                      : imgPlaceholder
                  }
                  seats={vehicle.vehicleId["Seating Capacity"]}
                  groundC={vehicle.vehicleId["Ground Clearance (range)"]}
                  vid={vehicle.vehicleId._id}
                  toggleFavourite={() =>
                    handleRemoveFavorite(vehicle.vehicleId._id)
                  }
                  openVehicleFunc={() =>
                    navigate(
                      `/recommendation/result/vehicle/${vehicle.vehicleId._id}`
                    )
                  }
                />
              ) : null
            )}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center mt-[32px]">
            <div className="h-fit w-[50%] max-xs-rmlk:w-full flex flex-col items-center justify-center border-2 border-rmlk-red rounded-sm shadow-md p-[16px]">
              <p className="text-white">No favourits found.</p>
              

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
    </>
  );
};

export default Favourites;

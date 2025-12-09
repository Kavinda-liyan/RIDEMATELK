import { use } from "react";
import VehicleCard from "../../components/VehicleCard";
import { useViewFavourites } from "../../hooks/useViewFavourites";
import { useSelector } from "react-redux";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton";

const Favourites = () => {
  const { favouriteData, favouriteError, favouriteLoading, navigate } =
    useViewFavourites();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}
      <div>
        {favouriteLoading ? (
          <p>Loading...</p>
        ) : favouriteError ? (
          <p>Error loading favourites.</p>
        ) : (
          favouriteData?.length > 0 && (
            <div className="min-h-[100dvh] bg-rmlk-dark pt-[50px] px-[60px] pb-[16px] font-rmlk-secondary text-white">
              <div
                className={`grid ${
                  userInfo.isAdmin ? " grid-cols-4" : "grid-cols-4"
                } gap-[24px] mt-[45px]`}
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
                      openVehicleFunc={() =>
                        navigate(
                          `/recommendation/result/vehicle/${vehicle.vehicleId._id}`
                        )
                      }
                    />
                  ) : null
                )}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Favourites;

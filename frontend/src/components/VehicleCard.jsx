import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardRatings from "../pages/Recommendation/cardRatings";
import { useSelector } from "react-redux";

const VehicleCard = ({
  imgPlaceholder,
  Model,
  Manufacturer,
  bodytype,
  fueltype,
  groundC,
  seats,
  openVehicleFunc,
  vid,
  toggleFavourite,
  isFavorite,
  userIdForFav,
}) => {
  const fuel = fueltype.toLowerCase();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-[16px] px-[18px] ">
      <div
        id="card"
        className="relative hover:scale-105 cursor-pointer duration-200 w-full bg-rmlk-dark-light rounded-xs shadow-md border border-rmlk-dark-light overflow-hidden min-h-[290px]"
      >
        <button
          onClick={toggleFavourite}
          className={`z-[5] w-[25px] h-[25px] cursor-pointer flex items-center justify-center rounded-full shadow-md top-[8px] right-[8px] absolute duration-200
    ${
      isFavorite && userIdForFav.includes(userInfo._id)
        ? "bg-rmlk-red text-white"
        : "bg-rmlk-dark-lighter text-white hover:bg-rmlk-red-light"
    }`}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-[12px] ${
              isFavorite ? "text-white" : "text-white"
            }`}
          />
        </button>
        <div onClick={openVehicleFunc}>
          <div className="h-[150px] w-full relative">
            <img
              src={imgPlaceholder}
              alt={imgPlaceholder}
              className="h-full w-full object-cover "
            />
            <h3 className="absolute text-left text-[12px]  text-white font-semibold font-rmlk-secondary line-clamp-2 bg-rmlk-dark/60 w-full bottom-0 p-[8px]">
              {Model}
            </h3>
          </div>
          <div className="p-[14px] w-full">
            <h4 className="text-left text-[12px] text-amber-400 font-rmlk-secondary mb-[4px]">
              <strong>Manufacturer</strong> : {Manufacturer}
            </h4>
            <div className="my-[8px] flex items-center justify-start">
              <div className="">
                <CardRatings vehicleId={vid} />
              </div>
            </div>

            <div className="text-left text-[10px] font-rmlk-secondary text-white flex flex-wrap gap-[4px]">
              <p className="w-fit mb-[2px] bg-teal-600 inline-block px-[4px] py-[2px] rounded-xs font-semibold">
                {bodytype.toUpperCase()}
              </p>
              <p
                className={`w-fit mb-[2px] text-[10px]  inline-block px-[4px] py-[2px] rounded-xs font-semibold ${
                  fuel === "petrol"
                    ? "bg-amber-600"
                    : fuel === "diesel"
                    ? "bg-red-600"
                    : fuel === "electric"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {fueltype.toUpperCase()}
              </p>
              <p className="w-fit mb-[2px] bg-sky-600 inline-block px-[4px] py-[2px] rounded-sm font-semibold">
                {seats} seats
              </p>
              {/* <p className="w-fit mb-[2px]">
              <strong>Fuel Efficiency</strong> : {fuelEff}{" "}
              {fuel === "electric" ? "km/kwh" : "km/l"}
            </p> */}
              <p className="w-fit mb-[2px] bg-gray-600 inline-block px-[4px] py-[2px] rounded-sm font-semibold">
                {groundC} mm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
